package com.iflat.workflow.listener;

import com.iflat.util.StringUtil;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;

import java.lang.reflect.Method;

/**
 * Created by tyriv on 2016/3/30.
 */
public class WorkflowTaskListener implements TaskListener {

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
}
