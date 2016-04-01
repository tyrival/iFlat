package com.iflat.base.action.impl;

import com.iflat.base.action.ResultAware;
import com.iflat.base.entity.Result;
import com.iflat.base.service.BaseService;
import com.iflat.util.FileUtil;
import com.iflat.workflow.service.WorkflowService;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2016/3/9.
 */
public class BaseAction extends ActionSupport implements ResultAware {

    protected Result result;
    protected String filePath;

    public String deleteFile() throws Exception {
        this.result.setObject(FileUtil.delete(this.filePath));
        return SUCCESS;
    }

    public Result getResult() {
        return result;
    }

    @Override
    public void setResult(Result result) {
        this.result = result;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
