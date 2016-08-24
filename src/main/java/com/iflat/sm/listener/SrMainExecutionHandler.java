package com.iflat.sm.listener;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SrSettlement;
import com.iflat.sm.bean.SrSettlementBalance;
import com.iflat.sm.bean.SrSettlementSecond;
import com.iflat.sm.entity.SrStatus;
import com.iflat.sm.service.SrSettlementSecondService;
import com.iflat.sm.service.SrSettlementService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import org.activiti.engine.delegate.DelegateExecution;

import java.util.Date;
import java.util.List;

/**
 * Created by tyriv on 2016/4/8.
 */
public class SrMainExecutionHandler extends WorkflowExecutionListener {

    private SrSettlementService srSettlementService;
    private SrSettlementSecondService srSettlementSecondService;
    private BaseService srSettlementBalanceService;

    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_UNSUBMIT);
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
        setStatus(execution, SrStatus.STATUS_WORKSHOP_SETTLEMENT);
    }

    public void workshopSettlementApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);
    }

    public void businessDivisionAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_BUSINESS_DIVISION_AUDIT);
    }

    public void hrAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_HR_AUDIT);
    }

    public void hrDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_HR_DIRECTOR_APPROVE);
    }

    public void leaderApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_LEADER_APPROVE);
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
            if (status.equals(SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE)) {
                UserInfoVo userInfoVo = Session.getUserInfo();
                srSettlement.setSettleFirstAcc(userInfoVo.getAccount());
                srSettlement.setSettleFirstName(userInfoVo.getUserName());
            }
            if (status.equals(SrStatus.STATUS_WORKSHOP_SETTLEMENT)) {
                srSettlement.setSettleFirstTime(new Date());
            }
            if (status.equals(SrStatus.STATUS_HR_AUDIT)) {
                srSettlement.setSettlementTime(new Date());
            }
            srSettlement = (SrSettlement) srSettlementService.save(srSettlement);
            if (SrStatus.STATUS_COMPLETE.equals(status)) {
                SrSettlementSecond p = new SrSettlementSecond();
                List<SrSettlementSecond> list = getSrSettlementSecondService().list(p);
                double amount2 = 0;
                if (list != null && list.size() > 0) {
                    for (int i = 0; i < list.size(); i++) {
                        amount2 += list.get(i).getSummaryAmount();
                    }
                }
                double adjust = srSettlement.getSummaryAmount() - amount2;
                SrSettlementBalance balance = new SrSettlementBalance();
                balance.setDeptName(srSettlement.getDeptName());
                List<SrSettlementBalance> balanceList = getSrSettlementBalanceService().list(balance);
                if (balanceList == null || balanceList.size() == 0) {
                    balance.setAmount(adjust);
                    getSrSettlementBalanceService().save(balance);
                } else {
                    balance = balanceList.get(0);
                    balance.setAdjustment(adjust);
                    getSrSettlementBalanceService().save(balance);
                }
            }
        }
    }

    private BaseService getSrSettlementBalanceService() {
        if (srSettlementBalanceService == null) {
            srSettlementBalanceService = Application.getSpringContext()
                    .getBean("srSettlementBalanceService", BaseService.class);
        }
        return srSettlementBalanceService;
    }
    private SrSettlementService getSrSettlementService() {
        if (srSettlementService == null) {
            srSettlementService = Application.getSpringContext()
                    .getBean("srSettlementService", SrSettlementService.class);
        }
        return srSettlementService;
    }
    private SrSettlementSecondService getSrSettlementSecondService() {

        if (srSettlementSecondService == null) {
            srSettlementSecondService = Application.getSpringContext()
                    .getBean("srSettlementSecondService", SrSettlementSecondService.class);
        }
        return srSettlementSecondService;
    }
}