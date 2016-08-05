package com.iflat.base.action.impl;

import com.iflat.base.action.ResultAware;
import com.iflat.base.entity.Result;
import com.iflat.util.FileUtil;
import com.opensymphony.xwork2.ActionSupport;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tyriv on 2016/3/9.
 */
public class BaseAction extends ActionSupport implements ResultAware {

    protected Result result;
    protected String filePath;
    protected String downloadFileName;
    protected List<String> downloadFileList = new ArrayList<String>();

    public String deleteFile() throws Exception {
        this.result.setObject(FileUtil.delete(this.filePath));
        return SUCCESS;
    }

    public String downloadBatch()throws Exception{
        this.result.setObject(FileUtil.downloadBatch(downloadFileList, downloadFileName));
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

    public String getFilePath() {
        return filePath;
    }

    public List<String> getDownloadFileList() {
        return downloadFileList;
    }

    public void setDownloadFileList(List<String> downloadFileList) {
        this.downloadFileList = downloadFileList;
    }

    public String getDownloadFileName() {
        return downloadFileName;
    }

    public void setDownloadFileName(String downloadFileName) {
        this.downloadFileName = downloadFileName;
    }
}
