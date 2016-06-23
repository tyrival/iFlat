package com.iflat.sm.listener;

import com.iflat.sm.bean.TecSettlement;
import com.iflat.sm.entity.TecStatus;
import com.iflat.sm.service.TecSettlementService;
import com.iflat.util.Application;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import org.activiti.engine.delegate.DelegateExecution;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/30.
 */
public class TecSettlementExecutionHandler extends WorkflowExecutionListener {

    private TecSettlementService tecSettlementService;

    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, TecStatus.STATUS_UNSUBMIT);
    }

    public void hrAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, TecStatus.STATUS_HR_AUDIT);
    }

    public void hrDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TecStatus.STATUS_HR_DIRECTOR_APPROVE);
    }

    public void leaderApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TecStatus.STATUS_LEADER_APPROVE);
    }

    public void endEvent(DelegateExecution execution) throws Exception {
        setStatus(execution, TecStatus.STATUS_COMPLETE);
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
        TecSettlement param = new TecSettlement();
        param.setId(id);
        TecSettlement tecSettlement
                = (TecSettlement) getTecSettlementService()
                .list(param).get(0);
        if (tecSettlement != null) {
            tecSettlement.setStatus(status);
            if (status.equals(TecStatus.STATUS_HR_AUDIT)) {
                tecSettlement.setSettlementTime(new Date());
            }
            tecSettlementService.save(tecSettlement);
        }
    }

    private TecSettlementService getTecSettlementService() {
        if (tecSettlementService == null) {
            tecSettlementService = Application.getSpringContext()
                    .getBean("tecSettlementService", TecSettlementService.class);
        }
        return tecSettlementService;
    }
}
