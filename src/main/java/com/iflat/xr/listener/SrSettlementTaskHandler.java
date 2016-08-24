package com.iflat.xr.listener;

import com.iflat.base.service.BaseService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowTaskListener;
import com.iflat.xr.bean.SrProjectMgr;
import com.iflat.xr.entity.SrStatus;
import org.activiti.engine.delegate.DelegateTask;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tyriv on 2016/7/2.
 */
public class SrSettlementTaskHandler extends WorkflowTaskListener {
    private BaseService xrSrProjectMgrService;

    public void submit(DelegateTask delegateTask) throws Exception {
        setTaskInfo(delegateTask, SrStatus.STATUS_UNSUBMIT);
    }

    public void workshopDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_WORKSHOP_DIRECTOR_APPROVE);

        String deptName = (String) delegateTask.getVariable("dept");
        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName(deptName);
        assignee.setRoleName("新荣车间领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void quotaEstimate(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_QUOTA_ESTIMATE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司人力资源部");
        assignee.setRoleName("新荣定额员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void safetyAssess(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_SAFETY_ASSESS);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司安保部");
        assignee.setRoleName("新荣安保部领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void qualityAssess(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_QUALITY_ASSESS);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司技术质量部");
        assignee.setRoleName("新荣技术质量部领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void projectManagerAudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_PROJECT_MANAGER_AUDIT);

        SrProjectMgr srProjectMgr = new SrProjectMgr();
        String projNo = (String) delegateTask.getVariable("projNo");
        srProjectMgr.setProjNo(projNo);
        List<SrProjectMgr> list = getXrSrProjectMgrService().list(srProjectMgr);
        if (list == null || list.size() == 0) {
            throw new Exception("未找到此工程的总管，请在“基础数据-修船总管”中定义");
        }
        delegateTask.addCandidateUsers(getSrProjectMgrs(list));
    }

    private List<String> getSrProjectMgrs(List<SrProjectMgr> list) {
        List<String> candidate = new ArrayList<>();
        if (list != null && list.size() != 0) {
            for (int i = 0; i < list.size(); i++) {
                candidate.add(list.get(i).getAccount());
            }
        }
        return candidate;
    }

    public void businessDivisionDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司生产部");
        assignee.setRoleName("新荣生产部领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void commercialCenterSettlement(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_COMMERCIAL_CENTER_SETTLEMENT);

        // 通过CandidateUsers配置多个经营结算员
        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司经营部");
        assignee.setRoleName("新荣经营结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void commercialCenterDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司经营部");
        assignee.setRoleName("新荣经营部领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void workshopSettlement(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT);

        UserInfoVo assignee = new UserInfoVo();
        String deptName = (String) delegateTask.getVariable("dept");
        assignee.setPorgName(deptName);
        assignee.setRoleName("新荣车间结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void workshopSettlementApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        String deptName = (String) delegateTask.getVariable("dept");
        assignee.setPorgName(deptName);
        assignee.setRoleName("新荣车间领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司人力资源部");
        assignee.setRoleName("新荣人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrReAudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_HR_REAUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司人力资源部");
        assignee.setRoleName("新荣人力资源部复核员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司人力资源部");
        assignee.setRoleName("新荣人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void viceManagerApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_VICE_MANAGER_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setRoleName("新荣公司领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    /**
     * 设置任务的名称和描述
     * @param delegateTask
     * @param description
     */
    private void setTaskInfo(DelegateTask delegateTask, String description) {
        this.setTaskInfo(delegateTask, SrStatus.TASK_NAME, description);
    }

    private BaseService getXrSrProjectMgrService() {
        if (xrSrProjectMgrService == null) {
            xrSrProjectMgrService = Application.getSpringContext()
                    .getBean("srProjectMgrService", BaseService.class);
        }
        return xrSrProjectMgrService;
    }
}
