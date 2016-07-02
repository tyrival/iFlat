package com.iflat.sm.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.ExcelTemplate;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.*;
import com.iflat.sm.entity.ProjectTargetCostVo;
import com.iflat.sm.entity.TargetCostVo;
import com.iflat.sm.service.*;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.ExcelUtil;
import com.iflat.util.Session;
import com.iflat.workflow.service.WorkflowService;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;
import java.util.*;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SmAction extends BaseAction implements ModelDriven<Page> {

    protected Page page;
    private File upload;
    private String uploadFileName;

    private SbSettlementService sbSettlementService;
    private SbSettlementDetailService sbSettlementDetailService;
    private SbSettlement sbSettlement;
    private SbSettlementDetail sbSettlementDetail;

    private ScSettlementService scSettlementService;
    private ScSettlementDetailService scSettlementDetailService;
    private ScSettlement scSettlement;
    private ScSettlementDetail scSettlementDetail;

    private BaseService projectTargetCostVoService;
    private ProjectTargetCostVo projectTargetCostVo;

    private BaseService targetCostVoService;
    private TargetCostVo targetCostVo;

    private BaseService targetCostService;
    private TargetCost targetCost;
    private BaseService projectTargetCostService;
    private ProjectTargetCost projectTargetCost;
    private TargetCostSplitService targetCostSplitService;
    private TargetCostSplit targetCostSplit;
    private TargetCostAccount targetCostAccount;
    private BaseService targetCostAccountService;

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
    private SrSettlementSecondService srSettlementSecondService;
    private SrSettlementSecond srSettlementSecond;
    private String srtype;

    private TecSettlementService tecSettlementService;
    private TecSettlementDetailService tecSettlementDetailService;
    private TecSettlement tecSettlement;
    private TecSettlementDetail tecSettlementDetail;

    private BaseService subsidyService;
    private Subsidy subsidy;

    private BaseService paymentService;
    private Payment payment;

    private BaseService outsourcingService;
    private Outsourcing outsourcing;

    private BaseService fineService;
    private Fine fine;

    private BaseService discountService;
    private Discount discount;

    private TemporaryService temporaryService;
    private TemporaryDetailService temporaryDetailService;
    private Temporary temporary;
    private TemporaryDetail temporaryDetail;

    private WorkflowService workflowService;
    private String taskId;
    private String outGoingName;
    private String comment;

    private List<SbSettlement> sbSettlementList = new ArrayList<>();
    private List<ScSettlement> scSettlementList = new ArrayList<>();
    private List<SrSettlement> srSettlementList = new ArrayList<>();
    private List<SrSettlementSecond> srSettlementSecondList = new ArrayList<>();
    private List<TecSettlement> tecSettlementList = new ArrayList<>();
    private List<Temporary> temporaryList = new ArrayList<>();

    /* 造船结算 SbSettlement */
    // 创建行信息之前，先创建头信息，再将头信息id置入行信息的pid中
    public String createSbSettlementDetail() throws Exception {

        this.sbSettlement
                = (SbSettlement) this.sbSettlementService
                .save(this.sbSettlement);
        try {

            this.sbSettlementDetail.setPid(this.sbSettlement.getId());
            this.sbSettlementDetail
                    = (SbSettlementDetail) this.sbSettlementDetailService
                    .save(this.sbSettlementDetail);
            Map<String, Object> map = new HashMap();
            map.put("head", this.sbSettlement);
            map.put("detail", this.sbSettlementDetail);
            this.result.setMap(map);

        } catch (Exception e) {
            this.sbSettlementService.delete(this.sbSettlement);
            throw new Exception(e.getMessage());
        }
        return SUCCESS;
    }

    public String approveSbSettlementBatch() throws Exception {
        if (sbSettlementList != null && sbSettlementList.size() > 0) {
            for (int i = 0; i < sbSettlementList.size(); i++) {
                String businessKey = sbSettlementService.getBusinessKey(sbSettlementList.get(i));
                workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
        return SUCCESS;
    }

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

    public String importSbSettlement() throws Exception {
        this.result.setList(this.sbSettlementService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String templateSbSettlement() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("sm", "SbSettlement");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    /* 钢结构结算 ScSettlement */
    // 创建行信息之前，先创建头信息，再将头信息id置入行信息的pid中
    public String createScSettlementDetail() throws Exception {

        this.scSettlement
                = (ScSettlement) this.scSettlementService
                .save(this.scSettlement);
        try {

            this.scSettlementDetail.setPid(this.scSettlement.getId());
            this.scSettlementDetail
                    = (ScSettlementDetail) this.scSettlementDetailService
                    .save(this.scSettlementDetail);
            Map<String, Object> map = new HashMap();
            map.put("head", this.scSettlement);
            map.put("detail", this.scSettlementDetail);
            this.result.setMap(map);

        } catch (Exception e) {
            this.scSettlementService.delete(this.scSettlement);
            throw new Exception(e.getMessage());
        }

        return SUCCESS;
    }

    public String approveScSettlementBatch() throws Exception {
        if (scSettlementList != null && scSettlementList.size() > 0) {
            for (int i = 0; i < scSettlementList.size(); i++) {
                String businessKey = scSettlementService.getBusinessKey(scSettlementList.get(i));
                workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
        return SUCCESS;
    }

    public String approveScSettlement() throws Exception {
        String businessKey = scSettlementService.getBusinessKey(scSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String saveScSettlement() throws Exception {
        this.result.setObject(this.scSettlementService.save(this.scSettlement));
        return SUCCESS;
    }

    public String deleteScSettlement() throws Exception {
        this.result.setObject(this.scSettlementService.delete(this.scSettlement));
        return SUCCESS;
    }

    public String listScSettlement() throws Exception {
        this.result.setList(this.scSettlementService.list(this.scSettlement));
        return SUCCESS;
    }

    public String uploadScSettlement() throws Exception {
        this.result.setObject(this.scSettlementService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listScSettlementComment() throws Exception {
        this.result.setList(this.scSettlementService.listComment(this.scSettlement));
        return SUCCESS;
    }

    public String importScSettlement() throws Exception {
        this.result.setList(this.scSettlementService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String templateScSettlement() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("sm", "ScSettlement");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    /**
     * 提交ScSettlement审批
     * @return
     * @throws Exception
     */
    public String submitScSettlement() throws Exception {
        scSettlementService.submit(this.scSettlement);
        return SUCCESS;
    }

    /**
     * 保存ScSettlement并提交审批
     * @return
     * @throws Exception
     */
    public String saveAndSubmitScSettlement() throws Exception {
        ScSettlement scSettlement
                = (ScSettlement) this.scSettlementService.save(this.scSettlement);
        scSettlementService.submit(this.scSettlement);
        this.result.setObject(scSettlement);
        return SUCCESS;
    }

    /* ScSettlementDetail */
    public String saveScSettlementDetail() throws Exception {
        this.result.setObject(
                this.scSettlementDetailService.save(this.scSettlementDetail));
        return SUCCESS;
    }

    public String deleteScSettlementDetail() throws Exception {
        this.result.setObject(
                this.scSettlementDetailService.delete(this.scSettlementDetail));
        return SUCCESS;
    }

    public String listScSettlementDetail() throws Exception {
        this.result.setList(
                this.scSettlementDetailService.list(this.scSettlementDetail));
        return SUCCESS;
    }

    /* 目标成本科目 TargetCostAccount */
    public String listTargetCostAccount() throws Exception {
        this.result.setList(this.targetCostAccountService.list(this.targetCostAccount));
        return SUCCESS;
    }

    /* 目标成本分解 TargetCost & TargetCostSplit */
    public String templateProjectTargetCost() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("sm", "ProjectTargetCost");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String templateTargetCost() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("sm", "TargetCost");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String templateTargetCostSplit() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("sm", "TargetCostSplit");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importProjectTargetCost() throws Exception {
        this.result.setList(this.projectTargetCostService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String importTargetCost() throws Exception {
        this.result.setList(this.targetCostService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String importTargetCostSplit() throws Exception {
        this.result.setList(this.targetCostSplitService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listTargetCostVo() throws Exception {
        this.result.setList(this.targetCostVoService.list(this.targetCostVo));
        return SUCCESS;
    }

    public String listProjectTargetCostVo() throws Exception {
        this.result.setList(this.projectTargetCostVoService.list(this.projectTargetCostVo));
        return SUCCESS;
    }

    public String uploadProjectTargetCost() throws Exception {
        this.result.setObject(this.projectTargetCostService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String saveProjectTargetCost() throws Exception {
        this.result.setObject(this.projectTargetCostService.save(this.projectTargetCost));
        return SUCCESS;
    }

    public String deleteProjectTargetCost() throws Exception {
        this.result.setObject(this.projectTargetCostService.delete(this.projectTargetCost));
        return SUCCESS;
    }

    public String listProjectTargetCost() throws Exception {
        this.result.setList(this.projectTargetCostService.list(this.projectTargetCost));
        return SUCCESS;
    }

    public String saveTargetCost() throws Exception {
        this.result.setObject(this.targetCostService.save(this.targetCost));
        return SUCCESS;
    }

    public String deleteTargetCost() throws Exception {
        this.result.setObject(this.targetCostService.delete(this.targetCost));
        return SUCCESS;
    }

    public String listTargetCost() throws Exception {
        this.result.setList(this.targetCostService.list(this.targetCost));
        return SUCCESS;
    }

    public String saveTargetCostSplit() throws Exception {
        this.result.setObject(this.targetCostSplitService.save(this.targetCostSplit));
        return SUCCESS;
    }

    public String deleteTargetCostSplit() throws Exception {
        this.result.setObject(this.targetCostSplitService.delete(this.targetCostSplit));
        return SUCCESS;
    }

    public String listTargetCostSplit() throws Exception {
        this.result.setList(this.targetCostSplitService.list(this.targetCostSplit));
        return SUCCESS;
    }

    /* 修船总管 SrProjectManager */
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

    /* 修船结余 SrSettlementBalance */
    public String listSrSettlementBalance() throws Exception {
        this.result.setList(this.srSettlementBalanceService.list(this.srSettlementBalance));
        return SUCCESS;
    }

    /* 修船结算 SrSettlement */
    public String templateSrSettlement() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("sm", "Sr" + this.srtype);
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String approveSrSettlement() throws Exception {
        if ("修船总管审核".equals(srSettlement.getStatus())) {
            this.srSettlementService.save(this.srSettlement);
        }
        String businessKey = srSettlementService.getBusinessKey(srSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String approveSrSettlementBatch() throws Exception {
        if (srSettlementList != null && srSettlementList.size() > 0) {
            for (int i = 0; i < srSettlementList.size(); i++) {
                String businessKey = srSettlementService.getBusinessKey(srSettlementList.get(i));
                 workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
        return SUCCESS;
    }

    public String approveSrSettlementSecondBatch() throws Exception {
        if (srSettlementSecondList != null && srSettlementSecondList.size() > 0) {
            for (int i = 0; i < srSettlementSecondList.size(); i++) {
                SrSettlementSecond o2 = srSettlementSecondList.get(i);
                SrSettlement o1 = new SrSettlement();
                o1.setId(o2.getPid());
                String businessKey = srSettlementService.getBusinessKey(o1);
                 workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
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

            if (adjust != 0) {
                // 根据调整价格，修改相应部门的工费余额
                SrSettlementBalance balance = new SrSettlementBalance();
                balance.setDeptName(orig.getDeptName());
                balance.setAdjustment(adjust);
                this.srSettlementBalanceService.save(balance);
            }

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
        try {

            this.srSettlementDetlFirst.setPid(this.srSettlement.getId());

            this.srSettlementDetlFirst
                    = (SrSettlementDetlFirst) this.srSettlementDetlFirstService
                    .save(this.srSettlementDetlFirst);
            Map<String, Object> map = new HashMap();
            map.put("head", this.srSettlement);
            map.put("detail", this.srSettlementDetlFirst);
            this.result.setMap(map);

        } catch (Exception e) {
            this.srSettlementService.delete(this.srSettlement);
            throw new Exception(e.getMessage());
        }

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
    public String templateSrSettlementSecond() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("sm", "SrSecond");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importSrSettlementSecond() throws Exception {
        this.result.setMap(this.srSettlementSecondService.importExcel(this.upload, this.uploadFileName, this.srSettlementSecond));
        return SUCCESS;
    }

    public String approveSrSettlementSecond() throws Exception {
        //this.srSettlementSecond.setPid(this.srSettlement.getId());
        this.srSettlementSecondService.save(this.srSettlementSecond);

        String businessKey = srSettlementService.getBusinessKey(srSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String saveSrSettlementSecond() throws Exception {
        this.result.setObject(this.srSettlementSecondService.save(this.srSettlementSecond));
        return SUCCESS;
    }

    public String deleteSrSettlementSecond() throws Exception {
        this.srSettlementDetlSecond.setPid(this.srSettlementSecond.getId());
        this.srSettlementDetlSecondService.delete(this.srSettlementDetlSecond);
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
    public String listSrSettlementSecondBySrSettlement() throws Exception {

        List<SrSettlement> list = this.srSettlementService.list(this.srSettlement);
        List<SrSettlementSecond> secondList = new ArrayList<>();
        if (list != null && list.size() != 0) {
            for (int i = 0; i < list.size(); i++) {
                SrSettlementSecond second = new SrSettlementSecond(list.get(i));
                secondList.add(second);
            }
        }
        secondList = this.srSettlementSecondService.listBatch(secondList);
        this.result.setList(secondList);
        return SUCCESS;
    }

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
        try {

            this.srSettlementDetlSecond.setPid(this.srSettlementSecond.getId());
            this.srSettlementDetlSecond
                    = (SrSettlementDetlSecond) this.srSettlementDetlSecondService
                    .save(this.srSettlementDetlSecond);
            Map<String, Object> map = new HashMap();
            map.put("head", this.srSettlementSecond);
            map.put("detail", this.srSettlementDetlSecond);
            this.result.setMap(map);

        } catch (Exception e) {
            this.srSettlementSecondService.delete(this.srSettlementSecond);
            throw new Exception(e.getMessage());
        }
        return SUCCESS;
    }


    /* 技措技改/大修理/108 TecSettlement */
    public String createTecSettlementDetail() throws Exception {

        this.tecSettlement
                = (TecSettlement) this.tecSettlementService
                .save(this.tecSettlement);
        try {

            this.tecSettlementDetail.setPid(this.tecSettlement.getId());
            this.tecSettlementDetail
                    = (TecSettlementDetail) this.tecSettlementDetailService
                    .save(this.tecSettlementDetail);
            Map<String, Object> map = new HashMap();
            map.put("head", this.tecSettlement);
            map.put("detail", this.tecSettlementDetail);
            this.result.setMap(map);

        } catch (Exception e) {
            this.tecSettlementService.delete(this.tecSettlement);
            throw new Exception(e.getMessage());
        }
        return SUCCESS;
    }

    public String approveTecSettlementBatch() throws Exception {
        if (tecSettlementList != null && tecSettlementList.size() > 0) {
            for (int i = 0; i < tecSettlementList.size(); i++) {
                String businessKey = tecSettlementService.getBusinessKey(tecSettlementList.get(i));
                workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
        return SUCCESS;
    }

    public String approveTecSettlement() throws Exception {
        String businessKey = tecSettlementService.getBusinessKey(tecSettlement);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String saveTecSettlement() throws Exception {
        this.result.setObject(this.tecSettlementService.save(this.tecSettlement));
        return SUCCESS;
    }

    public String deleteTecSettlement() throws Exception {
        this.result.setObject(this.tecSettlementService.delete(this.tecSettlement));
        return SUCCESS;
    }

    public String listTecSettlement() throws Exception {
        this.result.setList(this.tecSettlementService.list(this.tecSettlement));
        return SUCCESS;
    }

    public String uploadTecSettlement() throws Exception {
        this.result.setObject(this.tecSettlementService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listTecSettlementComment() throws Exception {
        this.result.setList(this.tecSettlementService.listComment(this.tecSettlement));
        return SUCCESS;
    }

    public String submitTecSettlement() throws Exception {
        tecSettlementService.submit(this.tecSettlement);
        return SUCCESS;
    }

    public String saveAndSubmitTecSettlement() throws Exception {
        TecSettlement tecSettlement
                = (TecSettlement) this.tecSettlementService.save(this.tecSettlement);
        tecSettlementService.submit(this.tecSettlement);
        this.result.setObject(tecSettlement);
        return SUCCESS;
    }

    /* TecSettlementDetail */
    public String saveTecSettlementDetail() throws Exception {
        this.result.setObject(
                this.tecSettlementDetailService.save(this.tecSettlementDetail));
        return SUCCESS;
    }

    public String deleteTecSettlementDetail() throws Exception {
        this.result.setObject(
                this.tecSettlementDetailService.delete(this.tecSettlementDetail));
        return SUCCESS;
    }

    public String listTecSettlementDetail() throws Exception {
        this.result.setList(
                this.tecSettlementDetailService.list(this.tecSettlementDetail));
        return SUCCESS;
    }

    /* Subsidy */
    public String saveSubsidy() throws Exception {
        this.result.setObject(this.subsidyService.save(this.subsidy));
        return SUCCESS;
    }

    public String deleteSubsidy() throws Exception {
        this.result.setObject(this.subsidyService.delete(this.subsidy));
        return SUCCESS;
    }

    public String listSubsidy() throws Exception {
        this.result.setList(this.subsidyService.list(this.subsidy));
        return SUCCESS;
    }

    public String uploadSubsidy() throws Exception {
        this.result.setObject(this.subsidyService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listPageSubsidy() throws Exception {
        this.result.setObject(this.subsidyService.listPage(this.subsidy, this.page));
        return SUCCESS;
    }

    /* Outsourcing */
    public String saveOutsourcing() throws Exception {
        this.result.setObject(this.outsourcingService.save(this.outsourcing));
        return SUCCESS;
    }

    public String deleteOutsourcing() throws Exception {
        this.result.setObject(this.outsourcingService.delete(this.outsourcing));
        return SUCCESS;
    }

    public String listOutsourcing() throws Exception {
        this.result.setList(this.outsourcingService.list(this.outsourcing));
        return SUCCESS;
    }

    public String uploadOutsourcing() throws Exception {
        this.result.setObject(this.outsourcingService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listPageOutsourcing() throws Exception {
        this.result.setObject(this.outsourcingService.listPage(this.outsourcing, this.page));
        return SUCCESS;
    }

    /* Fine */
    public String saveFine() throws Exception {
        this.result.setObject(this.fineService.save(this.fine));
        return SUCCESS;
    }

    public String deleteFine() throws Exception {
        this.result.setObject(this.fineService.delete(this.fine));
        return SUCCESS;
    }

    public String listFine() throws Exception {
        this.result.setList(this.fineService.list(this.fine));
        return SUCCESS;
    }

    public String uploadFine() throws Exception {
        this.result.setObject(this.fineService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listPageFine() throws Exception {
        this.result.setObject(this.fineService.listPage(this.fine, this.page));
        return SUCCESS;
    }

    /* Discount */
    public String saveDiscount() throws Exception {
        this.result.setObject(this.discountService.save(this.discount));
        return SUCCESS;
    }

    public String deleteDiscount() throws Exception {
        this.result.setObject(this.discountService.delete(this.discount));
        return SUCCESS;
    }

    public String listDiscount() throws Exception {
        this.result.setList(this.discountService.list(this.discount));
        return SUCCESS;
    }

    public String uploadDiscount() throws Exception {
        this.result.setObject(this.discountService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listPageDiscount() throws Exception {
        this.result.setObject(this.discountService.listPage(this.discount, this.page));
        return SUCCESS;
    }

    /* Payment */
    public String savePayment() throws Exception {
        this.result.setObject(this.paymentService.save(this.payment));
        return SUCCESS;
    }

    public String deletePayment() throws Exception {
        this.result.setObject(this.paymentService.delete(this.payment));
        return SUCCESS;
    }

    public String listPayment() throws Exception {
        this.result.setList(this.paymentService.list(this.payment));
        return SUCCESS;
    }

    public String uploadPayment() throws Exception {
        this.result.setObject(this.paymentService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listPagePayment() throws Exception {
        this.result.setObject(this.paymentService.listPage(this.payment, this.page));
        return SUCCESS;
    }


    /* 技措技改/大修理/108 Temporary */
    public String createTemporaryDetail() throws Exception {

        this.temporary
                = (Temporary) this.temporaryService
                .save(this.temporary);
        try {

            this.temporaryDetail.setPid(this.temporary.getId());
            this.temporaryDetail
                    = (TemporaryDetail) this.temporaryDetailService
                    .save(this.temporaryDetail);
            Map<String, Object> map = new HashMap();
            map.put("head", this.temporary);
            map.put("detail", this.temporaryDetail);
            this.result.setMap(map);

        } catch (Exception e) {
            this.temporaryService.delete(this.temporary);
            throw new Exception(e.getMessage());
        }

        return SUCCESS;
    }

    public String approveTemporaryBatch() throws Exception {
        if (temporaryList != null && temporaryList.size() > 0) {
            for (int i = 0; i < temporaryList.size(); i++) {
                String businessKey = temporaryService.getBusinessKey(temporaryList.get(i));
                workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
            }
        }
        return SUCCESS;
    }

    public String approveTemporary() throws Exception {
        String businessKey = temporaryService.getBusinessKey(temporary);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String saveTemporary() throws Exception {
        this.result.setObject(this.temporaryService.save(this.temporary));
        return SUCCESS;
    }

    public String deleteTemporary() throws Exception {
        this.result.setObject(this.temporaryService.delete(this.temporary));
        return SUCCESS;
    }

    public String listTemporary() throws Exception {
        this.result.setList(this.temporaryService.list(this.temporary));
        return SUCCESS;
    }

    public String uploadTemporary() throws Exception {
        this.result.setObject(this.temporaryService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listTemporaryComment() throws Exception {
        this.result.setList(this.temporaryService.listComment(this.temporary));
        return SUCCESS;
    }

    public String submitTemporary() throws Exception {
        temporaryService.submit(this.temporary);
        return SUCCESS;
    }

    public String saveAndSubmitTemporary() throws Exception {
        Temporary temporary
                = (Temporary) this.temporaryService.save(this.temporary);
        temporaryService.submit(this.temporary);
        this.result.setObject(temporary);
        return SUCCESS;
    }

    /* TemporaryDetail */
    public String saveTemporaryDetail() throws Exception {
        this.result.setObject(
                this.temporaryDetailService.save(this.temporaryDetail));
        return SUCCESS;
    }

    public String deleteTemporaryDetail() throws Exception {
        this.result.setObject(
                this.temporaryDetailService.delete(this.temporaryDetail));
        return SUCCESS;
    }

    public String listTemporaryDetail() throws Exception {
        this.result.setList(
                this.temporaryDetailService.list(this.temporaryDetail));
        return SUCCESS;
    }







    /* getter & setter */
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

    public void setTargetCostService(BaseService targetCostService) {
        this.targetCostService = targetCostService;
    }

    public void setTargetCost(TargetCost targetCost) {
        this.targetCost = targetCost;
    }

    public void setTargetCostSplitService(TargetCostSplitService targetCostSplitService) {
        this.targetCostSplitService = targetCostSplitService;
    }

    public BaseService getTargetCostService() {
        return targetCostService;
    }

    public TargetCost getTargetCost() {
        return targetCost;
    }

    public TargetCostSplitService getTargetCostSplitService() {
        return targetCostSplitService;
    }

    public TargetCostSplit getTargetCostSplit() {
        return targetCostSplit;
    }

    public void setTargetCostSplit(TargetCostSplit targetCostSplit) {
        this.targetCostSplit = targetCostSplit;
    }

    public String getOutGoingName() {
        return outGoingName;
    }

    public String getComment() {
        return comment;
    }

    public TargetCostAccount getTargetCostAccount() {
        return targetCostAccount;
    }

    public void setTargetCostAccount(TargetCostAccount targetCostAccount) {
        this.targetCostAccount = targetCostAccount;
    }

    public BaseService getTargetCostAccountService() {
        return targetCostAccountService;
    }

    public void setTargetCostAccountService(BaseService targetCostAccountService) {
        this.targetCostAccountService = targetCostAccountService;
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

    public SrSettlementSecondService getSrSettlementSecondService() {
        return srSettlementSecondService;
    }

    public void setSrSettlementSecondService(SrSettlementSecondService srSettlementSecondService) {
        this.srSettlementSecondService = srSettlementSecondService;
    }

    public SrSettlementSecond getSrSettlementSecond() {
        return srSettlementSecond;
    }

    public void setSrSettlementSecond(SrSettlementSecond srSettlementSecond) {
        this.srSettlementSecond = srSettlementSecond;
    }

    public ScSettlementService getScSettlementService() {
        return scSettlementService;
    }

    public void setScSettlementService(ScSettlementService scSettlementService) {
        this.scSettlementService = scSettlementService;
    }

    public ScSettlementDetailService getScSettlementDetailService() {
        return scSettlementDetailService;
    }

    public void setScSettlementDetailService(ScSettlementDetailService scSettlementDetailService) {
        this.scSettlementDetailService = scSettlementDetailService;
    }

    public ScSettlement getScSettlement() {
        return scSettlement;
    }

    public void setScSettlement(ScSettlement scSettlement) {
        this.scSettlement = scSettlement;
    }

    public ScSettlementDetail getScSettlementDetail() {
        return scSettlementDetail;
    }

    public void setScSettlementDetail(ScSettlementDetail scSettlementDetail) {
        this.scSettlementDetail = scSettlementDetail;
    }

    public TecSettlementService getTecSettlementService() {
        return tecSettlementService;
    }

    public void setTecSettlementService(TecSettlementService tecSettlementService) {
        this.tecSettlementService = tecSettlementService;
    }

    public TecSettlementDetailService getTecSettlementDetailService() {
        return tecSettlementDetailService;
    }

    public void setTecSettlementDetailService(TecSettlementDetailService tecSettlementDetailService) {
        this.tecSettlementDetailService = tecSettlementDetailService;
    }

    public TecSettlement getTecSettlement() {
        return tecSettlement;
    }

    public void setTecSettlement(TecSettlement tecSettlement) {
        this.tecSettlement = tecSettlement;
    }

    public TecSettlementDetail getTecSettlementDetail() {
        return tecSettlementDetail;
    }

    public void setTecSettlementDetail(TecSettlementDetail tecSettlementDetail) {
        this.tecSettlementDetail = tecSettlementDetail;
    }

    public BaseService getSubsidyService() {
        return subsidyService;
    }

    public void setSubsidyService(BaseService subsidyService) {
        this.subsidyService = subsidyService;
    }

    public Subsidy getSubsidy() {
        return subsidy;
    }

    public void setSubsidy(Subsidy subsidy) {
        this.subsidy = subsidy;
    }

    public Temporary getTemporary() {
        return temporary;
    }

    public void setTemporary(Temporary temporary) {
        this.temporary = temporary;
    }

    public String getSrtype() {
        return srtype;
    }

    public void setSrtype(String srtype) {
        this.srtype = srtype;
    }

    public BaseService getPaymentService() {
        return paymentService;
    }

    public void setPaymentService(BaseService paymentService) {
        this.paymentService = paymentService;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public BaseService getOutsourcingService() {
        return outsourcingService;
    }

    public void setOutsourcingService(BaseService outsourcingService) {
        this.outsourcingService = outsourcingService;
    }

    public Outsourcing getOutsourcing() {
        return outsourcing;
    }

    public void setOutsourcing(Outsourcing outsourcing) {
        this.outsourcing = outsourcing;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public void setTemporaryService(TemporaryService temporaryService) {
        this.temporaryService = temporaryService;
    }

    public TemporaryService getTemporaryService() {
        return temporaryService;
    }

    public TemporaryDetailService getTemporaryDetailService() {
        return temporaryDetailService;
    }

    public void setTemporaryDetailService(TemporaryDetailService temporaryDetailService) {
        this.temporaryDetailService = temporaryDetailService;
    }

    public TemporaryDetail getTemporaryDetail() {
        return temporaryDetail;
    }

    public void setTemporaryDetail(TemporaryDetail temporaryDetail) {
        this.temporaryDetail = temporaryDetail;
    }

    public BaseService getProjectTargetCostService() {
        return projectTargetCostService;
    }

    public void setProjectTargetCostService(BaseService projectTargetCostService) {
        this.projectTargetCostService = projectTargetCostService;
    }

    public ProjectTargetCost getProjectTargetCost() {
        return projectTargetCost;
    }

    public void setProjectTargetCost(ProjectTargetCost projectTargetCost) {
        this.projectTargetCost = projectTargetCost;
    }

    public BaseService getProjectTargetCostVoService() {
        return projectTargetCostVoService;
    }

    public void setProjectTargetCostVoService(BaseService projectTargetCostVoService) {
        this.projectTargetCostVoService = projectTargetCostVoService;
    }

    public ProjectTargetCostVo getProjectTargetCostVo() {
        return projectTargetCostVo;
    }

    public void setProjectTargetCostVo(ProjectTargetCostVo projectTargetCostVo) {
        this.projectTargetCostVo = projectTargetCostVo;
    }

    public BaseService getTargetCostVoService() {
        return targetCostVoService;
    }

    public void setTargetCostVoService(BaseService targetCostVoService) {
        this.targetCostVoService = targetCostVoService;
    }

    public TargetCostVo getTargetCostVo() {
        return targetCostVo;
    }

    public void setTargetCostVo(TargetCostVo targetCostVo) {
        this.targetCostVo = targetCostVo;
    }

    public List<SbSettlement> getSbSettlementList() {
        return sbSettlementList;
    }

    public void setSbSettlementList(List<SbSettlement> sbSettlementList) {
        this.sbSettlementList = sbSettlementList;
    }

    public List<ScSettlement> getScSettlementList() {
        return scSettlementList;
    }

    public void setScSettlementList(List<ScSettlement> scSettlementList) {
        this.scSettlementList = scSettlementList;
    }

    public List<SrSettlement> getSrSettlementList() {
        return srSettlementList;
    }

    public void setSrSettlementList(List<SrSettlement> srSettlementList) {
        this.srSettlementList = srSettlementList;
    }

    public List<TecSettlement> getTecSettlementList() {
        return tecSettlementList;
    }

    public void setTecSettlementList(List<TecSettlement> tecSettlementList) {
        this.tecSettlementList = tecSettlementList;
    }

    public List<Temporary> getTemporaryList() {
        return temporaryList;
    }

    public void setTemporaryList(List<Temporary> temporaryList) {
        this.temporaryList = temporaryList;
    }

    public List<SrSettlementSecond> getSrSettlementSecondList() {
        return srSettlementSecondList;
    }

    public void setSrSettlementSecondList(List<SrSettlementSecond> srSettlementSecondList) {
        this.srSettlementSecondList = srSettlementSecondList;
    }

    public BaseService getFineService() {
        return fineService;
    }

    public void setFineService(BaseService fineService) {
        this.fineService = fineService;
    }

    public Fine getFine() {
        return fine;
    }

    public void setFine(Fine fine) {
        this.fine = fine;
    }

    public BaseService getDiscountService() {
        return discountService;
    }

    public void setDiscountService(BaseService discountService) {
        this.discountService = discountService;
    }

    public Discount getDiscount() {
        return discount;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    @Override
    public Page getModel() {
        if(page == null){
            page = new Page();
        }
        return page;
    }
}
