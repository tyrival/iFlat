package com.iflat.wip.action;

import com.iflat.base.entity.ExcelTemplate;
import com.iflat.util.ExcelUtil;
import com.iflat.wip.bean.SrOutsourceDetl;
import com.iflat.wip.bean.SrOutsource;
import com.iflat.wip.bean.SrOsVendor;
import com.iflat.wip.bean.SrOsProcess;
import com.iflat.wip.bean.SrOsInspect;
import com.iflat.wip.bean.SrOsBidding;
import com.iflat.wip.bean.SrOsAssess;
import com.iflat.wip.bean.SrOsAssess;
import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.wip.entity.SrOsStatus;
import com.iflat.wip.service.SrOutsourceService;
import com.iflat.workflow.service.WorkflowService;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.commons.collections.map.HashedMap;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class WipAction extends BaseAction implements ModelDriven<Page> {
    protected Page page;
    private File upload;
    private String uploadFileName;
    private WorkflowService workflowService;
    private String taskId;
    private String outGoingName;
    private String comment;

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

    public String getOutGoingName() {
        return outGoingName;
    }

    public void setOutGoingName(String outGoingName) {
        this.outGoingName = outGoingName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    @Override
    public Page getModel() {
        if (page == null) {
            page = new Page();
        }
        return page;
    }

    private BaseService srOsAssessService;
    private SrOsAssess srOsAssess;

    public BaseService getSrOsAssessService() {
        return srOsAssessService;
    }

    public void setSrOsAssessService(BaseService srOsAssessService) {
        this.srOsAssessService = srOsAssessService;
    }

    public SrOsAssess getSrOsAssess() {
        return srOsAssess;
    }

    public void setSrOsAssess(SrOsAssess srOsAssess) {
        this.srOsAssess = srOsAssess;
    }

    public String saveSrOsAssess() throws Exception {
        this.result.setObject(this.srOsAssessService.save(this.srOsAssess));
        return SUCCESS;
    }

    public String deleteSrOsAssess() throws Exception {
        this.result.setObject(this.srOsAssessService.delete(this.srOsAssess));
        return SUCCESS;
    }

    public String listSrOsAssess() throws Exception {
        this.result.setList(this.srOsAssessService.list(this.srOsAssess));
        return SUCCESS;
    }

    public String listPageSrOsAssess() throws Exception {
        this.result.setObject(this.srOsAssessService.listPage(this.srOsAssess, this.page));
        return SUCCESS;
    }

    public String uploadSrOsAssess() throws Exception {
        this.result.setObject(this.srOsAssessService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srOsBiddingService;
    private SrOsBidding srOsBidding;

    public BaseService getSrOsBiddingService() {
        return srOsBiddingService;
    }

    public void setSrOsBiddingService(BaseService srOsBiddingService) {
        this.srOsBiddingService = srOsBiddingService;
    }

    public SrOsBidding getSrOsBidding() {
        return srOsBidding;
    }

    public void setSrOsBidding(SrOsBidding srOsBidding) {
        this.srOsBidding = srOsBidding;
    }

    public String saveSrOsBidding() throws Exception {
        this.result.setObject(this.srOsBiddingService.save(this.srOsBidding));
        return SUCCESS;
    }

    public String deleteSrOsBidding() throws Exception {
        this.result.setObject(this.srOsBiddingService.delete(this.srOsBidding));
        return SUCCESS;
    }

    public String listSrOsBidding() throws Exception {
        this.result.setList(this.srOsBiddingService.list(this.srOsBidding));
        return SUCCESS;
    }

    public String listPageSrOsBidding() throws Exception {
        this.result.setObject(this.srOsBiddingService.listPage(this.srOsBidding, this.page));
        return SUCCESS;
    }

    public String uploadSrOsBidding() throws Exception {
        this.result.setObject(this.srOsBiddingService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srOsInspectService;
    private SrOsInspect srOsInspect;

    public BaseService getSrOsInspectService() {
        return srOsInspectService;
    }

    public void setSrOsInspectService(BaseService srOsInspectService) {
        this.srOsInspectService = srOsInspectService;
    }

    public SrOsInspect getSrOsInspect() {
        return srOsInspect;
    }

    public void setSrOsInspect(SrOsInspect srOsInspect) {
        this.srOsInspect = srOsInspect;
    }

    public String saveSrOsInspect() throws Exception {
        this.result.setObject(this.srOsInspectService.save(this.srOsInspect));
        return SUCCESS;
    }

    public String deleteSrOsInspect() throws Exception {
        this.result.setObject(this.srOsInspectService.delete(this.srOsInspect));
        return SUCCESS;
    }

    public String listSrOsInspect() throws Exception {
        this.result.setList(this.srOsInspectService.list(this.srOsInspect));
        return SUCCESS;
    }

    public String listPageSrOsInspect() throws Exception {
        this.result.setObject(this.srOsInspectService.listPage(this.srOsInspect, this.page));
        return SUCCESS;
    }

    public String uploadSrOsInspect() throws Exception {
        this.result.setObject(this.srOsInspectService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srOsProcessService;
    private SrOsProcess srOsProcess;

    public BaseService getSrOsProcessService() {
        return srOsProcessService;
    }

    public void setSrOsProcessService(BaseService srOsProcessService) {
        this.srOsProcessService = srOsProcessService;
    }

    public SrOsProcess getSrOsProcess() {
        return srOsProcess;
    }

    public void setSrOsProcess(SrOsProcess srOsProcess) {
        this.srOsProcess = srOsProcess;
    }

    public String saveSrOsProcess() throws Exception {
        this.result.setObject(this.srOsProcessService.save(this.srOsProcess));
        return SUCCESS;
    }

    public String deleteSrOsProcess() throws Exception {
        this.result.setObject(this.srOsProcessService.delete(this.srOsProcess));
        return SUCCESS;
    }

    public String listSrOsProcess() throws Exception {
        this.result.setList(this.srOsProcessService.list(this.srOsProcess));
        return SUCCESS;
    }

    public String listPageSrOsProcess() throws Exception {
        this.result.setObject(this.srOsProcessService.listPage(this.srOsProcess, this.page));
        return SUCCESS;
    }

    public String uploadSrOsProcess() throws Exception {
        this.result.setObject(this.srOsProcessService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srOsVendorService;
    private SrOsVendor srOsVendor;

    public BaseService getSrOsVendorService() {
        return srOsVendorService;
    }

    public void setSrOsVendorService(BaseService srOsVendorService) {
        this.srOsVendorService = srOsVendorService;
    }

    public SrOsVendor getSrOsVendor() {
        return srOsVendor;
    }

    public void setSrOsVendor(SrOsVendor srOsVendor) {
        this.srOsVendor = srOsVendor;
    }

    public String saveSrOsVendor() throws Exception {
        this.result.setObject(this.srOsVendorService.save(this.srOsVendor));
        return SUCCESS;
    }

    public String deleteSrOsVendor() throws Exception {
        this.result.setObject(this.srOsVendorService.delete(this.srOsVendor));
        return SUCCESS;
    }

    public String listSrOsVendor() throws Exception {
        this.result.setList(this.srOsVendorService.list(this.srOsVendor));
        return SUCCESS;
    }

    public String listPageSrOsVendor() throws Exception {
        this.result.setObject(this.srOsVendorService.listPage(this.srOsVendor, this.page));
        return SUCCESS;
    }

    public String uploadSrOsVendor() throws Exception {
        this.result.setObject(this.srOsVendorService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private SrOutsourceService srOutsourceService;
    private SrOutsource srOutsource;
    private List<SrOutsource> srOutsourceList = new ArrayList<>();
    private Map<String, Object> srOutsourceMap = new HashedMap();

    public Map<String, Object> getSrOutsourceMap() {
        return srOutsourceMap;
    }

    public void setSrOutsourceMap(Map<String, Object> srOutsourceMap) {
        this.srOutsourceMap = srOutsourceMap;
    }

    public List<SrOutsource> getSrOutsourceList() {
        return srOutsourceList;
    }

    public void setSrOutsourceList(List<SrOutsource> srOutsourceList) {
        this.srOutsourceList = srOutsourceList;
    }

    public SrOutsourceService getSrOutsourceService() {
        return srOutsourceService;
    }

    public String submitSrOutsource() throws Exception {
        srOutsourceService.submit(this.srOutsource);
        return SUCCESS;
    }

    public String saveAndSubmitSrOutsource() throws Exception {
        SrOutsource srSettlement = (SrOutsource) this.srOutsourceService.save(this.srOutsource);
        srOutsourceService.submit(this.srOutsource);
        this.result.setObject(srSettlement);
        return SUCCESS;
    }

    public String templateSrOutsource() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("wip", "SrOutsource");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String approveSrOutsource() throws Exception {
        String businessKey = srOutsourceService.getBusinessKey(srOutsource);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String approveSrOutsourceWithAssess() throws Exception {
        this.srOsAssessService.save(this.srOsAssess);
        String businessKey = srOutsourceService.getBusinessKey(srOutsource);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String approveSrOutsourceWithSave() throws Exception {
        SrOutsource res = (SrOutsource) this.srOutsourceService.save(this.srOutsource);

        if (SrOsStatus.STATUS_MANUFACTURE.equals(res.getStatus())) {
            srOutsourceMap.put("overtime", res.isOvertime());
        }

        if (SrOsStatus.STATUS_SETTLEMENT_APPROVE.equals(res.getStatus())) {
            srOutsourceMap.put("saleReaudit", res.isSaleReaudit());
        }

        if (SrOsStatus.STATUS_OUTSOURCE_CHIEF_RECEIPT.equals(res.getStatus())) {
            srOutsourceMap.put("operatorAcc", res.getOperatorAcc());
        }

        if (SrOsStatus.STATUS_INSPECT_CHIEF_HANDLE.equals(res.getStatus())) {
            srOutsourceMap.put("qcAcc", res.getOperatorAcc());
        }

        if (SrOsStatus.STATUS_BIDDING.equals(res.getStatus())) {
            srOutsourceMap.put("saleAcc", res.getOperatorAcc());
        }

        String businessKey = srOutsourceService.getBusinessKey(srOutsource);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment, this.srOutsourceMap);
        return SUCCESS;
    }

    public String approveSrOutsourceBatch() throws Exception {
        if (srOutsourceList != null && srOutsourceList.size() > 0) {
            for (int i = 0; i < srOutsourceList.size(); i++) {
                String businessKey = srOutsourceService.getBusinessKey(srOutsourceList.get(i));
                workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
        return SUCCESS;
    }
    public void setSrOutsourceService(SrOutsourceService srOutsourceService) {
        this.srOutsourceService = srOutsourceService;
    }

    public SrOutsource getSrOutsource() {
        return srOutsource;
    }

    public void setSrOutsource(SrOutsource srOutsource) {
        this.srOutsource = srOutsource;
    }

    public String saveSrOutsource() throws Exception {
        this.result.setObject(this.srOutsourceService.save(this.srOutsource));
        return SUCCESS;
    }

    public String deleteSrOutsource() throws Exception {
        this.result.setObject(this.srOutsourceService.delete(this.srOutsource));
        return SUCCESS;
    }

    public String listSrOutsource() throws Exception {
        this.result.setList(this.srOutsourceService.list(this.srOutsource));
        return SUCCESS;
    }

    public String listPageSrOutsource() throws Exception {
        this.result.setObject(this.srOutsourceService.listPage(this.srOutsource, this.page));
        return SUCCESS;
    }

    public String uploadSrOutsource() throws Exception {
        this.result.setObject(this.srOutsourceService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srOutsourceDetlService;
    private SrOutsourceDetl srOutsourceDetl;

    public BaseService getSrOutsourceDetlService() {
        return srOutsourceDetlService;
    }

    public void setSrOutsourceDetlService(BaseService srOutsourceDetlService) {
        this.srOutsourceDetlService = srOutsourceDetlService;
    }

    public SrOutsourceDetl getSrOutsourceDetl() {
        return srOutsourceDetl;
    }

    public void setSrOutsourceDetl(SrOutsourceDetl srOutsourceDetl) {
        this.srOutsourceDetl = srOutsourceDetl;
    }

    public String saveSrOutsourceDetl() throws Exception {
        this.result.setObject(this.srOutsourceDetlService.save(this.srOutsourceDetl));
        return SUCCESS;
    }

    public String deleteSrOutsourceDetl() throws Exception {
        this.result.setObject(this.srOutsourceDetlService.delete(this.srOutsourceDetl));
        return SUCCESS;
    }

    public String listSrOutsourceDetl() throws Exception {
        this.result.setList(this.srOutsourceDetlService.list(this.srOutsourceDetl));
        return SUCCESS;
    }

    public String listPageSrOutsourceDetl() throws Exception {
        this.result.setObject(this.srOutsourceDetlService.listPage(this.srOutsourceDetl, this.page));
        return SUCCESS;
    }

    public String uploadSrOutsourceDetl() throws Exception {
        this.result.setObject(this.srOutsourceDetlService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

}