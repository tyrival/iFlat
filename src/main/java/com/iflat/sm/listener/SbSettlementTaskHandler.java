package com.iflat.sm.listener;

import com.iflat.sm.entity.SbStatus;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowTaskListener;
import org.activiti.engine.delegate.DelegateTask;

import java.util.List;

/**
 * Created by tyriv on 2016/3/30.
 */
public class SbSettlementTaskHandler extends WorkflowTaskListener {

    public void submit(DelegateTask delegateTask) throws Exception {

        // 设置Task的描述
        setTaskInfoSb(delegateTask, SbStatus.STATUS_UNSUBMIT);

        /* 退回未提交状态时，不填写assignee，从而不在提交人的Task界面显示，
        否则当提交人在Task界面弹窗提示后，在标签页就会因为id重复而打不开 */
        /*String assignee = (String) delegateTask.getVariable(SbStatus.STATUS_SUBMIT + "人");
        delegateTask.setAssignee(assignee);*/
    }

    public void workshopApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_SUBMIT);
        setTaskInfoSb(delegateTask, SbStatus.STATUS_WORKSHOP_APPROVE);

        UserInfoVo userInfoVo = Session.getUserInfo();
        String porgId = userInfoVo.getPorgId();
        UserInfoVo assignee = new UserInfoVo();
        assignee.setRoleName("造船车间主任");
        assignee.setPorgId(porgId);
        delegateTask.setAssignee(listAssignees(assignee).get(0).getAccount());

    }

    public void businessDivisionAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_WORKSHOP_APPROVE);
        setTaskInfoSb(delegateTask, SbStatus.STATUS_BUSINESS_DIVISION_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("造船事业部");
        assignee.setRoleName("造船事业部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
    }

    public void businessDivisionDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_BUSINESS_DIVISION_AUDIT);
        setTaskInfoSb(delegateTask, SbStatus.STATUS_BUSINESS_DIVITION_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("造船事业部");
        assignee.setRoleName("造船事业部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
    }

    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_BUSINESS_DIVITION_DIRECTOR_APPROVE);
        setTaskInfoSb(delegateTask, SbStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_HR_AUDIT);
        setTaskInfoSb(delegateTask, SbStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
    }

    public void leaderApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_HR_DIRECTOR_APPROVE);
        setTaskInfoSb(delegateTask, SbStatus.STATUS_LEADER_APPROVE);

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
    private void setTaskInfoSb(DelegateTask delegateTask, String description) {
        this.setTaskInfo(delegateTask, SbStatus.TASK_NAME, description);
    }

}
