package com.iflat.sm.listener;

import com.iflat.sm.bean.SbSettlement;
import com.iflat.sm.entity.SbStatus;
import com.iflat.sm.service.SbSettlementService;
import com.iflat.util.Application;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import org.activiti.engine.delegate.DelegateExecution;

/**
 * Created by tyriv on 2016/3/30.
 */
public class SbSettlementExecutionHandler extends WorkflowExecutionListener {

    private SbSettlementService sbSettlementService;


    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, SbStatus.STATUS_UNSUBMIT);
    }

    public void workshopApprove(DelegateExecution execution)  throws Exception {
        setStatus(execution, SbStatus.STATUS_WORKSHOP_APPROVE);
    }

    public void businessDivisionAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SbStatus.STATUS_BUSINESS_DIVISION_AUDIT);
    }

    public void businessDivisionDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SbStatus.STATUS_BUSINESS_DIVITION_DIRECTOR_APPROVE);
    }

    public void hrAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SbStatus.STATUS_HR_AUDIT);
    }

    public void hrDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SbStatus.STATUS_HR_DIRECTOR_APPROVE);
    }

    public void leaderApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SbStatus.STATUS_LEADER_APPROVE);
    }

    public void endEvent(DelegateExecution execution) throws Exception {
        setStatus(execution, SbStatus.STATUS_COMPLETE);
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
        SbSettlement param = new SbSettlement();
        param.setId(id);
        SbSettlement sbSettlement
                = (SbSettlement) getSbSettlementService()
                .list(param).get(0);
        if (sbSettlement != null) {
            sbSettlement.setStatus(status);
            sbSettlementService.save(sbSettlement);
        }
    }

    private SbSettlementService getSbSettlementService() {
        if (sbSettlementService == null) {
            sbSettlementService = Application.getSpringContext()
                    .getBean("sbSettlementService", SbSettlementService.class);
        }
        return sbSettlementService;
    }
}
