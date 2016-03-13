package com.iflat.workflow.service.impl;

import com.iflat.system.service.RoleService;
import com.iflat.system.service.UserRoleService;
import com.iflat.workflow.util.ActivitiAdapter;
import org.activiti.engine.identity.Group;
import org.activiti.engine.impl.GroupQueryImpl;
import org.activiti.engine.impl.Page;
import org.activiti.engine.impl.persistence.entity.GroupEntityManager;

import java.util.List;

/**
 * Created by tyriv on 2016/3/8.
 */
public class GroupService extends GroupEntityManager {

    private RoleService roleService;
    private UserRoleService userRoleService;

    @Override
    public List<Group> findGroupsByUser(String userId) {

        try {
            return ActivitiAdapter.convertRoleList(userRoleService.listVoByAccount(userId));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Group> findGroupByQueryCriteria(GroupQueryImpl query, Page page) {
        return super.findGroupByQueryCriteria(query, page);
    }

    @Override
    public long findGroupCountByQueryCriteria(GroupQueryImpl query) {
        return super.findGroupCountByQueryCriteria(query);
    }

    @Override
    public Group createNewGroup(String groupId) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteGroup(String groupId) {
        throw new UnsupportedOperationException();
    }

    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    public void setUserRoleService(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }
}
