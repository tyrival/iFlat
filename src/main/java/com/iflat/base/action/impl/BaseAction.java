package com.iflat.base.action.impl;

import com.iflat.base.action.ResultAware;
import com.iflat.base.entity.Result;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2016/3/9.
 */
public class BaseAction extends ActionSupport implements ResultAware {

    protected Result result;

    public Result getResult() {
        return result;
    }

    @Override
    public void setResult(Result result) {
        this.result = result;
    }
}
