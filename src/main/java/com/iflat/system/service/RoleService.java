package com.iflat.system.service;

import com.iflat.system.bean.Role;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public interface RoleService {

    public Role save(Role role) throws Exception;

    public String delete(String roleId) throws Exception;

    public Role get(String roleId) throws Exception;

    public List<Role> list() throws Exception;
}
