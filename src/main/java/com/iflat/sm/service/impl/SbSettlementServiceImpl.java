package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.SbSettlement;
import com.iflat.sm.service.SbSettlementService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.UserService;
import com.iflat.util.Session;
import com.iflat.workflow.service.WorkflowService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2016/3/23.
 */
public class SbSettlementServiceImpl extends BaseServiceSupport implements SbSettlementService {

    private WorkflowService workflowService;

    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((SbSettlement)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((SbSettlement)this.saveObj).setCreatorName(userInfoVo.getUserName());
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
        if (!"未提交".equals(((SbSettlement) this.deleteObj).getStatus())) {
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
     * @param sbSettlement
     * @throws Exception
     */
    @Override
    public void submit(SbSettlement sbSettlement) throws Exception {

        if (!"未提交".equals(sbSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(sbSettlement));
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }
}
