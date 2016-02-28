package com.iflat.system.bean;

/**
 * Created by tyriv on 2015/9/20.
 */
public class AuthModule {
    //id
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

    public boolean getAmStatus() {
        return amStatus;
    }

    public void setAmStatus(boolean amStatus) {
        this.amStatus = amStatus;
    }
}
