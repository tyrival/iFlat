package com.iflat.system.listener;

import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;

import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

/**
 * Created by tyriv on 2015/11/4.
 */
public class SessionListener implements HttpSessionAttributeListener {

    public void attributeAdded(HttpSessionBindingEvent arg0) {

    }

    public void attributeRemoved(HttpSessionBindingEvent arg0) {
        try {
            UserInfoVo user = (UserInfoVo) arg0.getValue();
            Application.removeOnline(user);
        } catch (Exception e) {

        }
    }

    public void attributeReplaced(HttpSessionBindingEvent arg0) {
        // TODO Auto-generated method stub

    }
}