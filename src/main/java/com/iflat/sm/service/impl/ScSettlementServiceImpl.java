package com.iflat.sm.service.impl;

import com.iflat.base.entity.ExcelReader;
import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.code.bean.Team;
import com.iflat.report.bean.bi.Project;
import com.iflat.sm.bean.ScSettlement;
import com.iflat.sm.bean.ScSettlementDetail;
import com.iflat.sm.bean.TargetCostAccount;
import com.iflat.sm.service.ScSettlementDetailService;
import com.iflat.sm.service.ScSettlementService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.ExcelUtil;
import com.iflat.util.Session;
import com.iflat.util.StringUtil;
import com.iflat.workflow.service.WorkflowService;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2016/3/23.
 */
public class ScSettlementServiceImpl extends BaseServiceSupport implements ScSettlementService {

    private WorkflowService workflowService;
    private BaseService teamService;
    private BaseService rptProjectService;
    private BaseService targetCostAccountService;
    private ScSettlementDetailService scSettlementDetailService;

    private ScSettlement scSettlement;

    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((ScSettlement)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((ScSettlement)this.saveObj).setCreatorName(userInfoVo.getUserName());
    }

    /**
     * 创建对象时，启动流程
     * @throws Exception
     */
    @Override
    protected void afterInsert() throws Exception {
        startProcess(this.saveObj);
    }

    @Override
    protected void beforeDelete() throws Exception {
        if (!"未提交".equals(((ScSettlement) this.deleteObj).getStatus())) {
            throw new Exception("无法删除已提交的数据");
        }
    }

    @Override
    protected void beforeStartProcess() throws Exception {
        // 将工号置入流程变量，用于后续查询修船总管
        processMap.put("id", reflectProcessObj.getMethodValue("id").toString());
    }

    /**
     * 删除对象时，删除流程实例
     * @throws Exception
     */
    @Override
    protected void afterDelete() throws Exception {

        ScSettlement parent = (ScSettlement) this.deleteObj;
        ScSettlementDetail param = new ScSettlementDetail();
        param.setPid(parent.getId());
        this.scSettlementDetailService.delete(param);
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param scSettlement
     * @throws Exception
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submit(ScSettlement scSettlement) throws Exception {

        ScSettlement param = new ScSettlement();
        param.setId(scSettlement.getId());
        scSettlement = (ScSettlement) list(scSettlement).get(0);
        if (!"未提交".equals(scSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(scSettlement));
    }

    @Override
    protected void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.sm.bean.ScSettlement");
        this.excelReader.setEndRow(2);
        super.getExcelReader().setProps(new String[]{"projNo", "strMonth", "team", "mgrScore", "progressScore", "qualityScore", "safetyScore", "fineAmount", "comment"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        ScSettlement o = (ScSettlement) list.get(0);
        o.setId(UUID.randomUUID().toString());
        o.setStatus("未提交");
        UserInfoVo user = Session.getUserInfo();
        o.setDeptName(user.getPorgName());
        o.setCreatorAcc(user.getAccount());
        o.setCreatorName(user.getUserName());
        o.setCreateTime(new Date());

        List newList = new ArrayList<>();
        newList.add(o);
        setImportList(newList);
    }

    @Override
    protected void importValidate() throws Exception {

        // 校验工号是否存在
        ScSettlement o = (ScSettlement) super.getImportList().get(0);

        if (StringUtil.isBlank(o.getProjNo())) {
            throw new Exception("导入失败，未填写工号。");
        }

        if (StringUtil.isBlank(o.getTeam())) {
            throw new Exception("导入失败，未填写工程队名。");
        }

        if (o.getMonth() == null) {
            throw new Exception("导入失败，月份填写错误，格式应当为2016-01。");
        }

        Project project = new Project();
        project.setProjNo(o.getProjNo());
        project.setStatus("0");
        List<Project> projectList = this.rptProjectService.list(project);
        if (projectList == null) {
            project.setStatus(null);
            projectList = this.rptProjectService.list(project);
            if (projectList == null) {
                throw new Exception("工号不存在，请修改后重新导入。");
            } else {
                throw new Exception("工号已关闭，请联系相关人员。");
            }
        }
        if (projectList.size() > 1) {
            throw new Exception("有两个或两个以上" + project.getProjNo() + "工号，请联系工号维护人员。");
        }
        o.setProjName(projectList.get(0).getName());

        // 验证工程队名
        Team team = new Team();
        team.setDeptName(o.getDeptName());
        team.setTeamName(o.getTeam());
        List<Team> teams = teamService.list(team);
        if (teams == null || teams.size() <= 0) {
            throw new Exception("部门【" + o.getDeptName() + "】不存在【" + o.getTeam() + "】施工队");
        }
    }

    @Override
    protected void beforeImportData() throws Exception {
        /**
         * 导入明细信息
         */
        // 获取头信息id，作为明细的pid
        this.scSettlement = (ScSettlement) super.getImportList().get(0);
        String id = this.scSettlement.getId();

        ExcelReader reader = new ExcelReader();
        reader.setFilePath(this.excelReader.getFilePath());
        reader.setSheetName(this.excelReader.getSheetName());
        reader.setClassName("com.iflat.sm.bean.ScSettlementDetail");
        reader.setStartRow(3);
        reader.setEndRow(0);
        reader.setEndColumn(0);
        reader.setProps(new String[]{"account", "content", "amount", "matQty", "spec", "unit", "price", "comment"});

        //读取excel
        List list = ExcelUtil.read(reader);
        for (int i = 0; i < list.size(); i++) {
            ScSettlementDetail o = (ScSettlementDetail) list.get(i);

            // 验证成本科目
            if (StringUtil.isBlank(o.getAccount())) {
                throw new Exception("导入失败。第" + (i + 1) + "行/共" + list.size() + "行成本科目为空，请填写后重新导入。");
            }
            TargetCostAccount targetCostAccount = new TargetCostAccount();
            targetCostAccount.setCode(o.getAccount());
            List<TargetCostAccount> l = this.targetCostAccountService.list(targetCostAccount);
            if (l == null || l.size() <= 0) {
                throw new Exception("导入失败。第" + (i + 1) + "行/共" + list.size() + "行成本科目代码不存在，请填写后重新导入。");
            }
            o.setAccountName(l.get(0).getName());

            // 验证施工内容
            if (StringUtil.isBlank(o.getContent())) {
                throw new Exception("导入失败。第" + (i + 1) + "行/共" + list.size() + "行施工内容为空，请填写后重新导入。");
            }

            o.setId(UUID.randomUUID().toString());
            o.setPid(id);
            UserInfoVo user = Session.getUserInfo();
            o.setCreatorAcc(user.getAccount());
            o.setCreatorName(user.getUserName());
            o.setCreateTime(new Date());
        }

        if(list.size() > 0) {
            executeMethod(list, "insertBatch");
        }
    }

    @Override
    protected void afterImportData() throws Exception {
        startProcess(this.scSettlement);
    }

    public BaseService getTeamService() {
        return teamService;
    }

    public void setTeamService(BaseService teamService) {
        this.teamService = teamService;
    }

    public BaseService getRptProjectService() {
        return rptProjectService;
    }

    public void setRptProjectService(BaseService rptProjectService) {
        this.rptProjectService = rptProjectService;
    }

    public BaseService getTargetCostAccountService() {
        return targetCostAccountService;
    }

    public void setTargetCostAccountService(BaseService targetCostAccountService) {
        this.targetCostAccountService = targetCostAccountService;
    }

    public ScSettlement getScSettlement() {
        return scSettlement;
    }

    public void setScSettlement(ScSettlement scSettlement) {
        this.scSettlement = scSettlement;
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    public ScSettlementDetailService getScSettlementDetailService() {
        return scSettlementDetailService;
    }

    public void setScSettlementDetailService(ScSettlementDetailService scSettlementDetailService) {
        this.scSettlementDetailService = scSettlementDetailService;
    }
}
