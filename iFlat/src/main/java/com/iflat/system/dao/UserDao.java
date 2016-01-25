package com.iflat.system.dao;

import com.iflat.system.bean.User;
import com.iflat.system.entity.PasswordChange;
import com.iflat.system.entity.UserInfoVo;

import java.util.List;

/**
 * Created by tyriv on 2015/8/18.
 */
public interface UserDao {

    public User insert(User user) throws Exception;

    public User update(User user) throws Exception;

    public int updateByAccount(User user) throws Exception;

    public int changePassword(PasswordChange password) throws Exception;

    public int delete(String userId) throws Exception;

    public int deleteByAccount(String account) throws Exception;

    public User get(String userId) throws Exception;

    public User getByAccount(String account) throws Exception;

    public List<UserInfoVo> listActiveUserInfoByAccount(String account) throws Exception;

    public User getActivityUserByAccount(String account) throws Exception;

    public List<User> list() throws Exception;

    public List<User> listByOrgId(String orgId) throws Exception;

    public List<UserInfoVo> listVoByVo(UserInfoVo user) throws Exception;
}
