package com.iflat.xr.listener;

import com.iflat.base.service.BaseService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import com.iflat.xr.bean.Discount;
import com.iflat.xr.bean.SrBalance;
import com.iflat.xr.bean.SrSettlement;
import com.iflat.xr.entity.SrStatus;
import com.iflat.xr.service.SrSettlementService;
import org.activiti.engine.delegate.DelegateExecution;

import java.util.Date;
import java.util.List;

/**
 * Created by tyriv on 2016/7/2.
 */
public class SrSettlementExecutionHandler extends WorkflowExecutionListener {
    private SrSettlementService srSettlementService;
    private BaseService xrDiscountService;
    private BaseService srBalanceService;

    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_UNSUBMIT);
    }

    public void workshopDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_WORKSHOP_DIRECTOR_APPROVE);
    }

    public void quotaEstimate(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_QUOTA_ESTIMATE);
    }

    public void safetyAssess(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_SAFETY_ASSESS);
    }

    public void qualityAssess(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_QUALITY_ASSESS);
    }

    public void projectManagerAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_PROJECT_MANAGER_AUDIT);
    }

    public void businessDivisionDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);
    }

    public void commercialCenterSettlement(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_COMMERCIAL_CENTER_SETTLEMENT);
    }

    public void commercialCenterDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE);
    }

    public void workshopSettlement(DelegateExecution execution) throws Exception {

        setStatus(execution, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);
    }

    public void workshopSettlementApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);
    }

    public void hrAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_HR_AUDIT);
    }

    public void hrReAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_HR_REAUDIT);
    }

    public void hrDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_HR_DIRECTOR_APPROVE);
    }

    public void viceManagerApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_VICE_MANAGER_APPROVE);
    }

    public void endEvent(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_COMPLETE);
    }
    /**
     * 为流程相关的业务对象设置状态
     * @param execution
     * @param status
     * @throws Exception
     */
    private void setStatus(DelegateExecution execution, String status) throws Exception {

        // 获取业务单据id
        String id = (String) execution.getVariable("id");
        // 查询业务对象，并改写其状态
        SrSettlement param = new SrSettlement();
        param.setId(id);
        SrSettlement srSettlement
                = (SrSettlement) getSrSettlementService()
                .list(param).get(0);
        if (srSettlement != null) {
            srSettlement.setStatus(status);
            if (SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE.equals(status)) {
                UserInfoVo userInfoVo = Session.getUserInfo();
                srSettlement.setSettFirstAcc(userInfoVo.getAccount());
                srSettlement.setSettFirstName(userInfoVo.getUserName());
            }
            if (SrStatus.STATUS_WORKSHOP_SETTLEMENT.equals(status)) {
                srSettlement.setSettFirstTime(new Date());
            }
            if (SrStatus.STATUS_HR_AUDIT.equals(status)) {
                // 更新管理费率和开票金额（不含税）
                Discount discount = new Discount();
                discount.setTeam(srSettlement.getTeam());
                List<Discount> list = this.getXrDiscountService().list(discount);
                double amount = 0;
                double rate = 0.06;  // 默认管理费率为6%
                if (list != null && list.size() > 0) {
                    rate = list.get(0).getRate();
                    amount = srSettlement.getAmountSecond() * (1 - rate);
                }
                srSettlement.setDiscountRate(rate);
                srSettlement.setAmountWithDiscount(amount);
                srSettlement.setSettlementTime(new Date());
            }
            if (!srSettlement.getIsOutwork() && SrStatus.STATUS_COMPLETE.equals(status)) {
                srSettlement.setSettlementTime(new Date());
            }
            srSettlement = (SrSettlement) srSettlementService.save(srSettlement);
            if (SrStatus.STATUS_COMPLETE.equals(status)) {
                double diff = srSettlement.getAmountFirst() - srSettlement.getAmountSecond();
                SrBalance balance = new SrBalance();
                balance.setDept(srSettlement.getDept());
                List<SrBalance> balanceList = getSrBalanceService().list(balance);
                if (balanceList == null || balanceList.size() == 0) {
                    balance.setAmount(diff);
                    getSrBalanceService().save(balance);
                } else {
                    balance = balanceList.get(0);
                    balance.setAdjustment(diff);
                    getSrBalanceService().save(balance);
                }
            }
        }
    }

    public BaseService getXrDiscountService() {
        if (xrDiscountService == null) {
            xrDiscountService = Application.getSpringContext()
                    .getBean("xrDiscountService", BaseService.class);
        }
        return xrDiscountService;
    }

    private BaseService getSrBalanceService() {
        if (srBalanceService == null) {
            srBalanceService = Application.getSpringContext()
                    .getBean("srBalanceService", BaseService.class);
        }
        return srBalanceService;
    }
    private SrSettlementService getSrSettlementService() {
        if (srSettlementService == null) {
            srSettlementService = Application.getSpringContext()
                    .getBean("xrSrSettlementService", SrSettlementService.class);
        }
        return srSettlementService;
    }
}

