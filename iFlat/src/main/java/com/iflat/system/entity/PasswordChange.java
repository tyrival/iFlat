package com.iflat.system.entity;

/**
 * Created by tyriv on 2015/11/8.
 */
public class PasswordChange {

    private String account;
    private String old;
    private String password;
    private String varify;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getOld() {
        return old;
    }

    public void setOld(String old) {
        this.old = old;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getVarify() {
        return varify;
    }

    public void setVarify(String varify) {
        this.varify = varify;
    }
}
