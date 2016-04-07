package com.iflat.sm.listener;

import com.iflat.sm.entity.SbStatus;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserService;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowTaskListener;
import org.activiti.engine.delegate.DelegateTask;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2016/3/30.
 */
public class SbSettlementTaskHandler extends WorkflowTaskListener {

    private UserService userService;

    public void submit(DelegateTask delegateTask) throws Exception {

        // 设置Task的描述
        setTaskInfo(delegateTask, SbStatus.STATUS_UNSUBMIT);

        /* 退回未提交状态时，不填写assignee，从而不在提交人的Task界面显示，
        否则当提交人在Task界面弹窗提示后，在标签页就会因为id重复而打不开 */
        /*String assignee = (String) delegateTask.getVariable(SbStatus.STATUS_SUBMIT + "人");
        delegateTask.setAssignee(assignee);*/
    }

    public void workshopApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_SUBMIT);
        setTaskInfo(delegateTask, SbStatus.STATUS_WORKSHOP_APPROVE);

        UserInfoVo userInfoVo = Session.getUserInfo();
        String porgId = userInfoVo.getPorgId();
        UserInfoVo assignee = new UserInfoVo();
        assignee.setRoleName("造船车间主任");
        assignee.setPorgId(porgId);
        delegateTask.setAssignee(listAssignees(assignee).get(0).getAccount());

    }

    public void businessDivisionAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_WORKSHOP_APPROVE);
        setTaskInfo(delegateTask, SbStatus.STATUS_BUSINESS_DIVISION_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("造船事业部");
        assignee.setRoleName("造船事业部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
    }

    public void businessDivisionDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_BUSINESS_DIVISION_AUDIT);
        setTaskInfo(delegateTask, SbStatus.STATUS_BUSINESS_DIVITION_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("造船事业部");
        assignee.setRoleName("造船事业部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
    }

    public void hrAudit(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_BUSINESS_DIVITION_DIRECTOR_APPROVE);
        setTaskInfo(delegateTask, SbStatus.STATUS_HR_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部结算员");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
    }

    public void hrDirectorApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_HR_AUDIT);
        setTaskInfo(delegateTask, SbStatus.STATUS_HR_DIRECTOR_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("人力资源部");
        assignee.setRoleName("人力资源部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
    }

    public void leaderApprove(DelegateTask delegateTask) throws Exception {

        setAssignee(delegateTask, SbStatus.STATUS_HR_DIRECTOR_APPROVE);
        setTaskInfo(delegateTask, SbStatus.STATUS_LEADER_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setRoleName("总经理");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.setAssignee(list.get(0).getAccount());
    }


    /**
     * 获取下个节点的Assignee清单
     * @param userInfoVo
     * @return
     * @throws Exception
     */
    private List<UserInfoVo> listAssignees(UserInfoVo userInfoVo) throws Exception {

        List<UserInfoVo> list = getUserService().listVoByVo(userInfoVo);
        if (list == null || list.size() == 0) {
            throw new NullPointerException("未定义下一节点的审批人，请联系系统管理员。");
        } else {
            return list;
        }
    }

    /**
     * 设置任务处理人和处理时间信息
     * @param delegateTask
     * @param keyword
     * @throws Exception
     */
    private void setAssignee(DelegateTask delegateTask, String keyword) throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        Map<String, Object> varMap = new HashMap<>();
        varMap.put(keyword + "人", userInfoVo.getUserName());
        varMap.put(keyword + "时间", new Date());
        delegateTask.setVariables(varMap);
    }

    /**
     * 设置任务的名称和描述
     * @param delegateTask
     * @param description
     */
    private void setTaskInfo(DelegateTask delegateTask, String description) {
        delegateTask.setName(SbStatus.TASK_NAME);
        delegateTask.setDescription(description);
    }

    private UserService getUserService() {
        if (userService == null) {
            userService = Application.getSpringContext()
                    .getBean("userService", UserService.class);
        }
        return userService;
    }
}
