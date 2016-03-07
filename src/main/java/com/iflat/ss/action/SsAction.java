package com.iflat.ss.action;

import com.iflat.ss.bean.SafetyFine;
import com.iflat.ss.entity.SafetyFineVo;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Page;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatService;
import com.iflat.util.FileHelper;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

public class SsAction extends ActionSupport implements ResultAware, ModelDriven<Page> {

    private Result result;

    private IflatService safetyFineService;
    private IflatService safetyFineVoService;

    private SafetyFine safetyFine;
    private SafetyFineVo safetyFineVo;

    private Page page;
    private File upload;
    private String uploadFileName;
    private String filePath;

    /* SafetyFine */
    public String saveSafetyFine() throws Exception {
        this.result.setObject(this.safetyFineService.save(this.safetyFine));
        return SUCCESS;
    }

    public String deleteSafetyFine() throws Exception {
        this.result.setObject(this.safetyFineService.delete(this.safetyFine));
        return SUCCESS;
    }

    public String listSafetyFine() throws Exception {
        this.result.setList(this.safetyFineService.list(this.safetyFine));
        return SUCCESS;
    }

    public String listSafetyFineVo() throws Exception {
        this.result.setList(this.safetyFineVoService.list(this.safetyFineVo));
        return SUCCESS;
    }

    public String listPageSafetyFineVo() throws Exception {
        this.result.setObject(this.safetyFineVoService.listPage(this.safetyFineVo, this.page));
        return SUCCESS;
    }

    public String uploadSafetyFine() throws Exception {
        this.result.setObject(this.safetyFineService.uploadFile(upload, uploadFileName));
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

    public IflatService getSafetyFineService() {
        return safetyFineService;
    }

    public void setSafetyFineService(IflatService safetyFineService) {
        this.safetyFineService = safetyFineService;
    }

    public SafetyFine getSafetyFine() {
        return safetyFine;
    }

    public void setSafetyFine(SafetyFine safetyFine) {
        this.safetyFine = safetyFine;
    }

    public IflatService getSafetyFineVoService() {
        return safetyFineVoService;
    }

    public void setSafetyFineVoService(IflatService safetyFineVoService) {
        this.safetyFineVoService = safetyFineVoService;
    }

    public SafetyFineVo getSafetyFineVo() {
        return safetyFineVo;
    }

    public void setSafetyFineVo(SafetyFineVo safetyFineVo) {
        this.safetyFineVo = safetyFineVo;
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
