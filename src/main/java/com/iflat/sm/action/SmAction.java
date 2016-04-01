package com.iflat.sm.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SbSettlement;
import com.iflat.sm.bean.SbSettlementDetail;
import com.iflat.sm.service.SbSettlementDetailService;
import com.iflat.sm.service.SbSettlementService;
import com.iflat.util.FileUtil;
import com.iflat.workflow.service.WorkflowService;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SmAction extends BaseAction {
    
    private File upload;
    private String uploadFileName;

    private SbSettlementService sbSettlementService;
    private SbSettlementDetailService sbSettlementDetailService;
    private SbSettlement sbSettlement;
    private SbSettlementDetail sbSettlementDetail;

    private WorkflowService workflowService;
    private String taskId;
    private String outGoingName;
    private String comment;

    public String approveSbSettlement() throws Exception {
        String businessKey = sbSettlementService.getBusinessKey(sbSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    /* SbSettlement */
    public String saveSbSettlement() throws Exception {
        this.result.setObject(this.sbSettlementService.save(this.sbSettlement));
        return SUCCESS;
    }

    public String deleteSbSettlement() throws Exception {
        this.result.setObject(this.sbSettlementService.delete(this.sbSettlement));
        return SUCCESS;
    }

    public String listSbSettlement() throws Exception {
        this.result.setList(this.sbSettlementService.list(this.sbSettlement));
        return SUCCESS;
    }

    public String uploadSbSettlement() throws Exception {
        this.result.setObject(this.sbSettlementService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    /**
     * 提交SbSettlement审批
     * @return
     * @throws Exception
     */
    public String submitSbSettlement() throws Exception {
        sbSettlementService.submit(this.sbSettlement);
        return SUCCESS;
    }

    /**
     * 保存SbSettlement并提交审批
     * @return
     * @throws Exception
     */
    public String saveAndSubmitSbSettlement() throws Exception {
        SbSettlement sbSettlement
                = (SbSettlement) this.sbSettlementService.save(this.sbSettlement);
        sbSettlementService.submit(this.sbSettlement);
        this.result.setObject(sbSettlement);
        return SUCCESS;
    }

    /* SbSettlementDetail */
    public String saveSbSettlementDetail() throws Exception {
        this.result.setObject(
                this.sbSettlementDetailService.save(this.sbSettlementDetail));
        return SUCCESS;
    }

    public String deleteSbSettlementDetail() throws Exception {
        this.result.setObject(
                this.sbSettlementDetailService.delete(this.sbSettlementDetail));
        return SUCCESS;
    }

    public String listSbSettlementDetail() throws Exception {
        this.result.setList(
                this.sbSettlementDetailService.list(this.sbSettlementDetail));
        return SUCCESS;
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

    public SbSettlementService getSbSettlementService() {
        return sbSettlementService;
    }

    public void setSbSettlementService(SbSettlementService sbSettlementService) {
        this.sbSettlementService = sbSettlementService;
    }

    public SbSettlementDetailService getSbSettlementDetailService() {
        return sbSettlementDetailService;
    }

    public void setSbSettlementDetailService(SbSettlementDetailService sbSettlementDetailService) {
        this.sbSettlementDetailService = sbSettlementDetailService;
    }

    public SbSettlement getSbSettlement() {
        return sbSettlement;
    }

    public void setSbSettlement(SbSettlement sbSettlement) {
        this.sbSettlement = sbSettlement;
    }

    public SbSettlementDetail getSbSettlementDetail() {
        return sbSettlementDetail;
    }

    public void setSbSettlementDetail(SbSettlementDetail sbSettlementDetail) {
        this.sbSettlementDetail = sbSettlementDetail;
    }

    public WorkflowService getWorkflowService() {
        return workflowService;
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public void setOutGoingName(String outGoingName) {
        this.outGoingName = outGoingName;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
