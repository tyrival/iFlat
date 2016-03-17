package com.iflat.util;

import com.iflat.system.bean.User;
import com.iflat.system.entity.UserInfoVo;
import com.opensymphony.xwork2.ActionContext;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContext;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by tyriv on 2015/11/5.
 */
public class Application {

    public static Map getApplication() throws Exception {
        return ActionContext.getContext().getApplication();
    }

    public static ServletContext getServletContext() {
        return ServletActionContext.getServletContext();
    }

    public static ApplicationContext getSpringContext() {
        return WebApplicationContextUtils
                .getRequiredWebApplicationContext(getServletContext());
    }

    public static String getContextParam(String param) throws Exception {
        return getServletContext().getInitParameter(param);
    }

    public static String getWebRootPath() throws Exception {
        return ((ServletContext) ActionContext.getContext().get(ServletActionContext.SERVLET_CONTEXT)).getRealPath("/");
    }

    public static boolean isOnline() throws Exception {
        boolean flag = false;
        UserInfoVo user = Session.getUserInfo();
        UserInfoVo online = getOnline().get(user.getAccount());
        if (user == online) {
            flag = true;
        }
        return flag;
    }

    public static boolean isOnline(String account) throws Exception {
        UserInfoVo online = getOnline().get(account);
        return online != null;
    }

    public static boolean isOnline(User user) throws Exception {
        UserInfoVo online = getOnline().get(user.getAccount());
        return online != null;
    }

    /**
     * 将user对象放入map中成为全局对象，key为account，value为user对象，
     * 当key=account存在时，新的user对象替换旧的
     */
    public static void addOnline(UserInfoVo userInfoVo) throws Exception {
        Map<String, UserInfoVo> map = getOnline();
        if(map == null) {
            map = new HashMap<String, UserInfoVo>();
        }
        map.put(userInfoVo.getAccount(), userInfoVo);
        getApplication().put("online", map);
    }

    /**
     * 取出key为account的对象，如果与map中存储的全局对象相同时，证明此用户没有在别处登陆，清除全局对象
     * 如果与全局对象不同，说明用户在别处登陆，不清除全局对象
     */
    public static void removeOnline(UserInfoVo user) throws Exception {
        Map<String, UserInfoVo> map = getOnline();
        UserInfoVo online = map.get(user.getAccount());
        if (user == online) {
            map.remove(user.getAccount());
            getApplication().put("online", map);
        }
    }

    public static Map<String, UserInfoVo> getOnline() throws Exception {
        return (Map<String, UserInfoVo>)getApplication().get("online");
    }

    //将移动端的token放入全局对象
    public static void addOnlineAir(String token, UserInfoVo userInfoVo) throws Exception {
        Map<String, UserInfoVo> map = getOnlineAir();
        if(map == null) {
            map = new HashMap<String, UserInfoVo>();
        }
        map.put(token, userInfoVo);
        getApplication().put("airOnline", map);
    }

    //根据token判断用户移动端是否在线
    public static boolean isOnlineAir(String token) throws Exception {
        UserInfoVo online = getOnlineAir().get(token);
        return online != null;
    }

    //获得移动端在线token列表
    public static Map<String, UserInfoVo> getOnlineAir() throws Exception {
        return (Map<String, UserInfoVo>)getApplication().get("airOnline");
    }

    //获得移动端在线token列表
    public static UserInfoVo getOnlineUserAir(String token) throws Exception {
        return getOnlineAir().get(token);
    }

    //移除移动端在线的用户
    public static void removeOnlineAir(String account) throws Exception {

        Map<String, UserInfoVo> map = getOnlineAir();
        if (map != null) {
            for (Map.Entry<String, UserInfoVo> entry : map.entrySet()) {
                if (account.equals(entry.getValue().getAccount())) {
                    map.remove(entry.getKey());
                }
            }
        }
    }

}
