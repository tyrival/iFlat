package com.iflat.sm.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.*;
import com.iflat.sm.service.*;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.service.WorkflowService;
import freemarker.ext.beans.HashAdapter;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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

    private BaseService sbTargetCostService;
    private SbTargetCost sbTargetCost;
    private SbTargetCostSplitService sbTargetCostSplitService;
    private SbTargetCostSplit sbTargetCostSplit;
    private SbTargetCostAccount sbTargetCostAccount;
    private BaseService sbTargetCostAccountService;

    private BaseService srProjectManagerService;
    private SrProjectManager srProjectManager;
    private SrSettlementService srSettlementService;
    private SrSettlementDetlFirstService srSettlementDetlFirstService;
    private SrSettlementDetlSecondService srSettlementDetlSecondService;
    private SrSettlement srSettlement;
    private SrSettlementDetlFirst srSettlementDetlFirst;
    private SrSettlementDetlSecond srSettlementDetlSecond;
    private BaseService srSettlementBalanceService;
    private SrSettlementBalance srSettlementBalance;
    private BaseService srSettlementSecondService;
    private SrSettlementSecond srSettlementSecond;

    private WorkflowService workflowService;
    private String taskId;
    private String outGoingName;
    private String comment;

    /* SbSettlement */
    public String approveSbSettlement() throws Exception {
        String businessKey = sbSettlementService.getBusinessKey(sbSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

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

    public String listSbSettlementComment() throws Exception {
        this.result.setList(this.sbSettlementService.listComment(this.sbSettlement));
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

    /* SbTargetCostAccount */
    public String listSbTargetCostAccount() throws Exception {
        this.result.setList(this.sbTargetCostAccountService.list(this.sbTargetCostAccount));
        return SUCCESS;
    }

    /* SbTargetCost & SbTargetCostSplit */
    public String saveSbTargetCost() throws Exception {
        this.result.setObject(this.sbTargetCostService.save(this.sbTargetCost));
        return SUCCESS;
    }

    public String deleteSbTargetCost() throws Exception {
        this.result.setObject(this.sbTargetCostService.delete(this.sbTargetCost));
        return SUCCESS;
    }

    public String listSbTargetCost() throws Exception {
        this.result.setList(this.sbTargetCostService.list(this.sbTargetCost));
        return SUCCESS;
    }

    public String saveSbTargetCostSplit() throws Exception {
        this.result.setObject(this.sbTargetCostSplitService.save(this.sbTargetCostSplit));
        return SUCCESS;
    }

    public String deleteSbTargetCostSplit() throws Exception {
        this.result.setObject(this.sbTargetCostSplitService.delete(this.sbTargetCostSplit));
        return SUCCESS;
    }

    public String listSbTargetCostSplit() throws Exception {
        this.result.setList(this.sbTargetCostSplitService.list(this.sbTargetCostSplit));
        return SUCCESS;
    }

    /* SrProjectManager */
    public String saveSrProjectManager() throws Exception {
        this.result.setObject(this.srProjectManagerService.save(this.srProjectManager));
        return SUCCESS;
    }

    public String deleteSrProjectManager() throws Exception {
        this.result.setObject(this.srProjectManagerService.delete(this.srProjectManager));
        return SUCCESS;
    }

    public String listSrProjectManager() throws Exception {
        this.result.setList(this.srProjectManagerService.list(this.srProjectManager));
        return SUCCESS;
    }

    /* SrSettlementBalance */
    public String listSrSettlementBalance() throws Exception {
        this.result.setList(this.srSettlementBalanceService.list(this.srSettlementBalance));
        return SUCCESS;
    }

    /* SrSettlement */
    public String approveSrSettlement() throws Exception {
        String businessKey = srSettlementService.getBusinessKey(srSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String approveSrSettlementFirst() throws Exception {

        // 如果是审批通过，则更新余额
        if ("pass".equals(outGoingName)) {
            // 获取原始单据上的一级结算价格，与新价格对比，得到调整金额
            SrSettlement orig = new SrSettlement();
            orig.setId(this.srSettlement.getId());
            orig = (SrSettlement) this.srSettlementService.list(orig).get(0);
            Double adjust = this.srSettlement.getSummaryAmount() - orig.getSummaryAmount();

            // 根据调整价格，修改相应部门的工费余额
            SrSettlementBalance balance = new SrSettlementBalance();
            balance.setDeptName(orig.getDeptName());
            balance.setAdjustment(adjust);
            this.srSettlementBalanceService.save(balance);

            // 储存一级结算的信息
            UserInfoVo userInfoVo = Session.getUserInfo();
            this.srSettlement.setSettleFirstAcc(userInfoVo.getAccount());
            this.srSettlement.setSettleFirstName(userInfoVo.getUserName());
            this.srSettlement.setSettleFirstTime(new Date());
            this.result.setObject(this.srSettlementService.save(this.srSettlement));
        }
        String businessKey = srSettlementService.getBusinessKey(srSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String saveSrSettlement() throws Exception {
        this.result.setObject(this.srSettlementService.save(this.srSettlement));
        return SUCCESS;
    }

    public String deleteSrSettlement() throws Exception {
        this.result.setObject(this.srSettlementService.delete(this.srSettlement));
        return SUCCESS;
    }

    public String listSrSettlement() throws Exception {
        this.result.setList(this.srSettlementService.list(this.srSettlement));
        return SUCCESS;
    }

    public String uploadSrSettlement() throws Exception {
        this.result.setObject(this.srSettlementService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listSrSettlementComment() throws Exception {
        this.result.setList(this.srSettlementService.listComment(this.srSettlement));
        return SUCCESS;
    }

    /**
     * 提交SrSettlement审批
     * @return
     * @throws Exception
     */
    public String submitSrSettlement() throws Exception {
        srSettlementService.submit(this.srSettlement);
        return SUCCESS;
    }

    /**
     * 保存SrSettlement并提交审批
     * @return
     * @throws Exception
     */
    public String saveAndSubmitSrSettlement() throws Exception {
        SrSettlement srSettlement
                = (SrSettlement) this.srSettlementService.save(this.srSettlement);
        srSettlementService.submit(this.srSettlement);
        this.result.setObject(srSettlement);
        return SUCCESS;
    }

    /* SrSettlementDetlFirst */
    public String saveSrSettlementDetlFirst() throws Exception {
        this.result.setObject(
                this.srSettlementDetlFirstService.save(this.srSettlementDetlFirst));
        return SUCCESS;
    }

    // 创建行信息之前，先创建头信息，再将头信息id置入行信息的pid中
    public String createSrSettlementDetlFirst() throws Exception {
        this.srSettlement = (SrSettlement) this.srSettlementService.save(this.srSettlement);
        this.srSettlementDetlFirst.setPid(this.srSettlement.getId());
        this.srSettlementDetlFirst
                = (SrSettlementDetlFirst) this.srSettlementDetlFirstService
                .save(this.srSettlementDetlFirst);
        Map<String, Object> map = new HashMap();
        map.put("head", this.srSettlement);
        map.put("detail", this.srSettlementDetlFirst);
        this.result.setMap(map);
        return SUCCESS;
    }

    public String deleteSrSettlementDetlFirst() throws Exception {
        this.result.setObject(
                this.srSettlementDetlFirstService.delete(this.srSettlementDetlFirst));
        return SUCCESS;
    }

    public String listSrSettlementDetlFirst() throws Exception {
        this.result.setList(
                this.srSettlementDetlFirstService.list(this.srSettlementDetlFirst));
        return SUCCESS;
    }

    /* SrSettlementSecond */
    public String saveSrSettlementSecond() throws Exception {
        this.result.setObject(this.srSettlementSecondService.save(this.srSettlementSecond));
        return SUCCESS;
    }

    public String deleteSrSettlementSecond() throws Exception {
        this.result.setObject(this.srSettlementSecondService.delete(this.srSettlementSecond));
        return SUCCESS;
    }

    public String listSrSettlementSecond() throws Exception {
        this.result.setList(this.srSettlementSecondService.list(this.srSettlementSecond));
        return SUCCESS;
    }

    public String uploadSrSettlementSecond() throws Exception {
        this.result.setObject(this.srSettlementSecondService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listSrSettlementSecondComment() throws Exception {
        this.result.setList(this.srSettlementSecondService.listComment(this.srSettlementSecond));
        return SUCCESS;
    }

    /* SrSettlementDetlSecond */
    public String listSrSettlementDetlSecondBySrSettlement() throws Exception {
        SrSettlementSecond second = new SrSettlementSecond();
        second.setPid(this.srSettlement.getId());
        second = (SrSettlementSecond) this.srSettlementDetlSecondService.list(second).get(0);

        SrSettlementDetlSecond param = new SrSettlementDetlSecond();
        param.setPid(second.getId());
        this.result.setList(this.srSettlementDetlSecondService.list(param));
        return SUCCESS;
    }

    public String saveSrSettlementDetlSecond() throws Exception {
        this.result.setObject(
                this.srSettlementDetlSecondService.save(this.srSettlementDetlSecond));
        return SUCCESS;
    }

    public String deleteSrSettlementDetlSecond() throws Exception {
        this.result.setObject(
                this.srSettlementDetlSecondService.delete(this.srSettlementDetlSecond));
        return SUCCESS;
    }

    public String listSrSettlementDetlSecond() throws Exception {
        this.result.setList(
                this.srSettlementDetlSecondService.list(this.srSettlementDetlSecond));
        return SUCCESS;
    }

    // 创建行信息之前，先创建头信息，再将头信息id置入行信息的pid中
    public String createSrSettlementDetlSecond() throws Exception {

        this.srSettlementSecond
                = (SrSettlementSecond) this.srSettlementSecondService
                .save(this.srSettlementSecond);
        this.srSettlementDetlSecond.setPid(this.srSettlementSecond.getId());
        this.srSettlementDetlSecond
                = (SrSettlementDetlSecond) this.srSettlementDetlSecondService
                .save(this.srSettlementDetlSecond);
        Map<String, Object> map = new HashMap();
        map.put("head", this.srSettlement);
        map.put("detail", this.srSettlementDetlSecond);
        this.result.setMap(map);
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

    public void setSbTargetCostService(BaseService sbTargetCostService) {
        this.sbTargetCostService = sbTargetCostService;
    }

    public void setSbTargetCost(SbTargetCost sbTargetCost) {
        this.sbTargetCost = sbTargetCost;
    }

    public void setSbTargetCostSplitService(SbTargetCostSplitService sbTargetCostSplitService) {
        this.sbTargetCostSplitService = sbTargetCostSplitService;
    }

    public BaseService getSbTargetCostService() {
        return sbTargetCostService;
    }

    public SbTargetCost getSbTargetCost() {
        return sbTargetCost;
    }

    public SbTargetCostSplitService getSbTargetCostSplitService() {
        return sbTargetCostSplitService;
    }

    public SbTargetCostSplit getSbTargetCostSplit() {
        return sbTargetCostSplit;
    }

    public void setSbTargetCostSplit(SbTargetCostSplit sbTargetCostSplit) {
        this.sbTargetCostSplit = sbTargetCostSplit;
    }

    public String getOutGoingName() {
        return outGoingName;
    }

    public String getComment() {
        return comment;
    }

    public SbTargetCostAccount getSbTargetCostAccount() {
        return sbTargetCostAccount;
    }

    public void setSbTargetCostAccount(SbTargetCostAccount sbTargetCostAccount) {
        this.sbTargetCostAccount = sbTargetCostAccount;
    }

    public BaseService getSbTargetCostAccountService() {
        return sbTargetCostAccountService;
    }

    public void setSbTargetCostAccountService(BaseService sbTargetCostAccountService) {
        this.sbTargetCostAccountService = sbTargetCostAccountService;
    }

    public void setSrSettlementService(SrSettlementService srSettlementService) {
        this.srSettlementService = srSettlementService;
    }

    public void setSrSettlementDetlFirstService(SrSettlementDetlFirstService srSettlementDetlFirstService) {
        this.srSettlementDetlFirstService = srSettlementDetlFirstService;
    }

    public void setSrSettlementDetlSecondService(SrSettlementDetlSecondService srSettlementDetlSecondService) {
        this.srSettlementDetlSecondService = srSettlementDetlSecondService;
    }

    public void setSrSettlement(SrSettlement srSettlement) {
        this.srSettlement = srSettlement;
    }

    public void setSrSettlementDetlFirst(SrSettlementDetlFirst srSettlementDetlFirst) {
        this.srSettlementDetlFirst = srSettlementDetlFirst;
    }

    public void setSrSettlementDetlSecond(SrSettlementDetlSecond srSettlementDetlSecond) {
        this.srSettlementDetlSecond = srSettlementDetlSecond;
    }

    public void setSrSettlementBalanceService(BaseService srSettlementBalanceService) {
        this.srSettlementBalanceService = srSettlementBalanceService;
    }

    public void setSrSettlementBalance(SrSettlementBalance srSettlementBalance) {
        this.srSettlementBalance = srSettlementBalance;
    }

    public SrSettlementService getSrSettlementService() {
        return srSettlementService;
    }

    public SrSettlementDetlFirstService getSrSettlementDetlFirstService() {
        return srSettlementDetlFirstService;
    }

    public SrSettlementDetlSecondService getSrSettlementDetlSecondService() {
        return srSettlementDetlSecondService;
    }

    public SrSettlement getSrSettlement() {
        return srSettlement;
    }

    public SrSettlementDetlFirst getSrSettlementDetlFirst() {
        return srSettlementDetlFirst;
    }

    public SrSettlementDetlSecond getSrSettlementDetlSecond() {
        return srSettlementDetlSecond;
    }

    public BaseService getSrSettlementBalanceService() {
        return srSettlementBalanceService;
    }

    public SrSettlementBalance getSrSettlementBalance() {
        return srSettlementBalance;
    }

    public BaseService getSrProjectManagerService() {
        return srProjectManagerService;
    }

    public void setSrProjectManagerService(BaseService srProjectManagerService) {
        this.srProjectManagerService = srProjectManagerService;
    }

    public SrProjectManager getSrProjectManager() {
        return srProjectManager;
    }

    public void setSrProjectManager(SrProjectManager srProjectManager) {
        this.srProjectManager = srProjectManager;
    }

    public BaseService getSrSettlementSecondService() {
        return srSettlementSecondService;
    }

    public void setSrSettlementSecondService(BaseService srSettlementSecondService) {
        this.srSettlementSecondService = srSettlementSecondService;
    }

    public SrSettlementSecond getSrSettlementSecond() {
        return srSettlementSecond;
    }

    public void setSrSettlementSecond(SrSettlementSecond srSettlementSecond) {
        this.srSettlementSecond = srSettlementSecond;
    }
}
