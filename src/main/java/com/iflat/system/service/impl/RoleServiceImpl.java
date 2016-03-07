package com.iflat.system.service.impl;

import com.iflat.system.bean.Role;
import com.iflat.system.dao.RoleDao;
import com.iflat.system.dao.UserRoleDao;
import com.iflat.system.service.RoleService;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/8/28.
 */
public class RoleServiceImpl implements RoleService {

    private RoleDao roleDao;
    private UserRoleDao userRoleDao;
    
    @Override
    public Role save(Role role) throws Exception {
        if(role.getRoleId() != null && !"".equals(role.getRoleId())) {
            role = this.roleDao.update(role);
        } else {
            role.setRoleId(UUID.randomUUID().toString());
            role.setCreateTime(new Date());
            role = this.roleDao.insert(role);
        }
        return role;
    }
    @Override
    public String delete(String roleId) throws Exception {
        int i = 0;
        /**
         * 有用户的角色不许删除
         */
        if(this.userRoleDao.listByRoleId(roleId).size() == 0) {
            i = this.roleDao.delete(roleId);
        } else {
            throw new Exception("因该角色已被分配给至少一个用户，所以无法删除。");
        }
        return i == 1 ? roleId : null;
    }

    @Override
    public Role get(String roleId) throws Exception {

        return this.roleDao.get(roleId);
    }

    @Override
    public List<Role> list() throws Exception {

        return this.roleDao.list();
    }

    public RoleDao getRoleDao() {
        return roleDao;
    }

    public void setRoleDao(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    public UserRoleDao getUserRoleDao() {
        return userRoleDao;
    }

    public void setUserRoleDao(UserRoleDao userRoleDao) {
        this.userRoleDao = userRoleDao;
    }
}
