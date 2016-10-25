package com.iflat.wip.listener;

import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.Session;
import com.iflat.wip.bean.SrOutsource;
import com.iflat.wip.service.SrOutsourceService;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import com.iflat.wip.entity.SrOsStatus;
import org.activiti.engine.delegate.DelegateExecution;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/2.
 */
public class SrOutsourceExecutionHandler extends WorkflowExecutionListener {

    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_UNSUBMIT);
    }

    public void projectManagerApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_PROJECT_MANAGER_APPROVE);
    }

    public void bidding(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_BIDDING);
    }

    public void salesmanAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_SALESMAN_AUDIT);
    }

    public void contractHandle(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_CONTRACT_HANDLE);
    }

    public void outsourceChiefReceipt(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_OUTSOURCE_CHIEF_RECEIPT);
    }

    public void outsourceChiefAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_OUTSOURCE_CHIEF_AUDIT);
    }

    public void businessDivisionDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);
    }

    public void manufacture(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_MANUFACTURE);
    }

    public void professionalManagerConfirm(DelegateExecution execution) throws Exception {

        setStatus(execution, SrOsStatus.STATUS_PROFESSIONAL_MANAGER_CONFIRM);
    }

    public void inspectChiefHandle(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_INSPECT_CHIEF_HANDLE);
    }

    public void inspect(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_INSPECT);
    }

    public void settlement(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_SETTLEMENT);
    }

    public void settlementApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_SETTLEMENT_APPROVE);
    }

    public void salesmanReaudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_SALESMAN_REAUDIT);
    }

    public void projectManagerAssess(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_PROJECT_MANAGER_ASSESS);
    }

    public void professionalManagerAssess(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_PROFESSIONAL_MANAGER_ASSESS);
    }

    public void endEvent(DelegateExecution execution) throws Exception {
        setStatus(execution, SrOsStatus.STATUS_COMPLETE);
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
        SrOutsource param = new SrOutsource();
        param.setId(id);
        SrOutsource srOutsource
                = (SrOutsource) getSrOutsourceService()
                .list(param).get(0);
        if (srOutsource != null) {
            srOutsource.setStatus(status);
            /*if (SrOsStatus.STATUS_OUTSOURCE_CHIEF_RECEIPT.equals(status)) {
                UserInfoVo userInfoVo = Session.getUserInfo();
                srOutsource.setAuditorAcc(userInfoVo.getAccount());
                srOutsource.setAuditorName(userInfoVo.getUserName());
            }
            if (SrOsStatus.STATUS_BIDDING.equals(status)) {
                UserInfoVo userInfoVo = Session.getUserInfo();
                srOutsource.setSignorAcc(userInfoVo.getAccount());
                srOutsource.setSignorName(userInfoVo.getUserName());
            }
            if (SrOsStatus.STATUS_MANUFACTURE.equals(status)) {
                UserInfoVo userInfoVo = Session.getUserInfo();
                srOutsource.setBdDirectorAcc(userInfoVo.getAccount());
                srOutsource.setBdDirectorName(userInfoVo.getUserName());
            }*/
            if (SrOsStatus.STATUS_COMPLETE.equals(status)) {
                srOutsource.setCompleteTime(new Date());
            }
            srOutsource = (SrOutsource) getSrOutsourceService().save(srOutsource);
        }
    }

    private SrOutsourceService srOutsourceService;
    public SrOutsourceService getSrOutsourceService() {
        if (srOutsourceService == null) {
            srOutsourceService = Application.getSpringContext()
                    .getBean("srOutsourceService", SrOutsourceService.class);
        }
        return srOutsourceService;
    }

}

