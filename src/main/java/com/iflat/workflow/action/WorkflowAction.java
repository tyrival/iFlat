package com.iflat.workflow.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.util.Session;
import com.iflat.workflow.entity.ProcessDefinitionVo;
import com.iflat.workflow.entity.TaskVo;
import com.iflat.workflow.service.WorkflowService;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskInfo;

import java.io.File;
import java.util.List;

public class WorkflowAction extends BaseAction {

    private File upload;
    private String uploadFileName;
    private String filePath;

    private WorkflowService workflowService;

    private String deploymentId;

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
            List<TaskVo> list = TaskVo.fromTaskList(workflowService.listPersonalTask(assignee));
            this.result.setList(list);
        } catch (Exception e) {
            throw new NullPointerException("在Session中查找用户信息失败。");
        }
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
}
