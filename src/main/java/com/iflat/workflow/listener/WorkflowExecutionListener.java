package com.iflat.workflow.listener;

import com.iflat.util.StringUtil;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;

import java.lang.reflect.Method;

/**
 * Created by tyriv on 2016/3/30.
 */
public class WorkflowExecutionListener implements ExecutionListener {
    @Override
    public void notify(DelegateExecution execution) throws Exception {
        String name = execution.getCurrentActivityName();
        name = StringUtil.removeBlank(name);
        name = StringUtil.lowerCaseFirstChar(name);
        Method method = null;
        try {
            method = this.getClass().getMethod(name, DelegateExecution.class);
            method.invoke(this, execution);

        } catch (Exception e) {

        }
    }
}
