package com.iflat.system.service.impl;

import com.iflat.system.bean.Organization;
import com.iflat.system.dao.OrganizationDao;
import com.iflat.system.dao.UserDao;
import com.iflat.system.entity.OrganizationNode;
import com.iflat.system.entity.OrganizationVo;
import com.iflat.system.service.OrganizationManager;

import java.util.*;

/**
 * Created by tyriv on 2015/8/28.
 */
public class OrganizationManagerImpl implements OrganizationManager {

    private OrganizationDao orgDao;
    private UserDao userDao;

    @Override
    public String delete(String orgId) throws Exception {
        /**
         * 有子组织或有用户则不允许删除
         * 无需递归子组织和子组织中的用户
         */
        if(this.orgDao.listChildren(orgId).size() != 0) {
            throw new Exception("禁止删除有下属组织的组织，只可禁用该组织。");
        }

        if(this.userDao.listByOrgId(orgId).size() != 0) {
            throw new Exception("禁止删除有人员的组织，只可禁用该组织。");
        }
        int i = this.orgDao.delete(orgId);
        return i == 1 ? orgId : null;
    }

    @Override
    public Organization save(Organization organization) throws Exception {

        if(organization.getOrgId() != null && !"".equals(organization.getOrgId())) {
            organization = this.orgDao.update(organization);

        } else {
            organization.setOrgId(UUID.randomUUID().toString());
            organization.setCreateTime(new Date());
            organization = this.orgDao.insert(organization);
        }
        return organization;
    }

    @Override
    public List<Organization> list() throws Exception {

        return this.orgDao.list();
    }

    @Override
    public List<OrganizationNode> listNode() throws Exception {

        List<Organization> list = this.orgDao.listActivity();
        List<OrganizationNode> result = new ArrayList<OrganizationNode>();
        OrganizationNode root = null;
        if(list != null) {
            //将list置入Map<id, node>
            HashMap map = new HashMap();
            for (int i = 0; i < list.size(); i++) {
                OrganizationNode node = new OrganizationNode();
                node.setOrgId(list.get(i).getOrgId());
                node.setOrgCode(list.get(i).getOrgCode());
                node.setParentOrgId(list.get(i).getParentOrgId());
                node.setOrgName(list.get(i).getOrgName());
                node.setAlias(list.get(i).getAlias());
                node.setStatus(list.get(i).getStatus());
                map.put(node.getOrgId(), node);
                if(node.getParentOrgId() == null) {
                    root = node;
                }
            }
            //遍历map，将所有节点的父节点的leaf属性改为false
            Set entrySet = map.entrySet();
            for (Iterator it = entrySet.iterator(); it.hasNext();) {
                OrganizationNode node = (OrganizationNode) ((Map.Entry) it.next()).getValue();
                if(node.getParentOrgId() != null) {
                    ((OrganizationNode)map.get(node.getParentOrgId())).setLeaf(false);
                }
            }
            //遍历map，将node取出，生成list
            Set out = map.entrySet();
            for (Iterator it = out.iterator(); it.hasNext();) {
                OrganizationNode node = (OrganizationNode) ((Map.Entry) it.next()).getValue();
                //将除了root外的node都取出
                if(node.getParentOrgId() != null) {
                    //父节点为root的节点的parentNodeId属性置空
                    if(node.getParentOrgId().equals(root.getOrgId())) {
                        node.setParentOrgId(null);
                        //一级节点设置为展开
                        node.setExpanded(true);
                    }
                    result.add(node);
                }
            }
            class OrgSequenceComparator implements Comparator {
                // 按照节点编号比较
                public int compare(Object o1, Object o2) {
                    String s1 = ((OrganizationNode)o1).getOrgCode();
                    String s2 = ((OrganizationNode)o2).getOrgCode();
                    return s1.compareTo(s2);
                }
            }
            Collections.sort(result, new OrgSequenceComparator());
        }
        return result;
    }

    @Override
    public List<OrganizationVo> listVo() throws Exception {

        return this.orgDao.listVo();
    }

    public OrganizationDao getOrgDao() {
        return orgDao;
    }

    public void setOrgDao(OrganizationDao orgDao) {
        this.orgDao = orgDao;
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
