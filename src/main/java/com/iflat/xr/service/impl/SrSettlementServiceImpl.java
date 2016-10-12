package com.iflat.xr.service.impl;

import com.iflat.base.entity.ExcelReader;
import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserService;
import com.iflat.util.ExcelUtil;
import com.iflat.util.Session;
import com.iflat.util.StringUtil;
import com.iflat.workflow.service.WorkflowService;
import com.iflat.xr.bean.*;
import com.iflat.xr.service.SrSettlementService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.*;

public class SrSettlementServiceImpl extends BaseServiceSupport implements SrSettlementService {

    private WorkflowService workflowService;
    private BaseService srSettlementDetlService;
    private BaseService xrProjectService;
    private BaseService srProjectMgrService;
    private BaseService srBalanceService;

    private UserService userService;
    private BaseService teamService;
    private SrSettlement xrSrSettlement;
    private Map<String, Object> map;

    @Override
    protected void beforeSave() throws Exception {

        // 获取原始部门余额，看是否足以支付此次分配
        SrSettlement srSettlement = (SrSettlement) this.saveObj;
        double diff = srSettlement.getAmountDiff();
        if (diff < 0) {
            SrBalance srBalance = new SrBalance();
            srBalance.setDept(srSettlement.getDept());
            List<SrBalance> list
                    = this.srBalanceService.list(srBalance);
            if (list == null || list.size() == 0) {
                this.srBalanceService.save(srBalance);
                throw new Exception("此部门无结余金额，无法进行超支结算。");
            }
            srBalance = list.get(0);

            // 根据id查询此单据，如果存在，则获取原始金额，与修改后的金额相减，差用于修改部门结余金额

            if (srBalance.getAmount() < Math.abs(diff)) {
                throw new Exception("部门结余为"
                        + srBalance.getAmount()
                        + "元，不足以支付此次金额为" + srSettlement.getAmountDiff()
                        + "元的超支，请重新调整。");
            }
        }
    }

    @Override
    protected void beforeInsert() throws Exception {
        SrSettlement o = (SrSettlement) this.saveObj;
        SrProjectMgr mgr = new SrProjectMgr();
        mgr.setProjNo(o.getProjNo());
        List list = srProjectMgrService.list(mgr);
        if (list == null || list.size() == 0) {
            throw new Exception("未定义" + o.getProjName() + "的修船总管信息。");
        }
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
    protected void beforeStartProcess() throws Exception {
        // 将工号置入流程变量，用于后续查询修船总管
        processMap.put("id", reflectProcessObj.getMethodValue("id").toString());
        processMap.put("projNo", reflectProcessObj.getMethodValue("projNo").toString());
        processMap.put("dept", reflectProcessObj.getMethodValue("dept").toString());
    }

    @Override
    protected void beforeDelete() throws Exception {
        if (!"未提交".equals(((SrSettlement) this.deleteObj).getStatus())) {
            throw new Exception("无法删除已提交的数据");
        }
    }

    /**
     * 删除对象时，删除流程实例
     * @throws Exception
     */
    @Override
    protected void afterDelete() throws Exception {
        // 删除明细项
        SrSettlementDetl param = new SrSettlementDetl();
        param.setPid(((SrSettlement) this.deleteObj).getId());
        this.srSettlementDetlService.delete(param);
        // 删除流程实例
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param srSettlement
     * @throws Exception
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submit(SrSettlement srSettlement) throws Exception {

        SrSettlement param = new SrSettlement();
        param.setId(srSettlement.getId());
        srSettlement = (SrSettlement) list(srSettlement).get(0);
        if (!"未提交".equals(srSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }

        // 施工队为本工，则需定额，修改需定额
        if (!srSettlement.getIsOutwork()) {
            srSettlement.setIsQuota(true);
        }
        // 遍历明细，只要有一项明细需要定额，则流向定额员
        SrSettlementDetl paramDetl = new SrSettlementDetl();
        paramDetl.setPid(srSettlement.getId());
        List<SrSettlementDetl> list = srSettlementDetlService.list(paramDetl);
        if (list != null && list.size() > 0) {
            for (int i = 0; i < list.size(); i++) {
                SrSettlementDetl o = list.get(i);
                if (o.getIsQuota()) {
                    srSettlement.setIsQuota(true);
                }
            }
        }
        srSettlement = (SrSettlement) save(srSettlement);
        // 置入流程变量
        Map<String,Object> variables = new HashMap<String,Object>();
        variables.put("isQuota", srSettlement.getIsQuota());
        variables.put("isOutwork", srSettlement.getIsOutwork());
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(srSettlement), variables);
    }

    @Override
    protected void setImportExcelReader() throws Exception {
        String[] props = new String[]{"projNo", "team", "comment"};
        super.getExcelReader().setClassName("com.iflat.xr.bean.SrSettlement");
        this.excelReader.setEndRow(2);
        super.getExcelReader().setProps(props);
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        SrSettlement o = (SrSettlement) list.get(0);
        o.setId(UUID.randomUUID().toString());
        o.setStatus("未提交");
        UserInfoVo user = Session.getUserInfo();
        o.setDept(user.getPorgName());
        o.setCreatorAcc(user.getAccount());
        o.setCreatorName(user.getUserName());
        o.setCreateTime(new Date());

        o.setDept(user.getPorgName());
        List newList = new ArrayList<>();
        newList.add(o);
        setImportList(newList);
    }

    @Override
    protected void importValidate() throws Exception {

        // 校验工号是否存在
        SrSettlement o = (SrSettlement) super.getImportList().get(0);

        if (StringUtil.isBlank(o.getProjNo())) {
            throw new Exception("导入失败，未填写工号。");
        }

        if (StringUtil.isBlank(o.getTeam())) {
            throw new Exception("导入失败，未填写工程队名。");
        }

        Project project = new Project();
        project.setProjNo(o.getProjNo());
        project.setStatus("0");
        List<Project> projectList = this.xrProjectService.list(project);
        if (projectList == null) {
            project.setStatus(null);
            projectList = this.xrProjectService.list(project);
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

        // Sys验证工程队名
        Team team = new Team();
        team.setDept(o.getDept());
        team.setTeam(o.getTeam());
        List<Team> teams = teamService.list(team);
        if (teams == null || teams.size() <= 0) {
            throw new Exception("部门【" + o.getDept() + "】不存在【" + o.getTeam() + "】施工队");
        }
    }

    @Override
    protected void beforeImportData() throws Exception {
        /**
         * 导入明细信息
         */
        // 获取头信息id，作为明细的pid
        this.xrSrSettlement = (SrSettlement) super.getImportList().get(0);
        String id = this.xrSrSettlement.getId();

        ExcelReader reader = new ExcelReader();
        reader.setFilePath(this.excelReader.getFilePath());
        reader.setSheetName(this.excelReader.getSheetName());
        reader.setClassName("com.iflat.xr.bean.SrSettlementDetl");
        reader.setStartRow(3);
        reader.setEndRow(0);
        reader.setEndColumn(0);
        reader.setProps(new String[]{"isQuota", "applyContent", "specs", "unit", "applyQty", "degree", "comment"});

        //读取excel
        List list = ExcelUtil.read(reader);
        for (int i = 0; i < list.size(); i++) {
            SrSettlementDetl o = (SrSettlementDetl) list.get(i);

            if (StringUtil.isBlank(o.getApplyContent())) {
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
        getMap().put("detail", list);
    }

    @Override
    public Map importExcel(File file, String fileName, String type) throws Exception {
        List list = this.importExcel(file, fileName);
        getMap().put("head", list);
        return this.map;
    }

    @Override
    protected void afterImportData() throws Exception {
        startProcess(this.xrSrSettlement);
    }


    @Override
    public WorkflowService getWorkflowService() {
        return workflowService;
    }

    @Override
    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    public BaseService getSrSettlementDetlService() {
        return srSettlementDetlService;
    }

    public void setSrSettlementDetlService(BaseService srSettlementDetlService) {
        this.srSettlementDetlService = srSettlementDetlService;
    }

    public BaseService getXrProjectService() {
        return xrProjectService;
    }

    public void setXrProjectService(BaseService xrProjectService) {
        this.xrProjectService = xrProjectService;
    }

    public BaseService getSrProjectMgrService() {
        return srProjectMgrService;
    }

    public void setSrProjectMgrService(BaseService srProjectMgrService) {
        this.srProjectMgrService = srProjectMgrService;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public BaseService getTeamService() {
        return teamService;
    }

    public void setTeamService(BaseService teamService) {
        this.teamService = teamService;
    }

    public SrSettlement getXrSrSettlement() {
        return xrSrSettlement;
    }

    public void setXrSrSettlement(SrSettlement xrSrSettlement) {
        this.xrSrSettlement = xrSrSettlement;
    }

    public Map<String, Object> getMap() {
        if (map == null) {
            map = new HashedMap();
        }
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }

    public BaseService getSrBalanceService() {
        return srBalanceService;
    }

    public void setSrBalanceService(BaseService srBalanceService) {
        this.srBalanceService = srBalanceService;
    }
}
