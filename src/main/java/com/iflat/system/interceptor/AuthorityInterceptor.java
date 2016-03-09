package com.iflat.system.interceptor;

import com.iflat.base.action.ResultAware;
import com.iflat.base.entity.Result;
import com.iflat.system.entity.AuthOperatingVo;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.config.entities.ActionConfig;
import com.opensymphony.xwork2.interceptor.Interceptor;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by tyriv on 2015/8/17.
 */
public class AuthorityInterceptor implements Interceptor {

    private SqlSessionTemplate sqlSessionTemplateInterceptor;
    private String noParam;
    private String airParam;

    private String className;
    private String method;
    private Action action;
    private Result result;
    private UserInfoVo session;

    private String token;

    @Override
    public void init() {
    }

    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {

        ActionConfig actionConfig = actionInvocation.getProxy().getConfig();
        this.className = actionConfig.getClassName();
        this.method = actionConfig.getMethodName();

        this.action = (Action) actionInvocation.getAction();
        this.result = new Result();

        //获取web.xml中的参数，不拦截的条件
        this.noParam = Application.getContextParam("noAuthority");
        if (isIntercepted(noParam)) {
            return actionInvocation.invoke();
        }

        //获取web.xml中的参数，Air拦截的条件
        this.airParam = Application.getContextParam("airAuthority");
        if (isIntercepted(airParam)) {

            Map parameters = actionInvocation.getInvocationContext().getParameters();

            String[] arr = (String[]) parameters.get("token");
            this.token = arr[0];
            UserInfoVo userInfoVo = airGetOnlineUser();

            if (userInfoVo == null) {
                this.result.setFlag("offline");
                this.result.setToken("");
                putResultInAction();
                return "success";

            } else {
                return actionInvocation.invoke();
            }
        }

        //检验是否存在session，或是否已被清除登陆状态，不存在session则跳转到登陆界面
        this.session = Session.getUserInfo();
        if (!sessionCheck()) {
            String f = this.session == null ? "session" : "online";
            this.result.setFlag(f);
            putResultInAction();
            return "success";
        }

        //生成菜单树的方法不拦截
        if (isNavigation()) {
            return actionInvocation.invoke();
        }

        //查询权限
        if (authorityValidate()) {
            return actionInvocation.invoke();
        }

        //当此模块的操作权限启用，且该操作被禁用时，则不继续操作返回结果。
        this.result.setFlag("forbidden");
        putResultInAction();
        return "success";
    }

    private void putResultInAction() throws Exception {
        if (this.action instanceof ResultAware) {
            ((ResultAware) this.action).setResult(this.result);
        }
    }

    private UserInfoVo airGetOnlineUser() throws Exception {

        if (this.token == null || "".equals(this.token)) {
            return null;
        }
        return Application.getOnlineUserAir(this.token);
    }

    private boolean authorityValidate() throws Exception {

        AuthOperatingVo authOperatingVo = new AuthOperatingVo();
        getInfoFromSession(authOperatingVo);
        getNameSpace(authOperatingVo, this.className);
        authOperatingVo.setMethod(this.method);

        List<AuthOperatingVo> list = this.sqlSessionTemplateInterceptor
                .selectList("getVoByAuthOperatingVo", authOperatingVo);
        authOperatingVo = list.size() == 0 ? null : list.get(0);

        if (authOperatingVo != null
                && authOperatingVo.getAoStatus()
                && !authOperatingVo.getStatus()) {
            return false;
        }
        return true;
    }

    private boolean isIntercepted(String param) {

        String[] exception = null;
        if (param != null) {
            exception = param.split("\\s*,\\s*\\s*|\t|\r|\n\\s*");
        }

        if (exception != null) {
            for (int i = 0; i < exception.length; i++) {
                String keyWord = exception[i];
                Pattern p = Pattern.compile(keyWord);
                Matcher m = p.matcher(this.className);
                while (m.find()) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean isNavigation() throws Exception {
        //生成功能树的action不拦截
        if ("com.iflat.system.action.SystemAction".equals(this.className)
                && "getNavigationTree".equals(this.method)) {
            return true;
        }
        return false;
    }

    private boolean sessionCheck() throws Exception {
        if (this.session != null && Application.isOnline()) {
            return true;
        }
        return false;
    }

    private void getNameSpace(AuthOperatingVo authOperatingVo, String className) {
        int secondDot = className.indexOf(".", className.indexOf(".") + 1);
        int thirdDot = className.indexOf(".", secondDot + 1);
        authOperatingVo.setNameSpace(className.substring(secondDot + 1, thirdDot));
    }

    private void getInfoFromSession(AuthOperatingVo authOperatingVo) throws Exception {
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
