package com.iflat.system.entity;

import com.iflat.system.bean.User;

import java.util.*;

/**
 * Created by tyriv on 2015/10/7.
 */
public class UserRoleNode {

    //id
    private String id;
    //文本
    private String text;
    //名
    private String name;
    //父节点id
    private String parentId;
    //是否展开
    private boolean expanded;
    //是否为叶子节点
    private boolean leaf;

    public UserRoleNode() {
        this.expanded = false;
        this.leaf = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        this.text = name;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
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