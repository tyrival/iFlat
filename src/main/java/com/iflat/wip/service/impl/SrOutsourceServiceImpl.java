package com.iflat.wip.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.wip.bean.SrOutsource;
import com.iflat.wip.bean.SrOutsourceDetl;
import com.iflat.wip.entity.SrOsStatus;
import com.iflat.wip.service.SrOutsourceService;
import com.iflat.sm.bean.SrProjectManager;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class SrOutsourceServiceImpl extends BaseServiceSupport implements SrOutsourceService {

    private BaseService srOutsourceDetlService;
    private BaseService srProjectManagerService;

    @Override
    protected void beforeInsert() throws Exception {
        SrOutsource o = (SrOutsource) this.saveObj;
        SrProjectManager mgr = new SrProjectManager();
        mgr.setProjNo(o.getProjNo());
        List list = srProjectManagerService.list(mgr);
        if (list == null || list.size() == 0) {
            throw new Exception("未定义" + o.getProjName() + "的修船总管信息，请联系修船事业部维护人员。");
        }
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
    protected void beforeUpdate() throws Exception {
        SrOutsource o = ((SrOutsource) this.saveObj);
        String status = o.getStatus();
        if (SrOsStatus.STATUS_PROJECT_MANAGER_APPROVE.equals(status)) {
            UserInfoVo userInfoVo = Session.getUserInfo();
            o.setAuditorAcc(userInfoVo.getAccount());
            o.setAuditorName(userInfoVo.getUserName());
        }
        if (SrOsStatus.STATUS_OUTSOURCE_CHIEF_RECEIPT.equals(status)) {
            UserInfoVo userInfoVo = Session.getUserInfo();
            o.setSignorAcc(userInfoVo.getAccount());
            o.setSignorName(userInfoVo.getUserName());
        }
        if (SrOsStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE.equals(status)) {
            UserInfoVo userInfoVo = Session.getUserInfo();
            o.setBdDirectorAcc(userInfoVo.getAccount());
            o.setBdDirectorName(userInfoVo.getUserName());
        }
    }

    @Override
    protected void beforeStartProcess() throws Exception {
        // 将工号置入流程变量，用于后续查询修船总管
        processMap.put("id", reflectProcessObj.getMethodValue("id").toString());
        processMap.put("projNo", reflectProcessObj.getMethodValue("projNo").toString());
        processMap.put("dept", reflectProcessObj.getMethodValue("dept").toString());
        processMap.put("creatorAcc", reflectProcessObj.getMethodValue("creatorAcc").toString());
    }

    @Override
    protected void beforeDelete() throws Exception {
        if (!"未提交".equals(((SrOutsource) this.deleteObj).getStatus())) {
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
        SrOutsourceDetl param = new SrOutsourceDetl();
        param.setPid(((SrOutsource) this.deleteObj).getId());
        this.srOutsourceDetlService.delete(param);
        // 删除流程实例
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param srOutsource
     * @throws Exception
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submit(SrOutsource srOutsource) throws Exception {

        SrOutsource param = new SrOutsource();
        param.setId(srOutsource.getId());
        srOutsource = (SrOutsource) list(srOutsource).get(0);
        if (!"未提交".equals(srOutsource.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }

        getWorkflowService().completeTaskByBusinessKey(this.getBusinessKey(srOutsource));
    }

    public BaseService getSrOutsourceDetlService() {
        return srOutsourceDetlService;
    }

    public void setSrOutsourceDetlService(BaseService srOutsourceDetlService) {
        this.srOutsourceDetlService = srOutsourceDetlService;
    }

    public BaseService getSrProjectManagerService() {
        return srProjectManagerService;
    }

    public void setSrProjectManagerService(BaseService srProjectManagerService) {
        this.srProjectManagerService = srProjectManagerService;
    }
}