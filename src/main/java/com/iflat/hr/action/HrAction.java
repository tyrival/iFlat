package com.iflat.hr.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.ExcelTemplate;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.hr.bean.Credit;
import com.iflat.util.ExcelUtil;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

/**
 * Created by tyriv on 2016/7/13.
 */
public class HrAction extends BaseAction implements ModelDriven<Page> {

    protected Page page;
    private File upload;
    private String uploadFileName;

    private BaseService creditService;
    private Credit credit;

    /* Credit */
    public String saveCredit() throws Exception {
        this.result.setObject(this.creditService.save(this.credit));
        return SUCCESS;
    }

    public String deleteCredit() throws Exception {
        this.result.setObject(this.creditService.delete(this.credit));
        return SUCCESS;
    }

    public String listCredit() throws Exception {
        this.result.setList(this.creditService.list(this.credit));
        return SUCCESS;
    }

    public String uploadCredit() throws Exception {
        this.result.setObject(this.creditService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listPageCredit() throws Exception {
        this.result.setObject(this.creditService.listPage(this.credit, this.page));
        return SUCCESS;
    }

    public String importCredit() throws Exception {
        this.result.setList(this.creditService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String templateCredit() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("hr", "Credit");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
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

    public BaseService getCreditService() {
        return creditService;
    }

    public void setCreditService(BaseService creditService) {
        this.creditService = creditService;
    }

    public Credit getCredit() {
        return credit;
    }

    public void setCredit(Credit credit) {
        this.credit = credit;
    }

    @Override
    public Page getModel() {
        if(page == null){
            page = new Page();
        }
        return page;
    }
}
