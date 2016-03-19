package com.iflat.system.service.impl;

import com.iflat.system.bean.Module;
import com.iflat.system.dao.ModuleDao;
import com.iflat.system.entity.ModuleNode;
import com.iflat.system.entity.NavigationNode;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.AuthDataService;
import com.iflat.system.service.AuthModuleService;
import com.iflat.system.service.AuthOperatingService;
import com.iflat.system.service.ModuleService;
import com.iflat.util.ExtTreeUtil;
import com.iflat.util.ListSort;
import com.iflat.util.Session;

import java.util.*;

/**
 * Created by tyriv on 2015/8/31.
 */
public class ModuleServiceImpl implements ModuleService {

    private ModuleDao moduleDao;
    private AuthModuleService authModuleService;
    private AuthOperatingService authOperatingService;
    private AuthDataService authDataService;

    @Override
    public Module save(Module module) throws Exception {

        if(module.getNodeId() != null && !"".equals(module.getNodeId())) {
            module = this.moduleDao.update(module);

            Module old = moduleDao.get(module.getNodeId());

            if (isKeyChanged(old, module)) {
                authModuleService.updateCascadeWithModuleChange(old, module);
                authOperatingService.updateCascadeWithModuleChange(old, module);
                authDataService.updateCascadeWithModuleChange(old, module);
            }

        } else {
            module.setNodeId(UUID.randomUUID().toString());
            module.setCreateTime(new Date());
            module = this.moduleDao.insert(module);
        }
        return module;
    }

    @Override
    public String delete(String nodeId) throws Exception {

        int i = 0;
        if(this.moduleDao.listChildren(nodeId).size() == 0) {
            i = this.moduleDao.delete(nodeId);
        } else {
            throw new Exception("此节点有子节点，禁止删除。");
        }
        return i == 1 ? nodeId : null;
    }

    @Override
    public List<Module> list() throws Exception {

        return this.moduleDao.list();
    }

    @Override
    public NavigationNode getNavigationTree() throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        List<Module> list = new ArrayList<Module>();
        if("admin".equals(userInfoVo.getAccount())) {
            list = this.moduleDao.list();
        } else {
            list = this.moduleDao.listNavigationByUser(userInfoVo);
        }
        return ExtTreeUtil.formatNavigationTree(list);
    }

    @Override
    public List<ModuleNode> listNode() throws Exception {

        List<Module> list = this.moduleDao.list();
        List<ModuleNode> result = new ArrayList<ModuleNode>();
        ModuleNode root = null;
        if(list != null) {
            //将list置入Map<id, node>
            HashMap map = new HashMap();
            for (int i = 0; i < list.size(); i++) {
                ModuleNode node = new ModuleNode();
                node.setNodeId(list.get(i).getNodeId());
                node.setNodeName(list.get(i).getNodeName());
                node.setModuleName(list.get(i).getModuleName());
                node.setParentNodeId(list.get(i).getParentNodeId());
                node.setAweIcon(list.get(i).getAweIcon());
                node.setSequence(list.get(i).getSequence());
                node.setNameSpace(list.get(i).getNameSpace());
                node.setViewName(list.get(i).getViewName());
                node.setController(list.get(i).getController());
                node.setStatus(list.get(i).getStatus());
                node.setUrl(list.get(i).getUrl());
                //node.setExpanded(true);
                map.put(node.getNodeId(), node);
                //获取root节点
                if(node.getParentNodeId() == null) {
                    root = node;
                }
            }
            //遍历map，将所有节点的父节点的leaf属性改为false，并且设置id和parentId
            Set entrySet = map.entrySet();
            for (Iterator it = entrySet.iterator(); it.hasNext();) {
                ModuleNode node = (ModuleNode) ((Map.Entry) it.next()).getValue();
                node.setId(node.getNameSpace() + "@" + node.getModuleName());
                if(node.getParentNodeId() != null) {
                    ModuleNode pnode = (ModuleNode)map.get(node.getParentNodeId());
                    node.setParentId(pnode.getNameSpace() + "@" + pnode.getModuleName());
                    pnode.setLeaf(false);
                }
            }
            //遍历map，将node取出，生成list
            Set out = map.entrySet();
            for (Iterator it = out.iterator(); it.hasNext();) {
                ModuleNode node = (ModuleNode) ((Map.Entry) it.next()).getValue();
                //将除了root外的node都取出
                if(node.getParentNodeId() != null) {
                    //父节点为root的节点的parentNodeId属性置空
                    if(node.getParentNodeId().equals(root.getNodeId())) {
                        node.setParentNodeId(null);
                        node.setParentId(null);
                    }
                    result.add(node);
                }
            }
            //排序
            if (result.size() != 0) {
                ListSort<ModuleNode> listSort = new ListSort<ModuleNode>();
                listSort.sort(result, "getSequence", "asc");
            }
        }
        return result;
    }

    private boolean isKeyChanged(Module oldModule, Module newModule) {
        if (oldModule.getNameSpace() != newModule.getNameSpace()
                || oldModule.getModuleName() != newModule.getModuleName()) {
            return true;
        }
        return false;
    }

    public ModuleDao getModuleDao() {
        return moduleDao;
    }

    public void setModuleDao(ModuleDao moduleDao) {
        this.moduleDao = moduleDao;
    }

    public void setAuthModuleService(AuthModuleService authModuleService) {
        this.authModuleService = authModuleService;
    }

    public void setAuthOperatingService(AuthOperatingService authOperatingService) {
        this.authOperatingService = authOperatingService;
    }

    public void setAuthDataService(AuthDataService authDataService) {
        this.authDataService = authDataService;
    }
}
