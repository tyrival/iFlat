package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.SrSettlement;
import com.iflat.sm.bean.SrSettlementDetlFirst;
import com.iflat.sm.service.SrSettlementDetlFirstService;
import com.iflat.sm.service.SrSettlementService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.ReflectUtil;
import com.iflat.util.Session;
import com.iflat.workflow.service.WorkflowService;

/**
 * Created by tyriv on 2016/3/23.
 */
public class SrSettlementServiceImpl extends BaseServiceSupport implements SrSettlementService {

    private WorkflowService workflowService;
    private SrSettlementDetlFirstService srSettlementDetlFirstService;

    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((SrSettlement)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((SrSettlement)this.saveObj).setCreatorName(userInfoVo.getUserName());
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
    protected void generateProcessKey() {
        super.generateProcessKey();
        this.processKey += ((SrSettlement) this.processObj).getType();
    }

    @Override
    protected void beforeStartProcess() throws Exception {
        // 将工号置入流程变量，用于后续查询修船总管
        processMap.put("projNo", reflectProcessObj.getMethodValue("projNo").toString());
        processMap.put("deptName", reflectProcessObj.getMethodValue("deptName").toString());

        // 零星工程和机电修理需要选择主修审核，所以将主修账号放入流程变量
        String professionalMgrAcc = reflectProcessObj.getMethodValue("professionalMgrAcc").toString();
        if (professionalMgrAcc != null && !"".equals(professionalMgrAcc)) {
            processMap.put("professionalMgrAcc", professionalMgrAcc);
        }
    }

    @Override
    protected void beforeDelete() throws Exception {
        if (!"未提交".equals(((SrSettlement) this.deleteObj).getStatus())) {
            throw new Exception("无法删除已提交的数据");
        }
    }

    /**
     * 删除对象时，删除流程实例
     * @throws Exception
     */
    @Override
    protected void afterDelete() throws Exception {
        // 删除明细项
        SrSettlementDetlFirst param = new SrSettlementDetlFirst();
        param.setPid(((SrSettlement) this.deleteObj).getId());
        this.srSettlementDetlFirstService.delete(param);
        // 删除流程实例
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param srSettlement
     * @throws Exception
     */
    @Override
    public void submit(SrSettlement srSettlement) throws Exception {

        SrSettlement param = new SrSettlement();
        param.setId(srSettlement.getId());
        srSettlement = (SrSettlement) list(srSettlement).get(0);
        if (!"未提交".equals(srSettlement.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(srSettlement));
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @Override
    public WorkflowService getWorkflowService() {
        return workflowService;
    }

    public SrSettlementDetlFirstService getSrSettlementDetlFirstService() {
        return srSettlementDetlFirstService;
    }

    public void setSrSettlementDetlFirstService(SrSettlementDetlFirstService srSettlementDetlFirstService) {
        this.srSettlementDetlFirstService = srSettlementDetlFirstService;
    }
}
