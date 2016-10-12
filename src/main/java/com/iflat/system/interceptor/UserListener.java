package com.iflat.system.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.PreResultListener;

/**
 * Created by tyriv on 2015/8/17.
 */
public class UserListener implements PreResultListener {


    /*
    * (1) 在Interceptor中加入以下属性：
    *     private UserListener listener;
    * (2) 提供listener的setter方法；
    * (3) 将listener配置为spring管理；
    * (4) 将Interceptor配置为spring管理，属性listener指向(3)中的bean
    * (5) public String intercept()方法中加入以下代码：
    *     actionInvocation.addPreResultListener()
    * 以上操作之后，在这里可以改变Action执行之后，Interceptor的ResultCode的返回值
    * */
    @Override
    public void beforeResult(ActionInvocation actionInvocation, String s) {

        actionInvocation.setResultCode("");
    }
}
