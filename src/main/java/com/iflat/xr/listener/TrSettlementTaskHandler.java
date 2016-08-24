package com.iflat.xr.listener;

import com.iflat.base.service.BaseService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.workflow.listener.WorkflowTaskListener;
import com.iflat.xr.bean.SrProjectMgr;
import com.iflat.xr.entity.TrStatus;
import org.activiti.engine.delegate.DelegateTask;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tyriv on 2016/7/2.
 */
public class TrSettlementTaskHandler extends WorkflowTaskListener {
    private BaseService xrSrProjectMgrService;

    public void submit(DelegateTask delegateTask) throws Exception {
        setTaskInfo(delegateTask, TrStatus.STATUS_UNSUBMIT);
    }

    public void applyDeptDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_APPLY_DEPT_DIRECTOR_APPROVE);

        String deptName = (String) delegateTask.getVariable("creatorDept");
        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName(deptName);
        assignee.setRoleName("新荣车间领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void quotaEstimate(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_QUOTA_ESTIMATE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司人力资源部");
        assignee.setRoleName("新荣定额员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void supportDeptSettlement(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_SUPPORT_DEPT_SETTLEMENT);

        // 通过CandidateUsers配置多个经营结算员
        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司保障部");
        assignee.setRoleName("新荣保障部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void supportDeptDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_SUPPORT_DEPT_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司保障部");
        assignee.setRoleName("新荣保障部领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void constructionDeptSettlement(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_CONSTRUCTION_DEPT_SETTLEMENT);

        UserInfoVo assignee = new UserInfoVo();
        String deptName = (String) delegateTask.getVariable("dept");
        assignee.setPorgName(deptName);
        assignee.setRoleName("新荣车间结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void constructionDeptSettlementApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_CONSTRUCTION_DEPT_SETTLEMENT_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        String deptName = (String) delegateTask.getVariable("dept");
        assignee.setPorgName(deptName);
        assignee.setRoleName("新荣车间领导");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司人力资源部");
        assignee.setRoleName("新荣人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrReAudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_HR_REAUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司人力资源部");
        assignee.setRoleName("新荣人力资源部复核员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("新荣公司人力资源部");
        assignee.setRoleName("新荣人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void viceManagerApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, TrStatus.STATUS_VICE_MANAGER_APPROVE);

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
        this.setTaskInfo(delegateTask, TrStatus.TASK_NAME, description);
    }

}
