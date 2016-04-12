package com.iflat.workflow.listener;

import com.iflat.sm.entity.SrStatus;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserService;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.iflat.util.StringUtil;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;

import java.lang.reflect.Method;
import java.util.*;

/**
 * Created by tyriv on 2016/3/30.
 */
public class WorkflowTaskListener implements TaskListener {

    private UserService userService;

    @Override
    public void notify(DelegateTask delegateTask) {

        String taskName = delegateTask.getName();
        taskName = StringUtil.removeBlank(taskName);
        taskName = StringUtil.lowerCaseFirstChar(taskName);
        Method method = null;
        try {
            method = this.getClass().getMethod(taskName, DelegateTask.class);
            method.invoke(this, delegateTask);

        } catch (Exception e) {

        }
    }

    /**
     * 由UserInfoVoList生成CandidateUsers
     * @param list
     * @return
     */
    protected List<String> getCandidateUsers(List<UserInfoVo> list) {
        List<String> candidate = new ArrayList<>();
        if (list != null && list.size() != 0) {
            candidate.add(list.get(0).getAccount());
        }
        return candidate;
    }

    /**
     * 获取下个节点的Assignee清单
     * @param userInfoVo
     * @return
     * @throws Exception
     */
    protected List<UserInfoVo> listAssignees(UserInfoVo userInfoVo) throws Exception {

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
    protected void setAssignee(DelegateTask delegateTask, String keyword) throws Exception {

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
    protected void setTaskInfo(DelegateTask delegateTask, String taskName, String description) {
        delegateTask.setName(taskName);
        delegateTask.setDescription(description);
    }

    protected UserService getUserService() {
        if (userService == null) {
            userService = Application.getSpringContext()
                    .getBean("userService", UserService.class);
        }
        return userService;
    }
}
