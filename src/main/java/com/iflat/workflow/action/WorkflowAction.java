package com.iflat.workflow.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.util.FileUtil;
import com.iflat.util.Session;
import com.iflat.workflow.entity.ProcessDefinitionVo;
import com.iflat.workflow.entity.TaskVo;
import com.iflat.workflow.service.WorkflowService;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskInfo;

import java.io.File;
import java.io.InputStream;
import java.util.List;

public class WorkflowAction extends BaseAction {

    private WorkflowService workflowService;

    // 发布流程上传文件
    private File upload;
    private String uploadFileName;
    private String filePath;

    private InputStream inputStream;  // 流程图资源
    private String deploymentId;  // 流程发布id
    private String taskId;  // 任务id
    private String resourceName;  // 资源名
    private String imagePath;  // 资源储存的图片路径
    private String outGoingName;  // 审批结论
    private String comment;  // 批注

    private String processInstanceId;

    public String getBusinessObjByProcessInstanceId() throws Exception {
        this.result.setObject(this.workflowService.getBusinessObjByProcessInstanceId(processInstanceId));
        return SUCCESS;
    }
    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    /* 流程定义 */
    public String listProcessDefinition() {
        List<ProcessDefinition> list = workflowService.listProcessDefinition();
        this.result.setList(ProcessDefinitionVo.fromProcessDefinitionList(list));
        return SUCCESS;
    }

    public String deleteProcessDefinition() {
        workflowService.deleteProcess(this.deploymentId);
        return SUCCESS;
    }

    public String uploadProcessDefinition() {
        this.result.setObject(workflowService.deployProcess(upload));
        return SUCCESS;
    }

    /* 任务相关 */
    public String listTask() {

        try {
            String assignee = Session.getUserInfo().getAccount();
            List<TaskVo> list = TaskVo.fromTaskList(
                    workflowService.listPersonalTask(assignee));
            this.result.setList(list);
        } catch (Exception e) {
            throw new NullPointerException("在Session中查找用户信息失败。");
        }
        return SUCCESS;
    }

    public String completeTask() throws Exception {
        this.workflowService.completeTask(this.taskId, this.outGoingName, this.comment);
        return SUCCESS;
    }

    public String viewImage() throws Exception {
        this.result.setMap(workflowService.getImageByTaskId(taskId));
        return SUCCESS;
    }

    public String deleteImage() throws Exception {
        FileUtil.delete(imagePath);
        return SUCCESS;
    }

    public void setUpload(File upload) {
        this.upload = upload;
    }

    public void setUploadFileName(String uploadFileName) {
        this.uploadFileName = uploadFileName;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    public void setDeploymentId(String deploymentId) {
        this.deploymentId = deploymentId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public File getUpload() {
        return upload;
    }

    public String getUploadFileName() {
        return uploadFileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public WorkflowService getWorkflowService() {
        return workflowService;
    }

    public String getDeploymentId() {
        return deploymentId;
    }

    public String getTaskId() {
        return taskId;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getOutGoingName() {
        return outGoingName;
    }

    public void setOutGoingName(String outGoingName) {
        this.outGoingName = outGoingName;
    }
}
