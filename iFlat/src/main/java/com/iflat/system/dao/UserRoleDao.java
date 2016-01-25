package com.iflat.system.dao;

import com.iflat.system.bean.UserRole;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.entity.UserRoleVo;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public interface UserRoleDao {

    public int insertBatch(List<UserRole> list) throws Exception;

    public int update(UserRole userRole) throws Exception;

    public int deleteByAccount(String account) throws Exception;

    public int deleteByRoleId(String roleId) throws Exception;

    public List<UserRole> listByRoleId(String roleId) throws Exception;

    public List<UserRole> listByAccount(String account) throws Exception;

    public UserRole getByUR(UserRole userRole) throws Exception;

    public List<UserRoleVo> listVoByUser(UserInfoVo userInfoVo) throws Exception;

    public List<UserRoleVo> listVo() throws Exception;
}
