package com.iflat.system.service.impl;

import com.iflat.system.bean.User;
import com.iflat.system.dao.UserDao;
import com.iflat.system.dao.UserRoleDao;
import com.iflat.system.entity.PasswordChange;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserService;
import com.iflat.util.Application;
import com.iflat.util.Session;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/8/18.
 */
public class UserServiceImpl implements UserService {

    private UserDao userDao;
    private UserRoleDao userRoleDao;

    @Override
    public boolean loginCheck(User sysUser) throws Exception {

        boolean flag = false;
        User user = this.userDao.getActivityUserByAccount(sysUser.getAccount());
        //比较输入的密码和数据库储存的密码
        if(user != null && user.getPassword().equals(sysUser.getPassword())) {
            flag = true;
        }
        return flag;
    }

    @Override
    public String deleteByAccount(String account) throws Exception {
        int i = 0;
        /**
         * 有角色的用户不许删除
         */
        if(this.userRoleDao.listByAccount(account).size() == 0) {
            i = this.userDao.deleteByAccount(account);
        } else {
            throw new Exception("删除用户前，需先删除该用户的所有角色。");
        }
        return i == 1 ? account : null;
    }

    @Override
    public List<User> listByOrgId(String orgId) throws Exception {

        return this.userDao.listByOrgId(orgId);
    }

    @Override
    public UserInfoVo switchRole(String roleId) throws Exception {
        UserInfoVo user = Session.getUserInfo();
        user.setRoleId(roleId);
        List<UserInfoVo> list = this.userDao.listVoByVo(user);
        if(list != null && list.size() > 0) {
            Date loginTime = user.getLoginTime();
            user = list.get(0);
            user.setLoginTime(loginTime);
            Session.putUserInfo(user);
            Application.addOnline(user);
        } else {
            user = null;
        }
        return user;
    }

    @Override
    public boolean changePassword(PasswordChange password) throws Exception {

        if(password.getPassword() == null || "".equals(password.getPassword())) {
            throw new Exception("旧密码不可为空。");
        }
        if(!password.getPassword().equals(password.getVarify()) || password.getPassword() == null || password.getVarify() == null || "".equals(password.getPassword()) || "".equals(password.getVarify())) {
            throw new Exception("两次输入的新密码必须相同，且不为空。");
        }
        UserInfoVo userInfoVo = Session.getUserInfo();
        password.setAccount(userInfoVo.getAccount());
        int result = this.userDao.changePassword(password);
        if(result <= 0) {
            throw new Exception("旧密码输入错误。");
        }
        return true;
    }

    @Override
    public User getProfile() throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        return this.userDao.getByAccount(userInfoVo.getAccount());
    }

    @Override
    public User save(User user) throws Exception {

        if(user.getUserId() != null && !"".equals(user.getUserId())) {
            user = this.userDao.update(user);
        } else {
            user.setUserId(UUID.randomUUID().toString());
            user.setPassword("123");
            user.setCreateTime(new Date());
            user = this.userDao.insert(user);
        }
        return user;
    }

    @Override
    public User saveProfile(User user) throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        user.setAccount(userInfoVo.getAccount());
        user.setStatus(true);
        int i = this.userDao.updateByAccount(user);
        return i > 0 ? user : null;
    }

    @Override
    public UserInfoVo getUserInfoByAccount(String account) throws Exception {
        List<UserInfoVo> list = this.userDao.listActiveUserInfoByAccount(account);
        return list != null && list.size() > 0 ? list.get(0) : null;
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public UserRoleDao getUserRoleDao() {
        return userRoleDao;
    }

    public void setUserRoleDao(UserRoleDao userRoleDao) {
        this.userRoleDao = userRoleDao;
    }
}
