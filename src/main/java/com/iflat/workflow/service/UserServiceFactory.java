package com.iflat.workflow.service;

import org.activiti.engine.impl.interceptor.Session;
import org.activiti.engine.impl.interceptor.SessionFactory;
import org.activiti.engine.impl.persistence.entity.UserEntityManager;
import org.activiti.engine.impl.persistence.entity.UserIdentityManager;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by tyriv on 2016/3/8.
 */
public class UserServiceFactory implements SessionFactory {

    private UserEntityManager userEntityManager;

    @Override
    public Class<?> getSessionType() {
        return UserIdentityManager.class;
    }

    @Override
    public Session openSession() {
        return userEntityManager;
    }

    @Autowired
    public void setUserEntityManager(UserEntityManager userEntityManager) {
        this.userEntityManager = userEntityManager;
    }
}
