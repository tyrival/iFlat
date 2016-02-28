package com.iflat.system.bean;

/**
 * Created by tyriv on 2015/9/20.
 */
public class AuthOperating {
    //id
    private String aoId;
    //roleId
    private String roleId;
    //帐号
    private String account;
    //模块
    private String nameSpace;
    //功能
    private String moduleName;
    //操作id
    private String operating;
    //状态
    private boolean status;

    public String getAoId() {
        return aoId;
    }

    public void setAoId(String aoId) {
        this.aoId = aoId;
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

    public String getOperating() {
        return operating;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setOperating(String operating) {
        this.operating = operating;
    }
}
