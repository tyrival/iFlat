package com.iflat.system.interceptor;

import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.AuthOperatingVo;
import com.iflat.system.entity.Result;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.config.entities.ActionConfig;
import com.opensymphony.xwork2.interceptor.Interceptor;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/8/17.
 */
public class AuthorityInterceptor implements Interceptor {

    private SqlSessionTemplate sqlSessionTemplateInterceptor;

    @Override
    public void init() {

    }

    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {

        ActionConfig actionConfig = actionInvocation.getProxy().getConfig();
        String className = actionConfig.getClassName();
        String method = actionConfig.getMethodName();
        //如果是登陆action则不做拦截
        if("com.iflat.system.action.impl.LoginAction".equals(className) && "login".equals(method)) {
            return actionInvocation.invoke();
        }
        //检验是否存在session，或是否已被清除登陆状态，不存在session则跳转到登陆界面
        UserInfoVo session = Session.getUserInfo();
        if(session == null || !Application.isOnline()) {
            Action action = (Action)actionInvocation.getAction();
            Result result = new Result();
            String f = session == null ? "session" : "online";
            result.setFlag(f);
            ((ResultAware)action).setResult(result);
            return "success";
        }
        //生成功能树的action不拦截
        if("com.iflat.system.action.impl.SystemAction".equals(className) && "getNavigationTree".equals(method)) {
            return actionInvocation.invoke();
        }
        //获得条件并查询权限
        AuthOperatingVo authOperatingVo = new AuthOperatingVo();
        getInfoFromSession(authOperatingVo);
        getNameSpace(authOperatingVo, className);
        authOperatingVo.setMethod(method);
        List<AuthOperatingVo> list = this.sqlSessionTemplateInterceptor.selectList("getVoByAuthOperatingVo", authOperatingVo);
        authOperatingVo = list.size() == 0 ? null : list.get(0);
        if(authOperatingVo != null && authOperatingVo.getAoStatus() && !authOperatingVo.getStatus()) {
            //当此模块的操作权限启用，且该操作被禁用时，则不继续操作返回结果。
            Action action = (Action)actionInvocation.getAction();
            if(action instanceof ResultAware) {
                Result result = new Result();
                result.setFlag("forbidden");
                ((ResultAware)action).setResult(result);
            }
            return "success";
        }
        return actionInvocation.invoke();
    }

    private void getNameSpace(AuthOperatingVo authOperatingVo, String className) {
        int secondDot = className.indexOf(".", className.indexOf(".") + 1);
        int thirdDot = className.indexOf(".", secondDot + 1);
        authOperatingVo.setNameSpace(className.substring(secondDot + 1, thirdDot));
    }

    private void getInfoFromSession(AuthOperatingVo authOperatingVo) throws Exception{
        UserInfoVo userInfoVo = Session.getUserInfo();
        authOperatingVo.setRoleId(userInfoVo.getRoleId());
        authOperatingVo.setAccount(userInfoVo.getAccount());
    }

    @Override
    public void destroy() {

    }

    public SqlSessionTemplate getSqlSessionTemplateInterceptor() {
        return sqlSessionTemplateInterceptor;
    }

    public void setSqlSessionTemplateInterceptor(SqlSessionTemplate sqlSessionTemplateInterceptor) {
        this.sqlSessionTemplateInterceptor = sqlSessionTemplateInterceptor;
    }
}
