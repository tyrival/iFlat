package com.iflat.sm.service.impl;

import com.iflat.base.entity.ExcelReader;
import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.code.bean.Team;
import com.iflat.report.bean.bi.Project;
import com.iflat.sm.bean.SrSettlement;
import com.iflat.sm.bean.SrSettlementDetlFirst;
import com.iflat.sm.service.SrSettlementDetlFirstService;
import com.iflat.sm.service.SrSettlementService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserService;
import com.iflat.util.ExcelUtil;
import com.iflat.util.Session;
import com.iflat.util.StringUtil;
import com.iflat.workflow.service.WorkflowService;
import org.apache.commons.collections.map.HashedMap;

import java.io.File;
import java.util.*;

/**
 * Created by tyriv on 2016/3/23.
 */
public class SrSettlementServiceImpl extends BaseServiceSupport implements SrSettlementService {

    private WorkflowService workflowService;
    private SrSettlementDetlFirstService srSettlementDetlFirstService;
    private BaseService rptProjectService;

    private UserService userService;
    private BaseService teamService;
    private String srtype;
    private SrSettlement srSettlement;
    private Map<String, Object> map;

    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((SrSettlement)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((SrSettlement)this.saveObj).setCreatorName(userInfoVo.getUserName());
        ((SrSettlement)this.saveObj).setCreateTime(new Date());
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
    protected void generateProcessKey() {
        super.generateProcessKey();
        this.processKey += ((SrSettlement) this.processObj).getType();
    }

    @Override
    protected void beforeStartProcess() throws Exception {
        // 将工号置入流程变量，用于后续查询修船总管
        processMap.put("projNo", reflectProcessObj.getMethodValue("projNo").toString());
        processMap.put("deptName", reflectProcessObj.getMethodValue("deptName").toString());

        // 零星工程和机电修理需要选择主修审核，所以将主修账号放入流程变量
        String professionalMgrAcc = reflectProcessObj.getMethodValue("professionalMgrAcc").toString();
        if (professionalMgrAcc != null && !"".equals(professionalMgrAcc)) {
            processMap.put("professionalMgrAcc", professionalMgrAcc);
        }
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
        SrSettlementDetlFirst param = new SrSettlementDetlFirst();
        param.setPid(((SrSettlement) this.deleteObj).getId());
        this.srSettlementDetlFirstService.delete(param);
        // 删除流程实例
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param srSettlement
     * @throws Exception
     */
    @Override
    public void submit(SrSettlement srSettlement) throws Exception {

        SrSettlement param = new SrSettlement();
        param.setId(srSettlement.getId());
        srSettlement = (SrSettlement) list(srSettlement).get(0);
        if (!"未提交".equals(srSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(srSettlement));
    }

    @Override
    protected void setImportExcelReader() throws Exception {
        String[] props = null;
        switch (srtype) {
            case "Main":
                props = new String[]{"projNo", "deptName", "progress", "comment"};
                break;
            case "Misc":
                props = new String[]{"projNo", "professionalMgrAcc", "comment"};
                break;
            case "Sys":
                props = new String[]{"projNo", "team", "professionalMgrAcc", "comment"};
                break;
        }
        if (props == null) {
            throw new Exception("SrSettlementService中没有定义相应的结算类型。");
        }
        super.getExcelReader().setClassName("com.iflat.sm.bean.SrSettlement");
        this.excelReader.setEndRow(2);
        super.getExcelReader().setProps(props);
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        SrSettlement o = (SrSettlement) list.get(0);
        o.setId(UUID.randomUUID().toString());
        o.setType(srtype);
        o.setStatus("未提交");
        UserInfoVo user = Session.getUserInfo();
        o.setCreatorAcc(user.getAccount());
        o.setCreatorName(user.getUserName());
        o.setCreateTime(new Date());

        switch (srtype) {
            case "Misc":
                o.setDeptName(user.getPorgName());
                break;
            case "Sys":
                o.setDeptName(user.getPorgName());
                break;
        }

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

        if ("Main".equals(srtype) && StringUtil.isBlank(o.getDeptName())) {
            throw new Exception("导入失败，未填写部门。");
        }

        if ("Sys".equals(srtype) && StringUtil.isBlank(o.getTeam())) {
            throw new Exception("导入失败，未填写工程队名。");
        }

        if (("Misc".equals(srtype) || "Sys".equals(srtype))
                && StringUtil.isBlank(o.getProfessionalMgrAcc())) {
            throw new Exception("导入失败，未填写主修一卡通卡号。");
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

        // Misc或Sys验证主修账号
        if ("Misc".equals(srtype) || "Sys".equals(srtype)) {
            UserInfoVo u = new UserInfoVo();
            u.setAccount(o.getProfessionalMgrAcc());
            u.setRoleName("修船主修");
            List<UserInfoVo> list = userService.listVoByVo(u);
            if (list == null || list.size() <= 0) {
                throw new Exception("不存在账号为" + o.getProfessionalMgrAcc() + "该修船主修。");
            }
        }

        // Sys验证工程队名
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
        this.srSettlement = (SrSettlement) super.getImportList().get(0);
        String id = this.srSettlement.getId();

        ExcelReader reader = new ExcelReader();
        reader.setFilePath(this.excelReader.getFilePath());
        reader.setSheetName(this.excelReader.getSheetName());
        reader.setClassName("com.iflat.sm.bean.SrSettlementDetlFirst");
        reader.setStartRow(3);
        reader.setEndRow(0);
        reader.setEndColumn(0);
        reader.setProps(new String[]{"type", "applyContent", "specs", "unit", "applyQty1", "applyQty2", "applyQty3", "applyQty4", "comment"});

        //读取excel
        List list = ExcelUtil.read(reader);
        for (int i = 0; i < list.size(); i++) {
            SrSettlementDetlFirst o = (SrSettlementDetlFirst) list.get(i);

            if (StringUtil.isBlank(o.getApplyContent())) {
                throw new Exception("导入失败。第" + i + "行施工内容为空，请填写后重新导入。");
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
        this.srtype = type;
        List list = this.importExcel(file, fileName);
        getMap().put("head", list);
        return this.map;
    }


    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @Override
    public WorkflowService getWorkflowService() {
        return workflowService;
    }

    public SrSettlementDetlFirstService getSrSettlementDetlFirstService() {
        return srSettlementDetlFirstService;
    }

    public void setSrSettlementDetlFirstService(SrSettlementDetlFirstService srSettlementDetlFirstService) {
        this.srSettlementDetlFirstService = srSettlementDetlFirstService;
    }

    public BaseService getRptProjectService() {
        return rptProjectService;
    }

    public void setRptProjectService(BaseService rptProjectService) {
        this.rptProjectService = rptProjectService;
    }

    public SrSettlement getSrSettlement() {
        return srSettlement;
    }

    public void setSrSettlement(SrSettlement srSettlement) {
        this.srSettlement = srSettlement;
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

    public Map<String, Object> getMap() {
        if (map == null) {
            map = new HashedMap();
        }
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }
}
