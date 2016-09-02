package com.iflat.xr.service.impl;

import com.iflat.base.entity.ExcelReader;
import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.ExcelUtil;
import com.iflat.util.Session;
import com.iflat.util.StringUtil;
import com.iflat.workflow.service.WorkflowService;
import com.iflat.xr.bean.*;
import com.iflat.xr.service.TrSettlementService;
import org.apache.commons.collections.map.HashedMap;

import java.io.File;
import java.util.*;

public class TrSettlementServiceImpl extends BaseServiceSupport implements TrSettlementService {
    private WorkflowService workflowService;
    private BaseService trSettlementDetlService;
    private BaseService xrProjectService;
    private BaseService srBalanceService;

    private BaseService teamService;
    private TrSettlement trSettlement;
    private Map<String, Object> map;

    @Override
    protected void beforeSave() throws Exception {

        // 获取原始部门余额，看是否足以支付此次分配
        TrSettlement trSettlement = (TrSettlement) this.saveObj;
        double diff = trSettlement.getAmountDiff();
        if (diff < 0) {
            SrBalance srBalance = new SrBalance();
            srBalance.setDept(trSettlement.getDept());
            List<SrBalance> list
                    = this.srBalanceService.list(srBalance);
            if (list == null || list.size() == 0) {
                this.srBalanceService.save(srBalance);
                throw new Exception("此部门无结余金额，无法进行超支结算。");
            }
            srBalance = list.get(0);
            if (srBalance.getAmount() < Math.abs(diff)) {
                throw new Exception("部门结余为"
                        + srBalance.getAmount()
                        + "元，不足以支付此次金额为" + trSettlement.getAmountDiff()
                        + "元的超支，请重新调整。");
            }
        }
        UserInfoVo userInfoVo = Session.getUserInfo();
        trSettlement.setCreatorDeptCode(userInfoVo.getPorgCode());
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
        processMap.put("projNo", reflectProcessObj.getMethodValue("projNo").toString());
        processMap.put("id", reflectProcessObj.getMethodValue("id").toString());
        processMap.put("creatorDept", reflectProcessObj.getMethodValue("creatorDept").toString());
        processMap.put("dept", reflectProcessObj.getMethodValue("dept").toString());
    }

    @Override
    protected void beforeDelete() throws Exception {
        if (!"未提交".equals(((TrSettlement) this.deleteObj).getStatus())) {
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
        TrSettlementDetl param = new TrSettlementDetl();
        param.setPid(((TrSettlement) this.deleteObj).getId());
        this.trSettlementDetlService.delete(param);
        // 删除流程实例
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param trSettlement
     * @throws Exception
     */
    @Override
    public void submit(TrSettlement trSettlement) throws Exception {

        TrSettlement param = new TrSettlement();
        param.setId(trSettlement.getId());
        trSettlement = (TrSettlement) list(trSettlement).get(0);
        if (!"未提交".equals(trSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        trSettlement = (TrSettlement) save(trSettlement);
        // 置入流程变量
        Map<String,Object> variables = new HashMap<String,Object>();
        variables.put("isOutwork", trSettlement.getIsOutwork());
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(trSettlement), variables);
    }

    @Override
    protected void setImportExcelReader() throws Exception {
        String[] props = new String[]{"projNo", "dept", "team", "reason", "comment"};
        super.getExcelReader().setClassName("com.iflat.xr.bean.TrSettlement");
        this.excelReader.setEndRow(2);
        super.getExcelReader().setProps(props);
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        TrSettlement o = (TrSettlement) list.get(0);
        o.setId(UUID.randomUUID().toString());
        o.setStatus("未提交");
        UserInfoVo user = Session.getUserInfo();
        o.setCreatorAcc(user.getAccount());
        o.setCreatorName(user.getUserName());
        o.setCreatorDept(user.getPorgName());
        o.setCreateTime(new Date());

        o.setDept(user.getPorgName());
        List newList = new ArrayList<>();
        newList.add(o);
        setImportList(newList);
    }

    @Override
    protected void importValidate() throws Exception {

        // 校验工号是否存在
        TrSettlement o = (TrSettlement) super.getImportList().get(0);

        if (StringUtil.isBlank(o.getProjNo())) {
            throw new Exception("导入失败，未填写工号。");
        }

        if (StringUtil.isBlank(o.getDept())) {
            throw new Exception("导入失败，未填写承办部门名。");
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
        this.trSettlement = (TrSettlement) super.getImportList().get(0);
        String id = this.trSettlement.getId();

        ExcelReader reader = new ExcelReader();
        reader.setFilePath(this.excelReader.getFilePath());
        reader.setSheetName(this.excelReader.getSheetName());
        reader.setClassName("com.iflat.xr.bean.TrSettlementDetl");
        reader.setStartRow(3);
        reader.setEndRow(0);
        reader.setEndColumn(0);
        reader.setProps(new String[]{"category", "content", "specs", "unit", "applyQty", "degree", "comment"});

        //读取excel
        List list = ExcelUtil.read(reader);
        for (int i = 0; i < list.size(); i++) {
            TrSettlementDetl o = (TrSettlementDetl) list.get(i);

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
        startProcess(this.trSettlement);
    }


    @Override
    public WorkflowService getWorkflowService() {
        return workflowService;
    }

    @Override
    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    public BaseService getTrSettlementDetlService() {
        return trSettlementDetlService;
    }

    public void setTrSettlementDetlService(BaseService trSettlementDetlService) {
        this.trSettlementDetlService = trSettlementDetlService;
    }

    public TrSettlement getTrSettlement() {
        return trSettlement;
    }

    public void setTrSettlement(TrSettlement trSettlement) {
        this.trSettlement = trSettlement;
    }

    public BaseService getXrProjectService() {
        return xrProjectService;
    }

    public void setXrProjectService(BaseService xrProjectService) {
        this.xrProjectService = xrProjectService;
    }

    public BaseService getTeamService() {
        return teamService;
    }

    public void setTeamService(BaseService teamService) {
        this.teamService = teamService;
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
