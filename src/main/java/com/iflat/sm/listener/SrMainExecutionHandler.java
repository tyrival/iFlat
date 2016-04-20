package com.iflat.sm.listener;

import com.iflat.sm.bean.SrSettlement;
import com.iflat.sm.entity.SrStatus;
import com.iflat.sm.service.SrSettlementService;
import com.iflat.util.Application;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import org.activiti.engine.delegate.DelegateExecution;

/**
 * Created by tyriv on 2016/4/8.
 */
public class SrMainExecutionHandler extends WorkflowExecutionListener {

    private SrSettlementService srSettlementService;

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
            srSettlementService.save(srSettlement);
        }
    }

    private SrSettlementService getSrSettlementService() {
        if (srSettlementService == null) {
            srSettlementService = Application.getSpringContext()
                    .getBean("srSettlementService", SrSettlementService.class);
        }
        return srSettlementService;
    }
}