package com.iflat.workflow.listener.sm;

import com.iflat.system.service.UserService;
import com.iflat.util.Application;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;

/**
 * Created by tyriv on 2016/3/16.
 */
public class SbRequestTaskHandler implements TaskListener {
    @Override
    public void notify(DelegateTask delegateTask) {

        // 获取申请人的唯一标识（账号）
        String submitUser = (String) delegateTask.getVariable("submitUser");

        UserService userService
                = Application.getSpringContext().getBean("userService", UserService.class);

    }
}
