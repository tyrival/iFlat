package com.iflat.util;

import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.listener.SessionListener;
import com.opensymphony.xwork2.ActionContext;

import java.util.Date;
import java.util.Map;

/**
 * Created by tyriv on 2015/11/4.
 */
public class Session {

    public static void clear() throws Exception {
        getSession().clear();
    }

    public static void putUserInfo(UserInfoVo userInfoVo) throws Exception {
        userInfoVo.setLoginTime(new Date());
        getSession().put("user", userInfoVo);
    }

    public static UserInfoVo getUserInfo() throws Exception {
        return (UserInfoVo)getSession().get("user");
    }

    public static void put(String key, Object object) throws Exception {
        getSession().put(key, object);
    }

    public static Object get(String key) throws Exception {
        return getSession().get(key);
    }

    public static Map<String, Object> getSession() throws Exception {
        return ActionContext.getContext().getSession();
    }
}
