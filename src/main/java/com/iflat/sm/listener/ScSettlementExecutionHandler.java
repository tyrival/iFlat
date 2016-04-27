package com.iflat.sm.listener;

import com.iflat.sm.bean.ScSettlement;
import com.iflat.sm.entity.ScStatus;
import com.iflat.sm.service.ScSettlementService;
import com.iflat.util.Application;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import org.activiti.engine.delegate.DelegateExecution;

/**
 * Created by tyriv on 2016/4/8.
 */
public class ScSettlementExecutionHandler extends WorkflowExecutionListener {

    private ScSettlementService scSettlementService;

    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, ScStatus.STATUS_UNSUBMIT);
    }

    public void businessDivisionDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, ScStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);
    }

    public void hrAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, ScStatus.STATUS_HR_AUDIT);
    }

    public void hrDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, ScStatus.STATUS_HR_DIRECTOR_APPROVE);
    }

    public void leaderApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, ScStatus.STATUS_LEADER_APPROVE);
    }

    public void endEvent(DelegateExecution execution) throws Exception {
        setStatus(execution, ScStatus.STATUS_COMPLETE);
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
        ScSettlement param = new ScSettlement();
        param.setId(id);
        ScSettlement scSettlement
                = (ScSettlement) getScSettlementService()
                .list(param).get(0);
        if (scSettlement != null) {
            scSettlement.setStatus(status);
            scSettlementService.save(scSettlement);
        }
    }

    private ScSettlementService getScSettlementService() {
        if (scSettlementService == null) {
            scSettlementService = Application.getSpringContext()
                    .getBean("scSettlementService", ScSettlementService.class);
        }
        return scSettlementService;
    }
}
