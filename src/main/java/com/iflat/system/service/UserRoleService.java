package com.iflat.system.service;

import com.iflat.system.bean.UserRole;
import com.iflat.system.entity.UserRoleNode;
import com.iflat.system.entity.UserRoleVo;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public interface UserRoleService {

    public String saveUserRole(UserRole userRole, String itemselector) throws Exception;

    public List<UserRole> saveUserRoleBatch(List<UserRole> list) throws Exception;

    public boolean saveDefaultRole(UserRole userRole) throws Exception;

    public String deleteByRoleId(String roleId) throws Exception;

    public String deleteByAccount(String account) throws Exception;

    public String listAsString(UserRole userRole) throws Exception;

    public List<UserRoleVo> listVo() throws Exception;

    public List<UserRoleVo> listVoByUser() throws Exception;

    public List<UserRoleVo> listVoByAccount() throws Exception;

    public List<UserRoleVo> listVoByAccount(String account) throws Exception;

    public List<UserRoleNode> listNode() throws Exception;
}
