package com.iflat.sm.service.impl;

import com.iflat.base.entity.ExcelReader;
import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.code.bean.Team;
import com.iflat.report.bean.bi.Project;
import com.iflat.sm.bean.SbSettlement;
import com.iflat.sm.bean.SbSettlementDetail;
import com.iflat.sm.bean.TargetCostAccount;
import com.iflat.sm.service.SbSettlementDetailService;
import com.iflat.sm.service.SbSettlementService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserService;
import com.iflat.util.ExcelUtil;
import com.iflat.util.Session;
import com.iflat.util.StringUtil;
import com.iflat.workflow.service.WorkflowService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

import java.io.File;
import java.util.*;

/**
 * Created by tyriv on 2016/3/23.
 */
public class SbSettlementServiceImpl extends BaseServiceSupport implements SbSettlementService {

    private WorkflowService workflowService;
    private BaseService teamService;
    private BaseService rptProjectService;
    private BaseService targetCostAccountService;
    private SbSettlementDetailService sbSettlementDetailService;

    private SbSettlement sbSettlement;

    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((SbSettlement)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((SbSettlement)this.saveObj).setCreatorName(userInfoVo.getUserName());
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
        if (!"未提交".equals(((SbSettlement) this.deleteObj).getStatus())) {
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
        SbSettlement parent = (SbSettlement) this.deleteObj;
        SbSettlementDetail param = new SbSettlementDetail();
        param.setPid(parent.getId());
        this.sbSettlementDetailService.delete(param);
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param sbSettlement
     * @throws Exception
     */
    @Override
    public void submit(SbSettlement sbSettlement) throws Exception {

        SbSettlement param = new SbSettlement();
        param.setId(sbSettlement.getId());
        sbSettlement = (SbSettlement) list(sbSettlement).get(0);
        if (!"未提交".equals(sbSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(sbSettlement));
    }

    @Override
    protected void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.sm.bean.SbSettlement");
        this.excelReader.setEndRow(2);
        super.getExcelReader().setProps(new String[]{"projNo", "strMonth", "team", "mgrScore", "progressScore", "qualityScore", "safetyScore", "fineAmount", "comment"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        SbSettlement o = (SbSettlement) list.get(0);
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
        SbSettlement o = (SbSettlement) super.getImportList().get(0);

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
        this.sbSettlement = (SbSettlement) super.getImportList().get(0);
        String id = this.sbSettlement.getId();

        ExcelReader reader = new ExcelReader();
        reader.setFilePath(this.excelReader.getFilePath());
        reader.setSheetName(this.excelReader.getSheetName());
        reader.setClassName("com.iflat.sm.bean.SbSettlementDetail");
        reader.setStartRow(3);
        reader.setEndRow(0);
        reader.setEndColumn(0);
        reader.setProps(new String[]{"account", "content", "amount", "matQty", "spec", "unit", "price", "comment"});

        //读取excel
        List list = ExcelUtil.read(reader);
        for (int i = 0; i < list.size(); i++) {
            SbSettlementDetail o = (SbSettlementDetail) list.get(i);

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
        startProcess(this.sbSettlement);
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

    public SbSettlement getSbSettlement() {
        return sbSettlement;
    }

    public void setSbSettlement(SbSettlement sbSettlement) {
        this.sbSettlement = sbSettlement;
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    public SbSettlementDetailService getSbSettlementDetailService() {
        return sbSettlementDetailService;
    }

    public void setSbSettlementDetailService(SbSettlementDetailService sbSettlementDetailService) {
        this.sbSettlementDetailService = sbSettlementDetailService;
    }
}
