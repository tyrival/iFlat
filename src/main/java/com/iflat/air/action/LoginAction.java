package com.iflat.air.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.system.bean.User;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserService;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ModelDriven;

import java.util.UUID;

/**
 * Created by tyriv on 2016/1/28.
 */
public class LoginAction extends BaseAction implements ModelDriven<User> {

    private User user;
    private UserService userService;

    public String login() throws Exception {

        this.result.setSuccess(false);
        if(userService.loginCheck(this.user)) {

            UserInfoVo userInfoVo = this.userService.getUserInfoByAccount(this.user.getAccount());

            if(userInfoVo != null) {

                String token = UUID.randomUUID().toString();
                result.setSuccess(true);
                result.setObject(userInfoVo);
                result.setToken(token);
                Session.putUserInfo(userInfoVo);
                Application.removeOnlineAir(userInfoVo.getAccount());
                Application.addOnlineAir(token, userInfoVo);

            } else {
                this.result.setMessage("用户不存在可用的角色，或所在组织无效，请联系管理员。");
            }

        } else {
            this.result.setMessage("用户名或密码错误。");
        }
        return SUCCESS;
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

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
