package com.iflat.sm.listener;

import com.iflat.sm.entity.ScStatus;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowTaskListener;
import org.activiti.engine.delegate.DelegateTask;

import java.util.List;

/**
 * Created by tyriv on 2016/4/8.
 */
public class ScSettlementTaskHandler extends WorkflowTaskListener {

    public void submit(DelegateTask delegateTask) throws Exception {

        // 设置Task的描述
        setTaskInfoSb(delegateTask, ScStatus.STATUS_UNSUBMIT);
    }

    public void businessDivisionDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, ScStatus.STATUS_SUBMIT);
        setTaskInfoSb(delegateTask, ScStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("钢结构事业部");
        assignee.setRoleName("钢结构事业部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, ScStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);
        setTaskInfoSb(delegateTask, ScStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, ScStatus.STATUS_HR_AUDIT);
        setTaskInfoSb(delegateTask, ScStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void leaderApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, ScStatus.STATUS_HR_DIRECTOR_APPROVE);
        setTaskInfoSb(delegateTask, ScStatus.STATUS_LEADER_APPROVE);

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
        this.setTaskInfo(delegateTask, ScStatus.TASK_NAME, description);
    }

}
