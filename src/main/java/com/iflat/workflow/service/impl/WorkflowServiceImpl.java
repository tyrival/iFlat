package com.iflat.workflow.service.impl;

import com.iflat.util.*;
import com.iflat.workflow.service.WorkflowService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.impl.identity.Authentication;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.DeploymentBuilder;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.*;
import java.util.zip.ZipInputStream;

/**
 * Created by tyriv on 2016/3/9.
 */
public class WorkflowServiceImpl implements WorkflowService {

    public static final String OUTGOING_NAME_KEY = "outGoingName";
    public static final String OUTGOING_NAME_DEFAULT = "pass";
    public static final String OUTGOING_NAME_PASS = "pass";
    public static final String OUTGOING_NAME_REJECT = "reject";
    public static final String PROCESS_IMAGE_TEMPPATH = "resources/workflow/temp/";

    private RepositoryService repositoryService;
    private RuntimeService runtimeService;
    private TaskService taskService;
    private HistoryService historyService;

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
        runtimeService.startProcessInstanceByKey(
                processDefinitionKey, businessKey, map);
    }

    @Override
    public ProcessInstance getProcessInstanceByBusinessKey(String businessKey) {
        return runtimeService
                .createProcessInstanceQuery()
                .processInstanceBusinessKey(businessKey)
                .singleResult();
    }

    @Override
    public List<Task> listPersonalTask(String assignee) {
        return taskService.createTaskQuery()
                .taskCandidateOrAssigned(assignee)
                .orderByTaskCreateTime().desc()
                .list();
    }

    @Override
    public void completeTask(String taskId) {
        taskService.complete(taskId);
    }

    @Override
    public void completeTask(String taskId, Map<String, Object> map) {
        taskService.complete(taskId, map);
    }

    @Override
    public void completeTask(String taskId, String outGoingName) throws Exception {
        this.completeTask(taskId, outGoingName, null, null);
    }

    @Override
    public void completeTask(String taskId, String outGoingName, String comment) throws Exception {
        this.completeTask(taskId, outGoingName, comment, null);
    }

    @Override
    public void completeTask(String taskId, String outGoingName, String comment, Map<String, Object> map) throws Exception {

        // 封装流程变量
        if (map == null) {
            map = new HashMap<>();
        }
        // 将outGodinName放入流程变量
        if (outGoingName != null) {
            map.put(OUTGOING_NAME_KEY, outGoingName);
        }
        // 添加批注
        if (comment != null) {
            String userName = Session.getUserInfo().getUserName();
            Authentication.setAuthenticatedUserId(userName);
            Task task = getTaskById(taskId);
            String processInstanceId = task.getProcessInstanceId();
            taskService.addComment(taskId, processInstanceId, comment);
        }
        // 完成任务
        completeTask(taskId, map);
    }

    @Override
    public void completeTaskByBusinessKey(String businessKey) {

        String taskId = taskService.createTaskQuery()
                .processInstanceBusinessKey(businessKey)
                .singleResult()
                .getId();

        completeTask(taskId);
    }

    @Override
    public void completeTaskByBusinessKey(String businessKey, Map<String, Object> map) throws Exception {
        String taskId = taskService.createTaskQuery()
                .processInstanceBusinessKey(businessKey)
                .singleResult()
                .getId();

        completeTask(taskId, map);
    }

    @Override
    public void completeTaskByBusinessKey(String businessKey, String outGoingName) throws Exception {
        completeTaskByBusinessKey(businessKey, outGoingName, null, null);
    }

    @Override
    public void completeTaskByBusinessKey(String businessKey, String outGoingName, String comment) throws Exception {
        completeTaskByBusinessKey(businessKey, outGoingName, comment, null);
    }

    @Override
    public void completeTaskByBusinessKey(String businessKey, String outGoingName, String comment, Map<String, Object> map) throws Exception {

        String taskId = taskService.createTaskQuery()
                .processInstanceBusinessKey(businessKey)
                .singleResult()
                .getId();

        completeTask(taskId, outGoingName, comment, map);
    }

    @Override
    public void deleteProcess(String deploymentId) {
        // 正式发布时改为false
        repositoryService.deleteDeployment(deploymentId, true);
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
            list.add(OUTGOING_NAME_DEFAULT);
        }

        return list;
    }

    /**
     * 通过taskId获取流程定义信息
     * @param taskId
     * @return
     */
    @Override
    public ProcessDefinition getProcessDefinitionByTaskId(String taskId) {
        // 通过taskId获取task对象
        Task task = getTaskById(taskId);
        // 通过task对象获取流程定义id
        String processDefinitionId = task.getProcessDefinitionId();
        // 通过流程定义id获取流程对象
        return getProcessDefinitionById(processDefinitionId);
    }

    /**
     * 返回流程资源流
     * @param deploymentId
     * @param resourceName
     * @return
     */
    @Override
    public InputStream getResourceAsStream(String deploymentId, String resourceName) {
        return repositoryService.getResourceAsStream(deploymentId, resourceName);
    }

    @Override
    public Map getImageByTaskId(String taskId) throws Exception {


        // 创建一个临时文件，用于储存流程定义图
        String filePath = Application.getWebRootPath() + PROCESS_IMAGE_TEMPPATH;
        File file = new File(filePath);
        if (!file.exists()) {
            file.mkdirs();
        }
        String fileName = UUID.randomUUID().toString() + ".png";

        // 获取流程定义图
        ProcessDefinition pd = getProcessDefinitionByTaskId(taskId);
        String deploymentId = pd.getDeploymentId();
        String resourceName = pd.getDiagramResourceName();
/*        String deploymentId = "9";
        String resourceName = "SbSettlement.Sm.SbSettlement.png";*/

        // 将流程定义图转为流
        InputStream inputStream = getResourceAsStream(deploymentId, resourceName);
        File output = FileUtil.inputStreamToFile(inputStream, filePath + fileName);
        inputStream.close();

        // 获取当前结点对应的Activity的x,y,width,height
        Map<String, Object> map = getActivityCoodinate(taskId);
        map.put("path", PROCESS_IMAGE_TEMPPATH + fileName);

        // 获取流程图的大小，并于Activity的map合并
        Map<String, Object> image = new HashMap<>();
        image = getImageInfo(output);
        map.putAll(image);

        return map;
    }

    @Override
    public void deleteProcessInstanceByProcessInstanceId(String processInstanceId) throws Exception {
        deleteProcessInstanceByProcessInstanceId(processInstanceId, "");
    }

    @Override
    public void deleteProcessInstanceByProcessInstanceId(String processInstanceId, String reason) throws Exception {
        this.runtimeService.deleteProcessInstance(processInstanceId, reason);
    }

    @Override
    public void deleteProcessInstanceByBusinessKey(String businessKey) throws Exception {
        this.deleteProcessInstanceByBusinessKey(businessKey, "");
    }

    @Override
    public void deleteProcessInstanceByBusinessKey(String businessKey, String reason) throws Exception {
        ProcessInstance processInstance
                = this.getProcessInstanceByBusinessKey(businessKey);
        this.deleteProcessInstanceByProcessInstanceId(
                processInstance.getProcessInstanceId(), reason);
    }

    @Override
    public List<Comment> listTaskComments(String taskId) {
        return taskService.getTaskComments(taskId);
    }

    @Override
    public List<Comment> listProcessInstanceComments(String processInstanceId) {
        return taskService.getProcessInstanceComments(processInstanceId);
    }

    @Override
    public List<Comment> listProcessInstanceCommentsByTaskId(String taskId) {
        List<Comment> list = new ArrayList<>();
        Task task = getTaskById(taskId);
        String processInstanceId = task.getProcessInstanceId();
        List<HistoricTaskInstance> historicTaskInstances
                = historyService.createHistoricTaskInstanceQuery()
                .processInstanceId(processInstanceId)
                .orderByHistoricTaskInstanceEndTime().desc()
                .list();
        for (HistoricTaskInstance historicTaskInstance : historicTaskInstances) {
            list.addAll(taskService.getTaskComments(historicTaskInstance.getId()));
        }
        return list;
    }

    @Override
    public List<Comment> listProcessInstanceCommentsByBusinessKey(String businessKey) throws Exception {
        String processInstanceId
                = getProcessInstanceByBusinessKey(businessKey)
                .getProcessInstanceId();
        return listProcessInstanceComments(processInstanceId);
    }

    /**
     * 获取当前活动节点的坐标集合
     * x,y,width,height放入一个map中
     */
    private Map<String, Object> getActivityCoodinate(String taskId) {
        /**
         * 获取活动节点id
         */
        Task task = getTaskById(taskId);
        ProcessInstance processInstance = getProcessInstanceById(task.getProcessInstanceId());
        String activityId = processInstance.getActivityId();

        // 获取流程定义，此处通过repositoryService获取存放在内存中的流程定义信息
        ProcessDefinitionEntity pde
                = (ProcessDefinitionEntity) repositoryService.getProcessDefinition(task.getProcessDefinitionId());
        // 获取流程定义中对应的活动节点
        ActivityImpl activity = pde.findActivity(activityId);

        Map<String, Object> map = new HashMap<>();
        map.put("x", activity.getX());
        map.put("y", activity.getY());
        map.put("width", activity.getWidth());
        map.put("height", activity.getHeight());

        return map;
    }

    private Map<String, Object> getImageInfo(File file) throws Exception {
        FileInputStream fileInputStream = new FileInputStream(file);
        BufferedImage buff = ImageIO.read(fileInputStream);
        Map<String, Object> map = new HashMap<>();
        map.put("imageWidth", buff.getWidth());
        map.put("imageHeight", buff.getHeight());
        fileInputStream.close();
        return map;
    }

    private ProcessDefinition getProcessDefinitionById(String processDefinitionId) {
        return repositoryService.createProcessDefinitionQuery()
                .processDefinitionId(processDefinitionId)
                .singleResult();
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
                .singleResult();
    }

    private Task getTaskById(String taskId) {
        return taskService.createTaskQuery().taskId(taskId).singleResult();
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

    public void setHistoryService(HistoryService historyService) {
        this.historyService = historyService;
    }
}
