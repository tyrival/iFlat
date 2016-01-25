package com.iflat.system.action.impl;

import com.iflat.system.bean.User;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserManager;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2015/8/18.
 */
public class LoginAction extends ActionSupport {

    //接收注入页面提交的账号密码
    private User user;
    //接收注入userManager对象
    private UserManager userManager;
    //储存登录验证未通过的结果，供页面调用
    private String message;
    /**
     * 单点登录
     * http://localhost:8080/main.action
     * account
     * password
     */
    private String account;
    private String password;

    //登录验证
    public String login() throws Exception {

        String result = INPUT;
        if(this.user.getAccount() == null && this.user.getPassword() == null) {
            this.user.setAccount(this.account);
            this.user.setPassword(this.password);
        }
        if(userManager.loginCheck(this.user)) {
            UserInfoVo userInfoVo = this.userManager.getUserInfoByAccount(this.user.getAccount());
            if(userInfoVo != null) {
                result = SUCCESS;
                Session.putUserInfo(userInfoVo);
                Application.addOnline(userInfoVo);
            } else {
                message = "用户不存在可用的角色，或所在组织无效，请联系管理员。";
            }
        } else {
            message = "用户名或密码错误。";
        }
        return result;
    }

    public UserManager getUserManager() {
        return userManager;
    }

    public void setUserManager(UserManager userManager) {
        this.userManager = userManager;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
