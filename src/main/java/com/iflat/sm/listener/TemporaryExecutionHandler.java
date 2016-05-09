package com.iflat.sm.listener;

import com.iflat.sm.bean.Temporary;
import com.iflat.sm.entity.TempStatus;
import com.iflat.sm.service.TemporaryService;
import com.iflat.util.Application;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import org.activiti.engine.delegate.DelegateExecution;

/**
 * Created by tyriv on 2016/3/30.
 */
public class TemporaryExecutionHandler extends WorkflowExecutionListener {

    private TemporaryService temporaryService;

    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, TempStatus.STATUS_UNSUBMIT);
    }

    public void workshopDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TempStatus.STATUS_WORKSHOP_DIRECTOR_APPROVE);
    }

    public void hrAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, TempStatus.STATUS_HR_AUDIT);
    }

    public void hrDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TempStatus.STATUS_HR_DIRECTOR_APPROVE);
    }

    public void leaderApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, TempStatus.STATUS_LEADER_APPROVE);
    }

    public void endEvent(DelegateExecution execution) throws Exception {
        setStatus(execution, TempStatus.STATUS_COMPLETE);
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
        Temporary param = new Temporary();
        param.setId(id);
        Temporary temporary
                = (Temporary) getTemporaryService()
                .list(param).get(0);
        if (temporary != null) {
            temporary.setStatus(status);
            temporaryService.save(temporary);
        }
    }

    private TemporaryService getTemporaryService() {
        if (temporaryService == null) {
            temporaryService = Application.getSpringContext()
                    .getBean("temporaryService", TemporaryService.class);
        }
        return temporaryService;
    }
}
