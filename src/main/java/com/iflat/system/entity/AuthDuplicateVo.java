package com.iflat.system.entity;

/**
 * Created by tyriv on 2015/10/21.
 */
public class AuthDuplicateVo {

    private String fromRoleId;
    private String fromAccount;
    private String toRoleId;
    private String toAccount;
    private String nameSpace;
    private String moduleName;
    private boolean dupAll;

    public boolean getDupAll() {
        return dupAll;
    }

    public void setDupAll(boolean dupAll) {
        this.dupAll = dupAll;
    }

    public String getFromRoleId() {
        return fromRoleId;
    }

    public void setFromRoleId(String fromRoleId) {
        this.fromRoleId = fromRoleId;
    }

    public String getFromAccount() {
        return fromAccount;
    }

    public void setFromAccount(String fromAccount) {
        this.fromAccount = fromAccount;
    }

    public String getToRoleId() {
        return toRoleId;
    }

    public void setToRoleId(String toRoleId) {
        this.toRoleId = toRoleId;
    }

    public String getToAccount() {
        return toAccount;
    }

    public void setToAccount(String toAccount) {
        this.toAccount = toAccount;
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
}
