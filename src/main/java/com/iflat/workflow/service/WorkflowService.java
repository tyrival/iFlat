package com.iflat.workflow.service;

import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2016/3/9.
 */
public interface WorkflowService {

    /* 流程定义 */
    Deployment deployProcess(File file);

    List<ProcessDefinition> listProcessDefinition();

    void deleteProcess(String deploymentId);

    void startProcess(String processDefinitionKey, String buisinessKey, Map<String, Object> map);

    /* 流程实例 */
    ProcessInstance listProcessInstanceByBusinessKey(String businessKey);

    List<Task> listPersonalTask(String assignee);
}
