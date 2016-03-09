package com.iflat.workflow.action;

import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2016/3/8.
 */
public class WorkflowAction extends ActionSupport implements ResultAware {

    private Result result;



    @Override
    public void setResult(Result result) {
        this.result = result;
    }
}
