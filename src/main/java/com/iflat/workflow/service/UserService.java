package com.iflat.workflow.service;

import com.iflat.system.service.UserRoleService;
import com.iflat.workflow.util.ActivitiUtils;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.persistence.entity.UserEntityManager;

import java.util.List;

/**
 * Created by tyriv on 2016/3/8.
 */
public class UserService extends UserEntityManager {

    private com.iflat.system.service.UserService userService;
    private UserRoleService userRoleService;

    @Override
    public User findUserById(String userId) {

        try {
            return ActivitiUtils.convertUser(userService.getUserInfoByAccount(userId));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Group> findGroupsByUser(String userId) {

        try {
            return ActivitiUtils.convertRoleList(userRoleService.listVoByAccount(userId));
        } catch (Exception e) {
            return null;
        }
    }

    public void setUserService(com.iflat.system.service.UserService userService) {
        this.userService = userService;
    }

    public void setUserRoleService(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }
}
