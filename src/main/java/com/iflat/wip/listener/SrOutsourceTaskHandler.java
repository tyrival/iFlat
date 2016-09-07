package com.iflat.wip.listener;

import com.iflat.base.service.BaseService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.wip.bean.SrOutsource;
import com.iflat.wip.service.SrOutsourceService;
import com.iflat.workflow.listener.WorkflowTaskListener;
import com.iflat.sm.bean.SrProjectManager;
import com.iflat.wip.entity.SrOsStatus;
import org.activiti.engine.delegate.DelegateTask;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tyriv on 2016/7/2.
 */
public class SrOutsourceTaskHandler extends WorkflowTaskListener {

    public void submit(DelegateTask delegateTask) throws Exception {
        setTaskInfo(delegateTask, SrOsStatus.STATUS_UNSUBMIT);
    }

    public void projectManagerApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_PROJECT_MANAGER_APPROVE);

        SrProjectManager srProjectMgr = new SrProjectManager();
        String projNo = (String) delegateTask.getVariable("projNo");
        srProjectMgr.setProjNo(projNo);
        List<SrProjectManager> list = getSrProjectManagerService().list(srProjectMgr);
        if (list == null || list.size() == 0) {
            throw new Exception("未找到此工程的总管，请联系修船事业部相关人员，在“工程结算-基础数据-修船总管”中定义");
        }
        delegateTask.addCandidateUsers(getSrProjectManagers(list));
    }

    private List<String> getSrProjectManagers(List<SrProjectManager> list) {
        List<String> candidate = new ArrayList<>();
        if (list != null && list.size() != 0) {
            for (int i = 0; i < list.size(); i++) {
                candidate.add(list.get(i).getAccount());
            }
        }
        return candidate;
    }

    public void outsourceChiefReceipt(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_OUTSOURCE_CHIEF_RECEIPT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船事业部");
        assignee.setRoleName("修船外协科科长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void bidding(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_BIDDING);

        String account = (String) delegateTask.getVariable("operatorAcc");
        delegateTask.setAssignee(account);
    }

    public void salesmanAudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_SALESMAN_AUDIT);

        String account = (String) delegateTask.getVariable("saleAcc");
        delegateTask.setAssignee(account);
    }

    public void contractHandle(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_CONTRACT_HANDLE);

        String account = (String) delegateTask.getVariable("operatorAcc");
        delegateTask.setAssignee(account);
    }

    public void outsourceChiefAudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_OUTSOURCE_CHIEF_AUDIT);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船事业部");
        assignee.setRoleName("修船外协科科长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void businessDivisionDirectorApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);

        // 通过CandidateUsers配置多个经营结算员
        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船事业部");
        assignee.setRoleName("修船事业部部长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void manufacture(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_MANUFACTURE);

        String account = (String) delegateTask.getVariable("operatorAcc");
        delegateTask.setAssignee(account);
    }

    public void professionalManagerConfirm(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_PROFESSIONAL_MANAGER_CONFIRM);

        String account = (String) delegateTask.getVariable("creatorAcc");
        delegateTask.setAssignee(account);
    }

    public void inspectChiefHandle(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_INSPECT_CHIEF_HANDLE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船事业部");
        assignee.setRoleName("修船技术质量科科长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void inspect(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_INSPECT);

        String account = (String) delegateTask.getVariable("qcAcc");
        delegateTask.setAssignee(account);
    }

    public void settlement(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_SETTLEMENT);

        String account = (String) delegateTask.getVariable("operatorAcc");
        delegateTask.setAssignee(account);
    }

    public void settlementApprove(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_SETTLEMENT_APPROVE);

        UserInfoVo assignee = new UserInfoVo();
        assignee.setPorgName("修船事业部");
        assignee.setRoleName("修船外协科科长");
        List<UserInfoVo> list = listAssignees(assignee);
        delegateTask.addCandidateUsers(getCandidateUsers(list));
    }

    public void salesmanReaudit(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_SALESMAN_REAUDIT);

        String account = (String) delegateTask.getVariable("saleAcc");
        delegateTask.setAssignee(account);
    }

    public void projectManagerAssess(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_PROJECT_MANAGER_ASSESS);

        SrProjectManager srProjectMgr = new SrProjectManager();
        String projNo = (String) delegateTask.getVariable("projNo");
        srProjectMgr.setProjNo(projNo);
        List<SrProjectManager> list = getSrProjectManagerService().list(srProjectMgr);
        if (list == null || list.size() == 0) {
            throw new Exception("未找到此工程的总管，请联系修船事业部相关人员，在“工程结算-基础数据-修船总管”中定义");
        }
        delegateTask.addCandidateUsers(getSrProjectManagers(list));
    }

    public void professionalManagerAssess(DelegateTask delegateTask) throws Exception {

        setTaskInfo(delegateTask, SrOsStatus.STATUS_PROFESSIONAL_MANAGER_ASSESS);

        String account = (String) delegateTask.getVariable("creatorAcc");
        delegateTask.setAssignee(account);
    }

    /**
     * 设置任务的名称和描述
     */
    private void setTaskInfo(DelegateTask delegateTask, String status) throws Exception {

        this.setTaskInfo(delegateTask, SrOsStatus.TASK_NAME, getDescription(delegateTask) + "[" + status + "]");
    }

    private static String DESCRIPTION;
    public String getDescription(DelegateTask delegateTask) throws Exception {
        if (DESCRIPTION == null || "".equals(DESCRIPTION)) {
            String id = (String) delegateTask.getVariable("id");
            SrOutsource srOutsource = new SrOutsource();
            srOutsource.setId(id);
            srOutsource = (SrOutsource) getSrOutsourceService().list(srOutsource).get(0);
            DESCRIPTION = srOutsource.getProjName() + "，施工部门：" + srOutsource.getDept() + " ";
        }
        return DESCRIPTION;
    }

    private SrOutsourceService srOutsourceService;
    public SrOutsourceService getSrOutsourceService() {
        if (srOutsourceService == null) {
            srOutsourceService = Application.getSpringContext()
                    .getBean("srOutsourceService", SrOutsourceService.class);
        }
        return srOutsourceService;
    }

    private BaseService srProjectManagerService;
    private BaseService getSrProjectManagerService() {
        if (srProjectManagerService == null) {
            srProjectManagerService = Application.getSpringContext()
                    .getBean("srProjectManagerService", BaseService.class);
        }
        return srProjectManagerService;
    }
}
