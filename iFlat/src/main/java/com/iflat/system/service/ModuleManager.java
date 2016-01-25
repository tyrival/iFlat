package com.iflat.system.service;

import com.iflat.system.bean.Module;
import com.iflat.system.bean.UserRole;
import com.iflat.system.entity.ModuleNode;
import com.iflat.system.entity.NavigationNode;

import java.util.List;

/**
 * Created by tyriv on 2015/8/31.
 */
public interface ModuleManager {

    public String delete(String nodeId) throws Exception;

    public List<Module> list() throws Exception;

    public NavigationNode getNavigationTree() throws Exception;

    public List<ModuleNode> listNode() throws Exception;

    public Module save(Module module) throws Exception;


}
