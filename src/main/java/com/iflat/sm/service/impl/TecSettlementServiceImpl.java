package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.TecSettlement;
import com.iflat.sm.service.TecSettlementService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.service.WorkflowService;

/**
 * Created by tyriv on 2016/3/23.
 */
public class TecSettlementServiceImpl extends BaseServiceSupport implements TecSettlementService {

    private WorkflowService workflowService;

    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((TecSettlement)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((TecSettlement)this.saveObj).setCreatorName(userInfoVo.getUserName());
    }

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
        if (!"未提交".equals(((TecSettlement) this.deleteObj).getStatus())) {
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
     * @param tecSettlement
     * @throws Exception
     */
    @Override
    public void submit(TecSettlement tecSettlement) throws Exception {

        TecSettlement param = new TecSettlement();
        param.setId(tecSettlement.getId());
        tecSettlement = (TecSettlement) list(tecSettlement).get(0);
        if (!"未提交".equals(tecSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(tecSettlement));
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }
}
