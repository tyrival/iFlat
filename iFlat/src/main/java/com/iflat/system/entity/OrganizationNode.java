package com.iflat.system.entity;

import com.iflat.system.bean.Organization;

import java.util.*;

/**
 * Created by tyriv on 2015/9/18.
 */
public class OrganizationNode {
    //id
    private String orgId;
    //组织代码
    private String orgCode;
    //上级组织代码
    private String parentOrgId;
    //组织名称
    private String orgName;
    //组织别名
    private String alias;
    //1-启用 0-禁用
    private boolean status;

    //节点属性
    private String id;
    private String parentId;
    private String text;
    private boolean expanded;
    private boolean leaf;

    public OrganizationNode() {
        this.expanded = false;
        this.leaf = true;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
        this.id = orgId;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getParentOrgId() {
        return parentOrgId;
    }

    public void setParentOrgId(String parentOrgId) {
        this.parentOrgId = parentOrgId;
        this.parentId = parentOrgId;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
        this.text = orgName;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
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