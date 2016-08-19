package com.iflat.sm.listener;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SrProjectManager;
import com.iflat.sm.entity.SrStatus;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.workflow.listener.WorkflowTaskListener;
import org.activiti.engine.delegate.DelegateTask;

import java.util.List;

/**
 * Created by tyriv on 2016/4/8.
 */
public class SrMainTaskHandler extends WorkflowTaskListener {

    private BaseService srProjectManagerService;

    public void submit(DelegateTask delegateTask) throws Exception {

        setTaskInfoMain(delegateTask, SrStatus.STATUS_UNSUBMIT);
    }

    public void projectManagerAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_SUBMIT);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_PROJECT_MANAGER_AUDIT);

        SrProjectManager srProjectManager = new SrProjectManager();
        String projNo = (String) delegateTask.getVariable("projNo");
        srProjectManager.setProjNo(projNo);
        List<SrProjectManager> list = getSrProjectManagerService().list(srProjectManager);
        if (list == null || list.size() == 0) {
            throw new Exception("未找到此工程的总管，请在“基础数据-修船总管”中定义");
        }
        srProjectManager = list.get(0);
        delegateTask.setAssignee(srProjectManager.getAccount());
    }

    public void businessDivisionDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_PROJECT_MANAGER_AUDIT);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船事业部");
        assignee.setRoleName("修船事业部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void commercialCenterSettlement(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_COMMERCIAL_CENTER_SETTLEMENT);
        
        // 通过CandidateUsers配置多个经营结算员
        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船经营部");
        assignee.setRoleName("修船经营结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void commercialCenterDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_COMMERCIAL_CENTER_SETTLEMENT);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船经营部");
        assignee.setRoleName("修船经营部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void workshopSettlement(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT);

        UserInfoVo assignee = new UserInfoVo();
        String deptName = (String) delegateTask.getVariable("deptName");
        assignee.setPorgName(deptName);
        assignee.setRoleName("修船车间结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void workshopSettlementApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        String deptName = (String) delegateTask.getVariable("deptName");
        assignee.setPorgName(deptName);
        assignee.setRoleName("车间主任");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void businessDivisionAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_BUSINESS_DIVISION_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船事业部");
        assignee.setRoleName("修船事业部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_HR_AUDIT);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void leaderApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SrStatus.STATUS_HR_DIRECTOR_APPROVE);
        setTaskInfoMain(delegateTask, SrStatus.STATUS_LEADER_APPROVE);

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
    private void setTaskInfoMain(DelegateTask delegateTask, String description) {
        this.setTaskInfo(delegateTask, SrStatus.TASK_NAME_MAIN, description);
    }
    
    private BaseService getSrProjectManagerService() {
        if (srProjectManagerService == null) {
            srProjectManagerService = Application.getSpringContext()
                    .getBean("srProjectManagerService", BaseService.class);
        }
        return srProjectManagerService;
    }
}
