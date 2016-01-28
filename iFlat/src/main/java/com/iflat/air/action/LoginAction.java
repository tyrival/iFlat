package com.iflat.air.action;

import com.iflat.system.action.ResultAware;
import com.iflat.system.bean.User;
import com.iflat.system.entity.Result;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserManager;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

/**
 * Created by tyriv on 2016/1/28.
 */
public class LoginAction extends ActionSupport implements ResultAware, ModelDriven<User> {

    private Result result;

    private User user;
    private UserManager userManager;

    public String login() throws Exception {

        this.result.setSuccess(false);
        if(userManager.loginCheck(this.user)) {

            UserInfoVo userInfoVo = this.userManager.getUserInfoByAccount(this.user.getAccount());

            if(userInfoVo != null) {

                result.setSuccess(true);
                result.setToken("测试Token");
                Session.putUserInfo(userInfoVo);
                Application.addOnline(userInfoVo);

            } else {
                this.result.setMessage("用户不存在可用的角色，或所在组织无效，请联系管理员。");
            }

        } else {
            this.result.setMessage("用户名或密码错误。");
        }

        return SUCCESS;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    @Override
    public User getModel() {
        if (user == null) {
            user = new User();
        }
        return user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserManager getUserManager() {
        return userManager;
    }

    public void setUserManager(UserManager userManager) {
        this.userManager = userManager;
    }
}
