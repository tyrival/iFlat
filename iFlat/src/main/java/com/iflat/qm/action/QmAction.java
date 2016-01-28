package com.iflat.qm.action;

import com.iflat.qm.bean.QualityFine;
import com.iflat.qm.entity.QualityFineVo;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Page;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatManager;
import com.iflat.util.FileHelper;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

public class QmAction extends ActionSupport implements ResultAware, ModelDriven<Page> {

    private Result result;

    private IflatManager qualityFineManager;
    private IflatManager qualityFineVoManager;

    private QualityFine qualityFine;
    private QualityFineVo qualityFineVo;

    private Page page;
    private File upload;
    private String uploadFileName;
    private String filePath;

    /* QualityFine */
    public String saveQualityFine() throws Exception {
        this.result.setObject(this.qualityFineManager.save(this.qualityFine));
        return SUCCESS;
    }

    public String deleteQualityFine() throws Exception {
        this.result.setObject(this.qualityFineManager.delete(this.qualityFine));
        return SUCCESS;
    }

    public String listQualityFine() throws Exception {
        this.result.setList(this.qualityFineManager.list(this.qualityFine));
        return SUCCESS;
    }

    public String listPageQualityFine() throws Exception {
        this.result.setObject(this.qualityFineManager.listPage(this.qualityFine, this.page));
        return SUCCESS;
    }

    public String listQualityFineVo() throws Exception {
        this.result.setList(this.qualityFineVoManager.list(this.qualityFineVo));
        return SUCCESS;
    }

    public String listPageQualityFineVo() throws Exception {
        this.result.setObject(this.qualityFineVoManager.listPage(this.qualityFineVo, this.page));
        return SUCCESS;
    }

    public String uploadQualityFine() throws Exception {
        this.result.setObject(this.qualityFineManager.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String deleteFile() throws Exception {
        this.result.setObject(FileHelper.delete(this.filePath));
        return SUCCESS;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public IflatManager getQualityFineManager() {
        return qualityFineManager;
    }

    public void setQualityFineManager(IflatManager qualityFineManager) {
        this.qualityFineManager = qualityFineManager;
    }

    public QualityFine getQualityFine() {
        return qualityFine;
    }

    public void setQualityFine(QualityFine qualityFine) {
        this.qualityFine = qualityFine;
    }

    public IflatManager getQualityFineVoManager() {
        return qualityFineVoManager;
    }

    public void setQualityFineVoManager(IflatManager qualityFineVoManager) {
        this.qualityFineVoManager = qualityFineVoManager;
    }

    public QualityFineVo getQualityFineVo() {
        return qualityFineVo;
    }

    public void setQualityFineVo(QualityFineVo qualityFineVo) {
        this.qualityFineVo = qualityFineVo;
    }

    public File getUpload() {
        return upload;
    }

    public void setUpload(File upload) {
        this.upload = upload;
    }

    public String getUploadFileName() {
        return uploadFileName;
    }

    public void setUploadFileName(String uploadFileName) {
        this.uploadFileName = uploadFileName;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    @Override
    public Page getModel() {
        if(page == null){
            page = new Page();
        }
        return page;
    }
}