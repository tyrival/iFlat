package com.iflat.system.bean;

import java.util.*;

/**
 * Created by tyriv on 2015/8/29.
 */
public class Module {

    //id
    private String nodeId;
    //名称
    private String nodeName;
    //模块名
    private String moduleName;
    //父节点id
    private String parentNodeId;
    //图表
    private String aweIcon;
    //排序
    private String sequence;
    //模块名
    private String nameSpace;
    //ExtJS视图名
    private String viewName;
    //ExtJS控制器
    private String controller;
    //url
    private String url;
    //状态 1-启用 2-禁用
    private boolean status;
    //创建时间
    private Date createTime;

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getParentNodeId() {
        return parentNodeId;
    }

    public void setParentNodeId(String parentNodeId) {
        this.parentNodeId = parentNodeId;
    }

    public String getAweIcon() {
        return aweIcon;
    }

    public void setAweIcon(String aweIcon) {
        this.aweIcon = aweIcon;
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getController() {
        return controller;
    }

    public void setController(String controller) {
        this.controller = controller;
    }

    public String getNameSpace() {
        return nameSpace;
    }

    public void setNameSpace(String nameSpace) {
        this.nameSpace = nameSpace;
    }
}
