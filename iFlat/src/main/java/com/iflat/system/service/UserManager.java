package com.iflat.system.service;

import com.iflat.system.bean.User;
import com.iflat.system.entity.PasswordChange;
import com.iflat.system.entity.UserInfoVo;

import java.util.List;

/**
 * Created by tyriv on 2015/8/18.
 */
public interface UserManager {

    public boolean loginCheck(User user) throws Exception;

    public User save(User user) throws Exception;

    public User saveProfile(User user) throws Exception;

    public UserInfoVo getUserInfoByAccount(String account) throws Exception;

    public String deleteByAccount(String account) throws Exception;

    public List<User> listByOrgId(String orgId) throws Exception;

    public UserInfoVo switchRole(String roleId) throws Exception;

    public boolean changePassword(PasswordChange password) throws Exception;

    public User getProfile() throws Exception;
}
