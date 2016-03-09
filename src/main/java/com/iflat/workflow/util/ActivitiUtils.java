package com.iflat.workflow.util;

import com.iflat.system.bean.UserRole;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.entity.UserRoleVo;
import org.activiti.engine.identity.Group;
import org.activiti.engine.impl.GroupQueryImpl;
import org.activiti.engine.impl.persistence.entity.GroupEntity;
import org.activiti.engine.impl.persistence.entity.UserEntity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tyriv on 2016/3/8.
 */
public class ActivitiUtils {

    public static UserEntity convertUser(UserInfoVo userInfoVo) {

        UserEntity userEntity = new UserEntity();
        userEntity.setId(userInfoVo.getAccount());
        userEntity.setFirstName(userInfoVo.getUserName());
        return userEntity;
    }

    public static GroupEntity convertRole(UserRoleVo userRoleVo) {

        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setId(userRoleVo.getRoleId());
        groupEntity.setName(userRoleVo.getRoleName());
        groupEntity.setType(userRoleVo.getCategory());
        return groupEntity;
    }

    public static List<Group> convertRoleList(List<UserRoleVo> list) {

        List<Group> groupList = new ArrayList<>();
        for (UserRoleVo userRoleVo : list) {
            GroupEntity groupEntity = convertRole(userRoleVo);
            groupList.add(groupEntity);
        }
        return groupList;
    }

    public static UserRole convertGroupQuery(GroupQueryImpl groupQuery) {

        UserRole userRole = new UserRole();
        userRole.setRoleId(groupQuery.getId());
        userRole.setAccount(groupQuery.getUserId());
        return userRole;
    }
}
