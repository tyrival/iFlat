package com.iflat.xr.action;

import com.iflat.xr.bean.TrSettlementDetl;
import com.iflat.xr.bean.TrBalance;
import com.iflat.xr.bean.TrSettlement;
import com.iflat.xr.bean.Discount;
import com.iflat.base.entity.ExcelTemplate;
import com.iflat.util.ExcelUtil;
import com.iflat.workflow.service.WorkflowService;
import com.iflat.xr.bean.Team;
import com.iflat.xr.bean.SrStandardPrice;
import com.iflat.xr.bean.SrSettlementDetl;
import com.iflat.xr.bean.SrSettlement;
import com.iflat.xr.bean.SrProjectPrice;
import com.iflat.xr.bean.SrProjectMgr;
import com.iflat.xr.bean.SrBalanceAppl;
import com.iflat.xr.bean.SrBalance;
import com.iflat.xr.bean.SrAssess;
import com.iflat.xr.bean.Project;
import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.xr.service.SrSettlementService;
import com.iflat.xr.service.TrSettlementService;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;
import java.util.*;

public class XrAction extends BaseAction implements ModelDriven<Page> {
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

    private BaseService xrProjectService;
    private Project xrProject;

    public BaseService getXrProjectService() {
        return xrProjectService;
    }

    public void setXrProjectService(BaseService xrProjectService) {
        this.xrProjectService = xrProjectService;
    }

    public Project getXrProject() {
        return xrProject;
    }

    public void setXrProject(Project xrProject) {
        this.xrProject = xrProject;
    }

    public String saveProject() throws Exception {
        this.result.setObject(this.xrProjectService.save(this.xrProject));
        return SUCCESS;
    }

    public String deleteProject() throws Exception {
        this.result.setObject(this.xrProjectService.delete(this.xrProject));
        return SUCCESS;
    }

    public String listProject() throws Exception {
        this.result.setList(this.xrProjectService.list(this.xrProject));
        return SUCCESS;
    }

    public String listPageProject() throws Exception {
        this.result.setObject(this.xrProjectService.listPage(this.xrProject, this.page));
        return SUCCESS;
    }

    public String uploadProject() throws Exception {
        this.result.setObject(this.xrProjectService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srAssessService;
    private SrAssess srAssess;

    public BaseService getSrAssessService() {
        return srAssessService;
    }

    public void setSrAssessService(BaseService srAssessService) {
        this.srAssessService = srAssessService;
    }

    public SrAssess getSrAssess() {
        return srAssess;
    }

    public void setSrAssess(SrAssess srAssess) {
        this.srAssess = srAssess;
    }

    public String saveSrAssess() throws Exception {
        this.result.setObject(this.srAssessService.save(this.srAssess));
        return SUCCESS;
    }

    public String deleteSrAssess() throws Exception {
        this.result.setObject(this.srAssessService.delete(this.srAssess));
        return SUCCESS;
    }

    public String listSrAssess() throws Exception {
        this.result.setList(this.srAssessService.list(this.srAssess));
        return SUCCESS;
    }

    public String listPageSrAssess() throws Exception {
        this.result.setObject(this.srAssessService.listPage(this.srAssess, this.page));
        return SUCCESS;
    }

    public String uploadSrAssess() throws Exception {
        this.result.setObject(this.srAssessService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srBalanceService;
    private SrBalance srBalance;

    public BaseService getSrBalanceService() {
        return srBalanceService;
    }

    public void setSrBalanceService(BaseService srBalanceService) {
        this.srBalanceService = srBalanceService;
    }

    public SrBalance getSrBalance() {
        return srBalance;
    }

    public void setSrBalance(SrBalance srBalance) {
        this.srBalance = srBalance;
    }

    public String saveSrBalance() throws Exception {
        this.result.setObject(this.srBalanceService.save(this.srBalance));
        return SUCCESS;
    }

    public String deleteSrBalance() throws Exception {
        this.result.setObject(this.srBalanceService.delete(this.srBalance));
        return SUCCESS;
    }

    public String listSrBalance() throws Exception {
        this.result.setList(this.srBalanceService.list(this.srBalance));
        return SUCCESS;
    }

    public String listPageSrBalance() throws Exception {
        this.result.setObject(this.srBalanceService.listPage(this.srBalance, this.page));
        return SUCCESS;
    }

    public String uploadSrBalance() throws Exception {
        this.result.setObject(this.srBalanceService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srBalanceApplService;
    private SrBalanceAppl srBalanceAppl;

    public BaseService getSrBalanceApplService() {
        return srBalanceApplService;
    }

    public void setSrBalanceApplService(BaseService srBalanceApplService) {
        this.srBalanceApplService = srBalanceApplService;
    }

    public SrBalanceAppl getSrBalanceAppl() {
        return srBalanceAppl;
    }

    public void setSrBalanceAppl(SrBalanceAppl srBalanceAppl) {
        this.srBalanceAppl = srBalanceAppl;
    }

    public String saveSrBalanceAppl() throws Exception {
        this.result.setObject(this.srBalanceApplService.save(this.srBalanceAppl));
        return SUCCESS;
    }

    public String deleteSrBalanceAppl() throws Exception {
        this.result.setObject(this.srBalanceApplService.delete(this.srBalanceAppl));
        return SUCCESS;
    }

    public String listSrBalanceAppl() throws Exception {
        this.result.setList(this.srBalanceApplService.list(this.srBalanceAppl));
        return SUCCESS;
    }

    public String listPageSrBalanceAppl() throws Exception {
        this.result.setObject(this.srBalanceApplService.listPage(this.srBalanceAppl, this.page));
        return SUCCESS;
    }

    public String uploadSrBalanceAppl() throws Exception {
        this.result.setObject(this.srBalanceApplService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srProjectMgrService;
    private SrProjectMgr srProjectMgr;

    public BaseService getSrProjectMgrService() {
        return srProjectMgrService;
    }

    public void setSrProjectMgrService(BaseService srProjectMgrService) {
        this.srProjectMgrService = srProjectMgrService;
    }

    public SrProjectMgr getSrProjectMgr() {
        return srProjectMgr;
    }

    public void setSrProjectMgr(SrProjectMgr srProjectMgr) {
        this.srProjectMgr = srProjectMgr;
    }

    public String saveSrProjectMgr() throws Exception {
        this.result.setObject(this.srProjectMgrService.save(this.srProjectMgr));
        return SUCCESS;
    }

    public String deleteSrProjectMgr() throws Exception {
        this.result.setObject(this.srProjectMgrService.delete(this.srProjectMgr));
        return SUCCESS;
    }

    public String listSrProjectMgr() throws Exception {
        this.result.setList(this.srProjectMgrService.list(this.srProjectMgr));
        return SUCCESS;
    }

    public String listPageSrProjectMgr() throws Exception {
        this.result.setObject(this.srProjectMgrService.listPage(this.srProjectMgr, this.page));
        return SUCCESS;
    }

    public String uploadSrProjectMgr() throws Exception {
        this.result.setObject(this.srProjectMgrService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srProjectPriceService;
    private SrProjectPrice srProjectPrice;

    public BaseService getSrProjectPriceService() {
        return srProjectPriceService;
    }

    public void setSrProjectPriceService(BaseService srProjectPriceService) {
        this.srProjectPriceService = srProjectPriceService;
    }

    public SrProjectPrice getSrProjectPrice() {
        return srProjectPrice;
    }

    public void setSrProjectPrice(SrProjectPrice srProjectPrice) {
        this.srProjectPrice = srProjectPrice;
    }

    public String saveSrProjectPrice() throws Exception {
        this.result.setObject(this.srProjectPriceService.save(this.srProjectPrice));
        return SUCCESS;
    }

    public String deleteSrProjectPrice() throws Exception {
        this.result.setObject(this.srProjectPriceService.delete(this.srProjectPrice));
        return SUCCESS;
    }

    public String listSrProjectPrice() throws Exception {
        this.result.setList(this.srProjectPriceService.list(this.srProjectPrice));
        return SUCCESS;
    }

    public String listPageSrProjectPrice() throws Exception {
        this.result.setObject(this.srProjectPriceService.listPage(this.srProjectPrice, this.page));
        return SUCCESS;
    }

    public String uploadSrProjectPrice() throws Exception {
        this.result.setObject(this.srProjectPriceService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private SrSettlementService xrSrSettlementService;
    private SrSettlement xrSrSettlement;
    private List<SrSettlement> xrSrSettlementList = new ArrayList<>();

    public List<SrSettlement> getXrSrSettlementList() {
        return xrSrSettlementList;
    }

    public void setXrSrSettlementList(List<SrSettlement> xrSrSettlementList) {
        this.xrSrSettlementList = xrSrSettlementList;
    }

    public SrSettlementService getXrSrSettlementService() {
        return xrSrSettlementService;
    }

    public void setXrSrSettlementService(SrSettlementService xrSrSettlementService) {
        this.xrSrSettlementService = xrSrSettlementService;
    }

    public SrSettlement getXrSrSettlement() {
        return xrSrSettlement;
    }

    public void setXrSrSettlement(SrSettlement xrSrSettlement) {
        this.xrSrSettlement = xrSrSettlement;
    }

    public String importSrSettlement() throws Exception {
        this.result.setList(this.xrSrSettlementService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    /**
     * 提交SrSettlement审批     * @return     * @throws Exception
     */
    public String submitSrSettlement() throws Exception {
        xrSrSettlementService.submit(this.xrSrSettlement);
        return SUCCESS;
    }

    /**
     * 保存SrSettlement并提交审批     * @return     * @throws Exception
     */
    public String saveAndSubmitSrSettlement() throws Exception {
        SrSettlement srSettlement = (SrSettlement) this.xrSrSettlementService.save(this.xrSrSettlement);
        xrSrSettlementService.submit(this.xrSrSettlement);
        this.result.setObject(srSettlement);
        return SUCCESS;
    }

    public String listSrSettlementComment() throws Exception {
        this.result.setList(this.xrSrSettlementService.listComment(this.xrSrSettlement));
        return SUCCESS;
    }

    public String saveSrSettlement() throws Exception {
        this.result.setObject(this.xrSrSettlementService.save(this.xrSrSettlement));
        return SUCCESS;
    }

    public String deleteSrSettlement() throws Exception {
        this.result.setObject(this.xrSrSettlementService.delete(this.xrSrSettlement));
        return SUCCESS;
    }

    public String listSrSettlement() throws Exception {
        this.result.setList(this.xrSrSettlementService.list(this.xrSrSettlement));
        return SUCCESS;
    }

    public String listPageSrSettlement() throws Exception {
        this.result.setObject(this.xrSrSettlementService.listPage(this.xrSrSettlement, this.page));
        return SUCCESS;
    }

    public String uploadSrSettlement() throws Exception {
        this.result.setObject(this.xrSrSettlementService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String templateSrSettlement() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("xr", "SrSettlement");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String approveSrSettlement() throws Exception {
        String businessKey = xrSrSettlementService.getBusinessKey(xrSrSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String approveSrSettlementWithAssess() throws Exception {
        this.srAssessService.save(this.srAssess);
        String businessKey = xrSrSettlementService.getBusinessKey(xrSrSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String approveSrSettlementWithSave() throws Exception {
        this.xrSrSettlementService.save(this.xrSrSettlement);
        String businessKey = xrSrSettlementService.getBusinessKey(xrSrSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String approveSrSettlementBatch() throws Exception {
        if (xrSrSettlementList != null && xrSrSettlementList.size() > 0) {
            for (int i = 0; i < xrSrSettlementList.size(); i++) {
                String businessKey = xrSrSettlementService.getBusinessKey(xrSrSettlementList.get(i));
                workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
        return SUCCESS;
    }/*    public String approveSrSettlementFirst() throws Exception {        if ("pass".equals(outGoingName)) {            SrSettlement orig = new SrSettlement();            orig.setId(this.xrSrSettlement.getId());            orig = (SrSettlement) this.xrSrSettlementService.list(orig).get(0);            Double adjust = this.xrSrSettlement.getAmountFirst() - orig.getAmountFirst();            if (adjust != 0) {                SrBalance balance = new SrBalance();                balance.setDept(orig.getDept());                balance.setAdjustment(adjust);                this.srBalanceService.save(balance);            }            UserInfoVo userInfoVo = Session.getUserInfo();            this.xrSrSettlement.setSettFirstAcc(userInfoVo.getAccount());            this.xrSrSettlement.setSettFirstName(userInfoVo.getUserName());            this.xrSrSettlement.setSettFirstTime(new Date());            this.result.setObject(this.xrSrSettlementService.save(this.xrSrSettlement));        }        String businessKey = xrSrSettlementService.getBusinessKey(xrSrSettlement);        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);        return SUCCESS;    }    public String approveSrSettlementSecond() throws Exception {        if ("pass".equals(outGoingName)) {            SrSettlement orig = new SrSettlement();            orig.setId(this.xrSrSettlement.getId());            orig = (SrSettlement) this.xrSrSettlementService.list(orig).get(0);            Double adjust = this.xrSrSettlement.getAmountSecond() - orig.getAmountSecond();            if (adjust != 0) {                SrBalance balance = new SrBalance();                balance.setDept(orig.getDept());                balance.setAdjustment(0 - adjust);                this.srBalanceService.save(balance);            }        }        String businessKey = xrSrSettlementService.getBusinessKey(xrSrSettlement);        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);        return SUCCESS;    }*/

    private BaseService srSettlementDetlService;
    private SrSettlementDetl srSettlementDetl;

    public BaseService getSrSettlementDetlService() {
        return srSettlementDetlService;
    }

    public void setSrSettlementDetlService(BaseService srSettlementDetlService) {
        this.srSettlementDetlService = srSettlementDetlService;
    }

    public SrSettlementDetl getSrSettlementDetl() {
        return srSettlementDetl;
    }

    public void setSrSettlementDetl(SrSettlementDetl srSettlementDetl) {
        this.srSettlementDetl = srSettlementDetl;
    }

    public String createSrSettlementDetl() throws Exception {
        this.xrSrSettlement = (SrSettlement) this.xrSrSettlementService.save(this.xrSrSettlement);
        try {
            this.srSettlementDetl.setPid(this.xrSrSettlement.getId());
            this.srSettlementDetl = (SrSettlementDetl) this.srSettlementDetlService.save(this.srSettlementDetl);
            Map<String, Object> map = new HashMap();
            map.put("head", this.xrSrSettlement);
            map.put("detail", this.srSettlementDetl);
            this.result.setMap(map);
        } catch (Exception e) {
            this.xrSrSettlementService.delete(this.xrSrSettlement);
            throw new Exception(e.getMessage());
        }
        return SUCCESS;
    }

    public String saveSrSettlementDetl() throws Exception {
        this.result.setObject(this.srSettlementDetlService.save(this.srSettlementDetl));
        return SUCCESS;
    }

    public String deleteSrSettlementDetl() throws Exception {
        this.result.setObject(this.srSettlementDetlService.delete(this.srSettlementDetl));
        return SUCCESS;
    }

    public String listSrSettlementDetl() throws Exception {
        this.result.setList(this.srSettlementDetlService.list(this.srSettlementDetl));
        return SUCCESS;
    }

    public String listPageSrSettlementDetl() throws Exception {
        this.result.setObject(this.srSettlementDetlService.listPage(this.srSettlementDetl, this.page));
        return SUCCESS;
    }

    public String uploadSrSettlementDetl() throws Exception {
        this.result.setObject(this.srSettlementDetlService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService srStandardPriceService;
    private SrStandardPrice srStandardPrice;

    public BaseService getSrStandardPriceService() {
        return srStandardPriceService;
    }

    public void setSrStandardPriceService(BaseService srStandardPriceService) {
        this.srStandardPriceService = srStandardPriceService;
    }

    public SrStandardPrice getSrStandardPrice() {
        return srStandardPrice;
    }

    public void setSrStandardPrice(SrStandardPrice srStandardPrice) {
        this.srStandardPrice = srStandardPrice;
    }

    public String saveSrStandardPrice() throws Exception {
        this.result.setObject(this.srStandardPriceService.save(this.srStandardPrice));
        return SUCCESS;
    }

    public String deleteSrStandardPrice() throws Exception {
        this.result.setObject(this.srStandardPriceService.delete(this.srStandardPrice));
        return SUCCESS;
    }

    public String listSrStandardPrice() throws Exception {
        this.result.setList(this.srStandardPriceService.list(this.srStandardPrice));
        return SUCCESS;
    }

    public String listPageSrStandardPrice() throws Exception {
        this.result.setObject(this.srStandardPriceService.listPage(this.srStandardPrice, this.page));
        return SUCCESS;
    }

    public String uploadSrStandardPrice() throws Exception {
        this.result.setObject(this.srStandardPriceService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService teamService;
    private Team xrTeam;

    public BaseService getTeamService() {
        return teamService;
    }

    public void setTeamService(BaseService teamService) {
        this.teamService = teamService;
    }

    public Team getXrTeam() {
        return xrTeam;
    }

    public void setXrTeam(Team xrTeam) {
        this.xrTeam = xrTeam;
    }

    public String saveTeam() throws Exception {
        this.result.setObject(this.teamService.save(this.xrTeam));
        return SUCCESS;
    }

    public String deleteTeam() throws Exception {
        this.result.setObject(this.teamService.delete(this.xrTeam));
        return SUCCESS;
    }

    public String listTeam() throws Exception {
        this.result.setList(this.teamService.list(this.xrTeam));
        return SUCCESS;
    }

    public String listPageTeam() throws Exception {
        this.result.setObject(this.teamService.listPage(this.xrTeam, this.page));
        return SUCCESS;
    }

    public String uploadTeam() throws Exception {
        this.result.setObject(this.teamService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService xrDiscountService;
    private Discount xrDiscount;

    public BaseService getXrDiscountService() {
        return xrDiscountService;
    }

    public void setXrDiscountService(BaseService xrDiscountService) {
        this.xrDiscountService = xrDiscountService;
    }

    public Discount getXrDiscount() {
        return xrDiscount;
    }

    public void setXrDiscount(Discount xrDiscount) {
        this.xrDiscount = xrDiscount;
    }

    public String saveDiscount() throws Exception {
        this.result.setObject(this.xrDiscountService.save(this.xrDiscount));
        return SUCCESS;
    }

    public String deleteDiscount() throws Exception {
        this.result.setObject(this.xrDiscountService.delete(this.xrDiscount));
        return SUCCESS;
    }

    public String listDiscount() throws Exception {
        this.result.setList(this.xrDiscountService.list(this.xrDiscount));
        return SUCCESS;
    }

    public String listPageDiscount() throws Exception {
        this.result.setObject(this.xrDiscountService.listPage(this.xrDiscount, this.page));
        return SUCCESS;
    }

    public String uploadDiscount() throws Exception {
        this.result.setObject(this.xrDiscountService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private TrSettlementService trSettlementService;
    private TrSettlement trSettlement;
    private List<TrSettlement> trSettlementList = new ArrayList<>();

    public List<TrSettlement> getTrSettlementList() {
        return trSettlementList;
    }

    public void setTrSettlementList(List<TrSettlement> trSettlementList) {
        this.trSettlementList = trSettlementList;
    }

    public TrSettlementService getTrSettlementService() {
        return trSettlementService;
    }

    public void setTrSettlementService(TrSettlementService trSettlementService) {
        this.trSettlementService = trSettlementService;
    }

    public TrSettlement getTrSettlement() {
        return trSettlement;
    }

    public void setTrSettlement(TrSettlement trSettlement) {
        this.trSettlement = trSettlement;
    }

    public String saveTrSettlement() throws Exception {
        this.result.setObject(this.trSettlementService.save(this.trSettlement));
        return SUCCESS;
    }

    public String deleteTrSettlement() throws Exception {
        this.result.setObject(this.trSettlementService.delete(this.trSettlement));
        return SUCCESS;
    }

    public String listTrSettlement() throws Exception {
        this.result.setList(this.trSettlementService.list(this.trSettlement));
        return SUCCESS;
    }

    public String listPageTrSettlement() throws Exception {
        this.result.setObject(this.trSettlementService.listPage(this.trSettlement, this.page));
        return SUCCESS;
    }

    public String uploadTrSettlement() throws Exception {
        this.result.setObject(this.trSettlementService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String approveTrSettlementWithSave() throws Exception {
        this.trSettlementService.save(this.trSettlement);
        String businessKey = trSettlementService.getBusinessKey(trSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String approveTrSettlementBatch() throws Exception {
        if (trSettlementList != null && trSettlementList.size() > 0) {
            for (int i = 0; i < trSettlementList.size(); i++) {
                String businessKey = trSettlementService.getBusinessKey(trSettlementList.get(i));
                workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
        return SUCCESS;
    }

    public String submitTrSettlement() throws Exception {
        trSettlementService.submit(this.trSettlement);
        return SUCCESS;
    }

    /**
     * 保存SrSettlement并提交审批
     * @return
     * @throws Exception
     */
    public String saveAndSubmitTrSettlement() throws Exception {
        TrSettlement trSettlement = (TrSettlement) this.trSettlementService.save(this.trSettlement);
        trSettlementService.submit(this.trSettlement);
        this.result.setObject(trSettlement);
        return SUCCESS;
    }

    public String templateTrSettlement() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("xr", "TrSettlement");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String approveTrSettlement() throws Exception {
        String businessKey = trSettlementService.getBusinessKey(trSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    private BaseService trBalanceService;
    private TrBalance trBalance;

    public BaseService getTrBalanceService() {
        return trBalanceService;
    }

    public void setTrBalanceService(BaseService trBalanceService) {
        this.trBalanceService = trBalanceService;
    }

    public TrBalance getTrBalance() {
        return trBalance;
    }

    public void setTrBalance(TrBalance trBalance) {
        this.trBalance = trBalance;
    }

    public String saveTrBalance() throws Exception {
        this.result.setObject(this.trBalanceService.save(this.trBalance));
        return SUCCESS;
    }

    public String deleteTrBalance() throws Exception {
        this.result.setObject(this.trBalanceService.delete(this.trBalance));
        return SUCCESS;
    }

    public String listTrBalance() throws Exception {
        this.result.setList(this.trBalanceService.list(this.trBalance));
        return SUCCESS;
    }

    public String listPageTrBalance() throws Exception {
        this.result.setObject(this.trBalanceService.listPage(this.trBalance, this.page));
        return SUCCESS;
    }

    public String uploadTrBalance() throws Exception {
        this.result.setObject(this.trBalanceService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService trSettlementDetlService;
    private TrSettlementDetl trSettlementDetl;

    public BaseService getTrSettlementDetlService() {
        return trSettlementDetlService;
    }

    public void setTrSettlementDetlService(BaseService trSettlementDetlService) {
        this.trSettlementDetlService = trSettlementDetlService;
    }

    public TrSettlementDetl getTrSettlementDetl() {
        return trSettlementDetl;
    }

    public void setTrSettlementDetl(TrSettlementDetl trSettlementDetl) {
        this.trSettlementDetl = trSettlementDetl;
    }

    public String saveTrSettlementDetl() throws Exception {
        this.result.setObject(this.trSettlementDetlService.save(this.trSettlementDetl));
        return SUCCESS;
    }

    public String deleteTrSettlementDetl() throws Exception {
        this.result.setObject(this.trSettlementDetlService.delete(this.trSettlementDetl));
        return SUCCESS;
    }

    public String listTrSettlementDetl() throws Exception {
        this.result.setList(this.trSettlementDetlService.list(this.trSettlementDetl));
        return SUCCESS;
    }

    public String listPageTrSettlementDetl() throws Exception {
        this.result.setObject(this.trSettlementDetlService.listPage(this.trSettlementDetl, this.page));
        return SUCCESS;
    }

    public String uploadTrSettlementDetl() throws Exception {
        this.result.setObject(this.trSettlementDetlService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String createTrSettlementDetl() throws Exception {
        this.trSettlement = (TrSettlement) this.trSettlementService.save(this.trSettlement);
        try {
            this.trSettlementDetl.setPid(this.trSettlement.getId());
            this.trSettlementDetl = (TrSettlementDetl) this.trSettlementDetlService.save(this.trSettlementDetl);
            Map<String, Object> map = new HashMap();
            map.put("head", this.trSettlement);
            map.put("detail", this.trSettlementDetl);
            this.result.setMap(map);
        } catch (Exception e) {
            this.trSettlementService.delete(this.trSettlement);
            throw new Exception(e.getMessage());
        }
        return SUCCESS;
    }

}