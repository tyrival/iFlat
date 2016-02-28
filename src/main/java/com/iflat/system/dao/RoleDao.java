package com.iflat.system.dao;

import com.iflat.system.bean.Role;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public interface RoleDao {

    public Role insert(Role role) throws Exception;

    public Role update(Role role) throws Exception;

    public int delete(String roleId) throws Exception;

    public Role get(String roleId) throws Exception;

    public List<Role> list() throws Exception;
}
