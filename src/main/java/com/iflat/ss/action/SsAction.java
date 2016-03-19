package com.iflat.ss.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.ss.bean.SafetyFine;
import com.iflat.ss.entity.SafetyFineVo;
import com.iflat.util.FileUtil;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

public class SsAction extends BaseAction implements ModelDriven<Page> {

    private BaseService safetyFineService;
    private BaseService safetyFineVoService;

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
        this.result.setObject(FileUtil.delete(this.filePath));
        return SUCCESS;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public BaseService getSafetyFineService() {
        return safetyFineService;
    }

    public void setSafetyFineService(BaseService safetyFineService) {
        this.safetyFineService = safetyFineService;
    }

    public SafetyFine getSafetyFine() {
        return safetyFine;
    }

    public void setSafetyFine(SafetyFine safetyFine) {
        this.safetyFine = safetyFine;
    }

    public BaseService getSafetyFineVoService() {
        return safetyFineVoService;
    }

    public void setSafetyFineVoService(BaseService safetyFineVoService) {
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
