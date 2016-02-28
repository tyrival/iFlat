package com.iflat.system.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/8/28.
 */
public class Organization {

    private String orgId;  //id

    private String orgCode;  //组织代码

    private String parentOrgId;  //上级组织代码

    private String orgName;  //组织名称

    private String alias;  //组织别名

    private boolean status;  //1-启用 0-禁用

    private Date createTime;  //创建时间

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
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
    }

    public String getName() {
        return orgName;
    }

    public void setName(String orgName) {
        this.orgName = orgName;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
