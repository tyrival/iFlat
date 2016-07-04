package com.iflat.xr.listener;

import com.iflat.base.service.BaseService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowTaskListener;
import com.iflat.xr.bean.SrProjectMgr;
import com.iflat.xr.entity.SrStatus;
import org.activiti.engine.delegate.DelegateTask;

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

        UserInfoVo userInfoVo = Session.getUserInfo();
        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName(userInfoVo.getPorgName());
        assignee.setRoleName("修船车间主任");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void quotaEstimate(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_QUOTA_ESTIMATE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("定额员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void safetyAssess(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_QUOTA_ESTIMATE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("安保部");
        assignee.setRoleName("安全员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void qualityAssess(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_QUOTA_ESTIMATE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("技术质量部");
        assignee.setRoleName("质检员");
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
        srProjectMgr = list.get(0);
        delegateTask.setAssignee(srProjectMgr.getAccount());
    }

    public void businessDivisionDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("生产部");
        assignee.setRoleName("生产部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void commercialCenterSettlement(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_COMMERCIAL_CENTER_SETTLEMENT);

        // 通过CandidateUsers配置多个经营结算员
        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("经营部");
        assignee.setRoleName("经营结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void commercialCenterDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("经营部");
        assignee.setRoleName("经营部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void workshopSettlement(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT);

        UserInfoVo assignee = new UserInfoVo();
        String deptName = (String) delegateTask.getVariable("dept");
        assignee.setPorgName(deptName);
        assignee.setRoleName("修船车间结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void workshopSettlementApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        String deptName = (String) delegateTask.getVariable("dept");
        assignee.setPorgName(deptName);
        assignee.setRoleName("修船车间主任");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void leaderApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrStatus.STATUS_LEADER_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setRoleName("总经理");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
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
                    .getBean("xrXrSrProjectMgrService", BaseService.class);
        }
        return xrSrProjectMgrService;
    }
}
