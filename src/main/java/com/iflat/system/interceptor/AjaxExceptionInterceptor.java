package com.iflat.system.interceptor;

import com.iflat.system.listener.AjaxExceptionListener;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by tyriv on 2015/9/30.
 */
public class AjaxExceptionInterceptor implements Interceptor {

    @Override
    public void destroy() {

    }

    @Override
    public void init() {

    }

    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception{

        String result = null;

        /**
         * 如果是Ajax请求，则添加AjaxExceptionListener监听器，
         * 监听器用于动态修改action中的result对象的success和message等属性
         */
        HttpServletRequest request = ServletActionContext.getRequest();
        String xRequestedWith = request.getHeader("X-Requested-With");
        if(!StringUtils.isEmpty(xRequestedWith)) {
            actionInvocation.addPreResultListener(new AjaxExceptionListener());
        }

        //actionInvocation.addPreResultListener(new AjaxExceptionListener());
        result = actionInvocation.invoke();
        return result;
    }
}
