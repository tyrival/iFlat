package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.Temporary;
import com.iflat.sm.service.TemporaryService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.service.WorkflowService;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/23.
 */
public class TemporaryServiceImpl extends BaseServiceSupport implements TemporaryService {

    private WorkflowService workflowService;

    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((Temporary)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((Temporary)this.saveObj).setCreatorName(userInfoVo.getUserName());
        ((Temporary) this.saveObj).setCreateTime(new Date());
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
        if (!"未提交".equals(((Temporary) this.deleteObj).getStatus())) {
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
     * @param temporary
     * @throws Exception
     */
    @Override
    public void submit(Temporary temporary) throws Exception {

        Temporary param = new Temporary();
        param.setId(temporary.getId());
        temporary = (Temporary) list(temporary).get(0);
        if (!"未提交".equals(temporary.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(temporary));
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }
}
