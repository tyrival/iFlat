package com.iflat.sm.listener;

import com.iflat.sm.entity.TempStatus;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowTaskListener;
import org.activiti.engine.delegate.DelegateTask;

import java.util.List;

/**
 * Created by tyriv on 2016/3/30.
 */
public class TemporaryTaskHandler extends WorkflowTaskListener {

    public void submit(DelegateTask delegateTask) throws Exception {

        // 设置Task的描述
        setTaskInfoTemp(delegateTask, TempStatus.STATUS_UNSUBMIT);

    }

    public void workshopDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, TempStatus.STATUS_SUBMIT);
        setTaskInfoTemp(delegateTask, TempStatus.STATUS_WORKSHOP_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName(Session.getUserInfo().getPorgName());
        assignee.setRoleName("修船车间主任");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }
    
    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, TempStatus.STATUS_WORKSHOP_DIRECTOR_APPROVE);
        setTaskInfoTemp(delegateTask, TempStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, TempStatus.STATUS_HR_AUDIT);
        setTaskInfoTemp(delegateTask, TempStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void leaderApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, TempStatus.STATUS_HR_DIRECTOR_APPROVE);
        setTaskInfoTemp(delegateTask, TempStatus.STATUS_LEADER_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setRoleName("总经理");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }
    
    /**
     * 设置任务的名称和描述
     * @param delegateTask
     * @param description
     */
    private void setTaskInfoTemp(DelegateTask delegateTask, String description) {
        this.setTaskInfo(delegateTask, TempStatus.TASK_NAME, description);
    }

}
