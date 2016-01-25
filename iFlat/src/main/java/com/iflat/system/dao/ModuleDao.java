package com.iflat.system.dao;

import com.iflat.system.bean.Module;
import com.iflat.system.entity.UserInfoVo;

import java.util.List;

/**
 * Created by tyriv on 2015/8/31.
 */
public interface ModuleDao {

    public Module insert(Module module) throws Exception;

    public Module update(Module module) throws Exception;

    public int delete(String nodeId) throws Exception;

    public Module get(String nodeId) throws Exception;

    public List<Module> list() throws Exception;

    public List<Module> listNavigationByUser(UserInfoVo userInfoVo) throws Exception;

    public List<Module> listChildren(String nodeId) throws Exception;
}
