package com.iflat.system.entity;

import java.util.*;

/**
 * Created by tyriv on 2015/10/6.
 */
public class ModuleNode {
    //id
    private String nodeId;
    //节点名
    private String nodeName;
    //节点名
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
    //状态
    private boolean status;
    //url
    private String url;

    //节点属性
    private String id;
    private String parentId;
    private String text;
    private boolean expanded;
    private boolean leaf;

    public ModuleNode() {
        this.expanded = false;
        this.leaf = true;
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
        this.text = nodeName;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
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

    public String getNameSpace() {
        return nameSpace;
    }

    public void setNameSpace(String nameSpace) {
        this.nameSpace = nameSpace;
    }

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public String getController() {
        return controller;
    }

    public void setController(String controller) {
        this.controller = controller;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean getExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

    public boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

}