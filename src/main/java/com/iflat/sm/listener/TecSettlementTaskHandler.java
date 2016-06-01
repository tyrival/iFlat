package com.iflat.sm.listener;

import com.iflat.sm.entity.TecStatus;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowTaskListener;
import org.activiti.engine.delegate.DelegateTask;

import java.util.List;

/**
 * Created by tyriv on 2016/3/30.
 */
public class TecSettlementTaskHandler extends WorkflowTaskListener {

    public void submit(DelegateTask delegateTask) throws Exception {

        // 设置Task的描述
        setTaskInfoTec(delegateTask, TecStatus.STATUS_UNSUBMIT);

    }

    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, TecStatus.STATUS_SUBMIT);
        setTaskInfoTec(delegateTask, TecStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, TecStatus.STATUS_HR_AUDIT);
        setTaskInfoTec(delegateTask, TecStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void leaderApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, TecStatus.STATUS_HR_DIRECTOR_APPROVE);
        setTaskInfoTec(delegateTask, TecStatus.STATUS_LEADER_APPROVE);

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
    private void setTaskInfoTec(DelegateTask delegateTask, String description) {
        this.setTaskInfo(delegateTask, TecStatus.TASK_NAME, description);
    }

}
