package com.iflat.workflow.entity;

import org.activiti.engine.task.Task;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by tyriv on 2016/3/11.
 */
public class TaskVo {

    private String id;
    private String name;
    private String assignee;
    private String description;
    private String processDefinitionId;
    private String formKey;
    private Date createTime;

    public static TaskVo fromTask(Task task) {
        TaskVo taskVo = new TaskVo();
        taskVo.setId(task.getId());
        taskVo.setName(task.getName());
        taskVo.setAssignee(task.getAssignee());
        taskVo.setDescription(task.getDescription());
        taskVo.setCreateTime(task.getCreateTime());
        taskVo.setProcessDefinitionId(task.getProcessDefinitionId());
        taskVo.setFormKey(task.getFormKey());
        return taskVo;
    }

    public static List<TaskVo> fromTaskList(List<Task> list) {
        List<TaskVo> voList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            voList.add(fromTask(list.get(i)));
        }
        return voList;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getProcessDefinitionId() {
        return processDefinitionId;
    }

    public void setProcessDefinitionId(String processDefinitionId) {
        this.processDefinitionId = processDefinitionId;
    }

    public String getFormKey() {
        return formKey;
    }

    public void setFormKey(String formKey) {
        this.formKey = formKey;
    }
}
