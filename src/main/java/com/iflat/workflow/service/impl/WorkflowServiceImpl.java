package com.iflat.workflow.service.impl;

import com.iflat.util.StringUtil;
import com.iflat.workflow.service.WorkflowService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.DeploymentBuilder;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipInputStream;

/**
 * Created by tyriv on 2016/3/9.
 */
public class WorkflowServiceImpl implements WorkflowService {

    public static final String OUT_GOING_NAME_KEY = "outGoingName";
    public static final String DEFAULT_OUT_GOING_NAME = "完成任务";

    private RepositoryService repositoryService;
    private RuntimeService runtimeService;
    private TaskService taskService;

    @Override
    public Deployment deployProcess(File file) {

        try {
            // 通过服务，获取部署配置对象
            DeploymentBuilder builder = repositoryService.createDeployment();

            // 获取Zip文件流
            InputStream inputStream = new FileInputStream(file);

            // 做配置
            ZipInputStream zipInputStream = new ZipInputStream(inputStream);
            builder.addZipInputStream(zipInputStream);

            // 完成发布
            return builder.deploy();

        } catch (FileNotFoundException e) {
            throw new RuntimeException("部署流程失败！");
        }
    }

    @Override
    public List<ProcessDefinition> listProcessDefinition() {
        return repositoryService.createProcessDefinitionQuery()
                .orderByProcessDefinitionKey().desc()
                .orderByProcessDefinitionVersion().desc()
                .list();
    }

    @Override
    public void startProcess(String processDefinitionKey, String businessKey, Map<String, Object> map) {
        runtimeService.startProcessInstanceByKey(processDefinitionKey, businessKey, map);
    }

    @Override
    public ProcessInstance listProcessInstanceByBusinessKey(String businessKey) {
        return runtimeService
                .createProcessInstanceQuery()
                .processInstanceBusinessKey(businessKey)
                .singleResult();
    }

    @Override
    public List<Task> listPersonalTask(String assignee) {
        return taskService
                .createTaskQuery()
                .taskAssignee(assignee)
                .orderByTaskCreateTime().desc()
                .list();
    }

    @Override
    public void completeTask(String taskId, Map<String, Object> map) {
        taskService.complete(taskId, map);
    }

    @Override
    public void completeTask(String taskId, String outGoingName) {
        Map<String, Object> map = new HashMap<>();
        map.put(OUT_GOING_NAME_KEY, outGoingName);
        completeTask(taskId, map);
    }

    @Override
    public void completeTask(String taskId, String outGoingName, Map<String, Object> map) {
        map.put(OUT_GOING_NAME_KEY, outGoingName);
        completeTask(taskId, map);
    }

    @Override
    public void deleteProcess(String deploymentId) {
        repositoryService.deleteDeployment(deploymentId, false);
    }

    @Override
    public List<String> listOutGoingName(String taskId) {

        List<String> list = new ArrayList<>();
        ActivityImpl activity = getActivityImplByTaskId(taskId);

        // 获取出口对象列表
        List<PvmTransition> outgoingTransitions = activity.getOutgoingTransitions();

        // 遍历对象，获取name
        for (PvmTransition pvmTransition : outgoingTransitions) {
            String name = (String) pvmTransition.getProperty("name");
            if (StringUtil.isBlank(name)) {
                list.add(name);
            }
        }
        if (list.isEmpty()) {
            list.add(DEFAULT_OUT_GOING_NAME);
        }

        return list;
    }

    private ActivityImpl getActivityImplByTaskId(String taskId) {

        Task task = getTaskById(taskId);
        ProcessInstance processInstance
                = getProcessInstanceById(task.getProcessDefinitionId());
        String activityId = processInstance.getActivityId();
        ProcessDefinitionEntity processDefinition
                = (ProcessDefinitionEntity) repositoryService
                .getProcessDefinition(processInstance.getProcessDefinitionId());
        return processDefinition.findActivity(activityId);
    }

    private ProcessInstance getProcessInstanceById(String processDefinitionId) {
        return runtimeService.createProcessInstanceQuery()
                .processInstanceId(processDefinitionId)
                .list()
                .get(0);
    }

    private Task getTaskById(String taskId) {
        return taskService.createTaskQuery().taskId(taskId).list().get(0);
    }

    public void setRepositoryService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    public void setRuntimeService(RuntimeService runtimeService) {
        this.runtimeService = runtimeService;
    }

    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }
}
