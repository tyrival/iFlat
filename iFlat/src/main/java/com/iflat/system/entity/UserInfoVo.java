package com.iflat.system.entity;

import java.util.Date;

/**
 * Created by tyriv on 2015/10/20.
 */
public class UserInfoVo {

    private String account;  //帐号
    private String userName;  //姓名
    private String title; //职位
    private String roleId;  //角色ID
    private String roleName;  //角色名
    private String orgId;  //部门ID
    private String orgCode;  //部门代码
    private String orgName;  //部门名称
    private String porgId;  //上级部门ID
    private String porgCode;  //上级部门代码
    private String porgName;  //上级部门名称
    private int sequence;  //排序
    private Date loginTime;  //登录时间

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

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

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getPorgId() {
        return porgId;
    }

    public void setPorgId(String porgId) {
        this.porgId = porgId;
    }

    public String getPorgCode() {
        return porgCode;
    }

    public void setPorgCode(String porgCode) {
        this.porgCode = porgCode;
    }

    public String getPorgName() {
        return porgName;
    }

    public void setPorgName(String porgName) {
        this.porgName = porgName;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }
}
