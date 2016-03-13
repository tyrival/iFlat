package com.iflat.workflow.entity;

import org.activiti.engine.repository.ProcessDefinition;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tyriv on 2016/3/9.
 */
public class ProcessDefinitionVo {

    private String id;
    private String Category;
    private String name;
    private String key;
    private String description;
    private int version;
    private String resourceName;
    private String deploymentId;
    private String diagramResourceName;
    private boolean hasStartFormKey;
    private boolean isGraphicalNotationDefined;
    private boolean suspended;
    private String tenantId;

    public static ProcessDefinitionVo fromProcessDefinition(ProcessDefinition processDefinition) {

        ProcessDefinitionVo processDef = new ProcessDefinitionVo();
        processDef.setId(processDefinition.getId());
        processDef.setCategory(processDefinition.getCategory());
        processDef.setName(processDefinition.getName());
        processDef.setKey(processDefinition.getKey());
        processDef.setDescription(processDefinition.getDescription());
        processDef.setVersion(processDefinition.getVersion());
        processDef.setResourceName(processDefinition.getResourceName());
        processDef.setDeploymentId(processDefinition.getDeploymentId());
        processDef.setDiagramResourceName(processDefinition.getDiagramResourceName());
        processDef.setHasStartFormKey(processDefinition.hasStartFormKey());
        processDef.setGraphicalNotationDefined(processDefinition.hasGraphicalNotation());
        processDef.setSuspended(processDefinition.isSuspended());
        processDef.setTenantId(processDefinition.getTenantId());
        return processDef;
    }

    public static List<ProcessDefinitionVo> fromProcessDefinitionList(List<ProcessDefinition> list) {

        List<ProcessDefinitionVo> processDefinitionVoList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            processDefinitionVoList.add(fromProcessDefinition(list.get(i)));
        }
        return processDefinitionVoList;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getDeploymentId() {
        return deploymentId;
    }

    public void setDeploymentId(String deploymentId) {
        this.deploymentId = deploymentId;
    }

    public String getDiagramResourceName() {
        return diagramResourceName;
    }

    public void setDiagramResourceName(String diagramResourceName) {
        this.diagramResourceName = diagramResourceName;
    }

    public boolean isHasStartFormKey() {
        return hasStartFormKey;
    }

    public void setHasStartFormKey(boolean hasStartFormKey) {
        this.hasStartFormKey = hasStartFormKey;
    }

    public boolean isGraphicalNotationDefined() {
        return isGraphicalNotationDefined;
    }

    public void setGraphicalNotationDefined(boolean graphicalNotationDefined) {
        isGraphicalNotationDefined = graphicalNotationDefined;
    }

    public boolean isSuspended() {
        return suspended;
    }

    public void setSuspended(boolean suspended) {
        this.suspended = suspended;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }


}
