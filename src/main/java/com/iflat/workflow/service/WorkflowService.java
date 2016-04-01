package com.iflat.workflow.service;

import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;

import java.io.File;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2016/3/9.
 */
public interface WorkflowService {

    /* 流程定义 */
    /**
     * 发布流程
     * @param file
     * @return
     */
    Deployment deployProcess(File file);

    /**
     * 获取流程定义清单
     * @return
     */
    List<ProcessDefinition> listProcessDefinition();

    /**
     * 删除流程定义
     * @param deploymentId
     */
    void deleteProcess(String deploymentId);

    /**
     * 启动流程
     * @param processDefinitionKey
     * @param buisinessKey
     * @param map
     */
    void startProcess(String processDefinitionKey, String buisinessKey, Map<String, Object> map);

    /* 流程实例 */
    /**
     * 通过BusinessKey查找流程实例
     * @param businessKey
     * @return
     */
    ProcessInstance getProcessInstanceByBusinessKey(String businessKey);

    /**
     * 获取用户任务清单
     * @param assignee
     * @return
     */
    List<Task> listPersonalTask(String assignee);

    /**
     * 完成任务
     */
    void completeTask(String taskId);
    void completeTask(String taskId, Map<String, Object> map);
    void completeTask(String taskId, String outGoingName) throws Exception;
    void completeTask(String taskId, String outGoingName, String comment) throws Exception;
    void completeTask(String taskId, String outGoingName, String comment, Map<String, Object> map) throws Exception;

    /**
     * 根据businessKey完成task
     */
    void completeTaskByBusinessKey(String businessKey) throws Exception;
    void completeTaskByBusinessKey(String businessKey, Map<String, Object> map) throws Exception;
    void completeTaskByBusinessKey(String businessKey, String outGoingName) throws Exception;
    void completeTaskByBusinessKey(String businessKey, String outGoingName, String comment) throws Exception;
    void completeTaskByBusinessKey(String businessKey, String outGoingName, String comment, Map<String, Object> map) throws Exception;

    /**
     * 获取Task的出口名称集合
     * @param task
     * @return
     */
    List<String> listOutGoingName(String task);

    /**
     * 根据TaskId获取流程定义
     * @param taskId
     * @return
     */
    ProcessDefinition getProcessDefinitionByTaskId(String taskId);

    /**
     * 获取流程定义资源
     * @param deploymentId
     * @param resourceName
     * @return
     */
    InputStream getResourceAsStream(String deploymentId, String resourceName);

    /**
     * 根据TaskId获取流程图
     * @param taskId
     * @return
     * @throws Exception
     */
    Map getImageByTaskId(String taskId) throws Exception;

    /**
     * 根据ProcessInstanceId删除流程实例
     * @param processInstanceId
     * @throws Exception
     */
    void deleteProcessInstanceByProcessInstanceId(String processInstanceId) throws Exception;
    void deleteProcessInstanceByProcessInstanceId(String processInstanceId, String reason) throws Exception;

    /**
     * 根据businessKey删除流程实例
     * @param businessKey
     * @throws Exception
     */
    void deleteProcessInstanceByBusinessKey(String businessKey) throws Exception;
    void deleteProcessInstanceByBusinessKey(String businessKey, String reason) throws Exception;

    /**
     * 根据taskId或processInstanceId获取批注列表
     */
    List<Comment> listTaskComments(String taskId);
    List<Comment> listProcessInstanceComments(String processInstanceId);
    List<Comment> listProcessInstanceCommentsByTaskId(String taskId);

}
