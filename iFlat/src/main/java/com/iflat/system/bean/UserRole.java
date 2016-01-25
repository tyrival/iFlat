package com.iflat.system.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/8/28.
 */
public class UserRole {

    //帐号
    private String account;
    //排序
    private int sequence;
    //角色id
    private String roleId;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }
}
