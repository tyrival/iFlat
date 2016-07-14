package com.iflat.pm.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.pm.bean.Project;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

/**
 * Created by tyriv on 2016/7/11.
 */
public class PmAction extends BaseAction implements ModelDriven<Page> {

    private Page page;
    private File upload;
    private String uploadFileName;
    private String filePath;

    private Project pmProject;
    private BaseService pmProjectService;
    
    /* Project */
    public String saveProject() throws Exception {
        this.result.setObject(this.pmProjectService.save(this.pmProject));
        return SUCCESS;
    }

    public String deleteProject() throws Exception {
        this.result.setObject(this.pmProjectService.delete(this.pmProject));
        return SUCCESS;
    }

    public String listProject() throws Exception {
        this.result.setList(this.pmProjectService.list(this.pmProject));
        return SUCCESS;
    }

    public String listPageProject() throws Exception {
        this.result.setObject(this.pmProjectService.listPage(this.pmProject, this.page));
        return SUCCESS;
    }

    public String uploadProject() throws Exception {
        this.result.setObject(this.pmProjectService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public Project getPmProject() {
        return pmProject;
    }

    public void setPmProject(Project pmProject) {
        this.pmProject = pmProject;
    }

    public BaseService getPmProjectService() {
        return pmProjectService;
    }

    public void setPmProjectService(BaseService pmProjectService) {
        this.pmProjectService = pmProjectService;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
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

    public String getFilePath() {
        return filePath;
    }

    @Override
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    @Override
    public Page getModel() {
        if(page == null){
            page = new Page();
        }
        return page;
    }
}
