package com.iflat.xr.listener;

import com.iflat.base.service.BaseService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import com.iflat.xr.bean.Discount;
import com.iflat.xr.bean.SrBalance;
import com.iflat.xr.bean.TrSettlement;
import com.iflat.xr.entity.SrStatus;
import com.iflat.xr.entity.TrStatus;
import com.iflat.xr.service.TrSettlementService;
import org.activiti.engine.delegate.DelegateExecution;

import java.util.Date;
import java.util.List;

/**
 * Created by tyriv on 2016/7/2.
 */
public class TrSettlementExecutionHandler extends WorkflowExecutionListener {
    private TrSettlementService trSettlementService;
    private BaseService xrDiscountService;
    private BaseService srBalanceService;

    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_UNSUBMIT);
    }

    public void applyDeptDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_APPLY_DEPT_DIRECTOR_APPROVE);
    }

    public void quotaEstimate(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_QUOTA_ESTIMATE);
    }

    public void supportDeptSettlement(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_SUPPORT_DEPT_SETTLEMENT);
    }


    public void supportDeptDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_SUPPORT_DEPT_DIRECTOR_APPROVE);
    }

    public void constructionDeptSettlement(DelegateExecution execution) throws Exception {

        setStatus(execution, TrStatus.STATUS_CONSTRUCTION_DEPT_SETTLEMENT);
    }

    public void constructionDeptSettlementApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_CONSTRUCTION_DEPT_SETTLEMENT_APPROVE);
    }

    public void hrAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_HR_AUDIT);
    }

    public void hrReAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_HR_REAUDIT);
    }

    public void hrDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_HR_DIRECTOR_APPROVE);
    }

    public void viceManagerApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_VICE_MANAGER_APPROVE);
    }

    public void endEvent(DelegateExecution execution) throws Exception {
        setStatus(execution, TrStatus.STATUS_COMPLETE);
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
        TrSettlement param = new TrSettlement();
        param.setId(id);
        TrSettlement trSettlement
                = (TrSettlement) getTrSettlementService()
                .list(param).get(0);
        if (trSettlement != null) {
            trSettlement.setStatus(status);
            if (TrStatus.STATUS_SUPPORT_DEPT_DIRECTOR_APPROVE.equals(status)) {
                UserInfoVo userInfoVo = Session.getUserInfo();
                trSettlement.setSettFirstAcc(userInfoVo.getAccount());
                trSettlement.setSettFirstName(userInfoVo.getUserName());
            }
            if (TrStatus.STATUS_CONSTRUCTION_DEPT_SETTLEMENT.equals(status)) {
                trSettlement.setSettFirstTime(new Date());
            }
            if (TrStatus.STATUS_HR_AUDIT.equals(status)) {
                // 更新管理费率和开票金额（不含税）
                Discount discount = new Discount();
                discount.setTeam(trSettlement.getTeam());
                List<Discount> list = this.getXrDiscountService().list(discount);
                double amount = 0;
                double rate = 0.06;  // 默认管理费率为6%
                if (list != null && list.size() > 0) {
                    rate = list.get(0).getRate();
                    amount = trSettlement.getAmountSecond() * (1 - rate);
                }
                trSettlement.setDiscountRate(rate);
                trSettlement.setAmountWithDiscount(amount);
                trSettlement.setSettlementTime(new Date());
            }
            if (!trSettlement.getIsOutwork() && TrStatus.STATUS_COMPLETE.equals(status)) {
                trSettlement.setSettlementTime(new Date());
            }

            trSettlement = (TrSettlement) trSettlementService.save(trSettlement);
            if (SrStatus.STATUS_COMPLETE.equals(status)) {
                double diff = trSettlement.getAmountFirst() - trSettlement.getAmountSecond();
                SrBalance balance = new SrBalance();
                balance.setDept(trSettlement.getDept());
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

    private BaseService getSrBalanceService() {
        if (srBalanceService == null) {
            srBalanceService = Application.getSpringContext()
                    .getBean("srBalanceService", BaseService.class);
        }
        return srBalanceService;
    }
    public BaseService getXrDiscountService() {
        if (xrDiscountService == null) {
            xrDiscountService = Application.getSpringContext()
                    .getBean("xrDiscountService", BaseService.class);
        }
        return xrDiscountService;
    }

    private TrSettlementService getTrSettlementService() {
        if (trSettlementService == null) {
            trSettlementService = Application.getSpringContext()
                    .getBean("trSettlementService", TrSettlementService.class);
        }
        return trSettlementService;
    }
}

