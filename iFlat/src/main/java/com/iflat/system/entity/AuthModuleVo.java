package com.iflat.system.entity;

/**
 * Created by tyriv on 2015/10/8.
 */
public class AuthModuleVo {
    //id
    private String nodeId;
    //节点名
    private String nodeName;
    //父节点id
    private String parentNodeId;
    //图表
    private String aweIcon;
    //排序
    private String sequence;
    //数据库表
    private String tableList;
    //ExtJS视图名
    private String viewName;
    //ExtJS控制器
    private String controller;
    //url
    private String url;
    //状态
    private boolean status;
    //amId
    private String amId;
    //roleId
    private String roleId;
    //帐号
    private String account;
    //模块
    private String nameSpace;
    //功能
    private String moduleName;
    //启用
    private boolean amStatus;
    //是否启用操作权限
    private boolean aoStatus;
    //是否启用数据权限
    private boolean adStatus;

    private String id;
    private String parentId;
    private String text;
    private boolean expanded;
    private boolean leaf;

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

    public String getTableList() {
        return tableList;
    }

    public void setTableList(String tableList) {
        this.tableList = tableList;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getAmId() {
        return amId;
    }

    public void setAmId(String amId) {
        this.amId = amId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getNameSpace() {
        return nameSpace;
    }

    public void setNameSpace(String nameSpace) {
        this.nameSpace = nameSpace;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public boolean getAmStatus() {
        return amStatus;
    }

    public void setAmStatus(boolean amStatus) {
        this.amStatus = amStatus;
    }

    public boolean getAoStatus() {
        return aoStatus;
    }

    public void setAoStatus(boolean aoStatus) {
        this.aoStatus = aoStatus;
    }

    public boolean getAdStatus() {
        return adStatus;
    }

    public void setAdStatus(boolean adStatus) {
        this.adStatus = adStatus;
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
