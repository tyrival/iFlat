package com.iflat.system.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

/**
 * Created by tyriv on 2015/8/17.
 */
public class LogInterceptor implements Interceptor {

    @Override
    public void init() {

    }

    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {

        String resultCode = actionInvocation.invoke();


        return resultCode;
    }

    @Override
    public void destroy() {

    }
}
