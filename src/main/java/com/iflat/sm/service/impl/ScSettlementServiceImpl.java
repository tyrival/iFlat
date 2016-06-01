package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.ScSettlement;
import com.iflat.sm.service.ScSettlementService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.service.WorkflowService;

/**
 * Created by tyriv on 2016/3/23.
 */
public class ScSettlementServiceImpl extends BaseServiceSupport implements ScSettlementService {

    private WorkflowService workflowService;

    /**
     * 创建对象时，启动流程
     * @throws Exception
     */
    @Override
    protected void afterInsert() throws Exception {
        startProcess(this.saveObj);
    }

    @Override
    protected void beforeDelete() throws Exception {
        if (!"未提交".equals(((ScSettlement) this.deleteObj).getStatus())) {
            throw new Exception("无法删除已提交的数据");
        }
    }

    /**
     * 删除对象时，删除流程实例
     * @throws Exception
     */
    @Override
    protected void afterDelete() throws Exception {
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param scSettlement
     * @throws Exception
     */
    @Override
    public void submit(ScSettlement scSettlement) throws Exception {

        ScSettlement param = new ScSettlement();
        param.setId(scSettlement.getId());
        scSettlement = (ScSettlement) list(scSettlement).get(0);
        if (!"未提交".equals(scSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(scSettlement));
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }
}
