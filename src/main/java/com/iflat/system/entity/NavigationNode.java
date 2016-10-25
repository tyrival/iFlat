package com.iflat.system.entity;

import java.util.*;

/**
 * Created by tyriv on 2015/8/31.
 */
public class NavigationNode {

    //id
    private String nodeId;
    //名称
    private String text;
    //节点名
    private String nodeName;
    //节点名
    private String moduleName;
    //父节点id
    private String parentNodeId;
    //图表
    private String iconCls;
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
    //是否展开
    private boolean expanded;
    //状态
    private boolean status;
    //子节点
    private List children = new ArrayList();
    //是否为叶子节点
    private boolean leaf;

    private String rowCls;

    public String getRowCls() {
        return rowCls;
    }

    public void setRowCls(String rowCls) {
        this.rowCls = rowCls;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    // 添加子节点
    public void addChild(NavigationNode node) {
        this.children.add(node);
    }

    // 兄弟节点横向排序
    public void sortChildren() {
        if (children.size() != 0) {
            // 对本层节点进行排序（可根据不同的排序属性，传入不同的比较器，这里 传入ID比较器）
            Collections.sort(children, new NodeSequenceComparator());
            // 对每个节点的下一层节点进行排序
            for (Iterator it = children.iterator(); it.hasNext();) {
                ((NavigationNode) it.next()).sortChildren();
            }
        }
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getParentNodeId() {
        return parentNodeId;
    }

    public void setParentNodeId(String parentNodeId) {
        this.parentNodeId = parentNodeId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getIconCls() {
        return iconCls;
    }

    public void setIconCls(String iconCls) {
        this.iconCls = "x-fa fa-" + iconCls;
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

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean getStatus() {
        return status;
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

    public List getChildren() {
        return children;
    }

    public void setChildren(List children) {
        this.children = children;
    }

    public boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public String getController() {
        return controller;
    }

    public void setController(String controller) {
        this.controller = controller;
    }

    public boolean getExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

    public String getNameSpace() {
        return nameSpace;
    }

    public void setNameSpace(String nameSpace) {
        this.nameSpace = nameSpace;
    }
}


/**
 * 节点比较器
 */
class NodeSequenceComparator implements Comparator {
    // 按照节点编号比较
    public int compare(Object o1, Object o2) {
        String s1 = ((NavigationNode)o1).getSequence();
        String s2 = ((NavigationNode)o2).getSequence();
        return s1.compareTo(s2);
    }
}