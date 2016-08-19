package com.iflat.sm.listener;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SrSettlement;
import com.iflat.sm.bean.SrSettlementDetlFirst;
import com.iflat.sm.bean.SrSettlementDetlSecond;
import com.iflat.sm.bean.SrSettlementSecond;
import com.iflat.sm.entity.SrStatus;
import com.iflat.sm.service.SrSettlementDetlFirstService;
import com.iflat.sm.service.SrSettlementDetlSecondService;
import com.iflat.sm.service.SrSettlementService;
import com.iflat.util.Application;
import com.iflat.util.ArrayUtil;
import com.iflat.workflow.listener.WorkflowExecutionListener;
import org.activiti.engine.delegate.DelegateExecution;
import org.apache.commons.collections.map.HashedMap;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2016/4/12.
 */
public class SrSysExecutionHandler extends WorkflowExecutionListener {

    private SrSettlementService srSettlementService;
    private BaseService srSettlementSecondService;
    private SrSettlementDetlSecondService srSettlementDetlSecondService;
    private SrSettlementDetlFirstService srSettlementDetlFirstService;

    public void submit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_UNSUBMIT);
    }

    public void workshopDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_WORKSHOP_DIRECTOR_APPROVE);
    }

    public void professionalManagerAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_PROFESSIONAL_MANAGER_AUDIT);
    }

    public void projectManagerAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_PROJECT_MANAGER_AUDIT);
    }

    public void businessDivisionDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_BUSINESS_DIVISION_DIRECTOR_APPROVE);
    }

    public void commercialCenterSettlement(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_COMMERCIAL_CENTER_SETTLEMENT);
    }

    public void commercialCenterDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE);
    }

    public void workshopSettlement(DelegateExecution execution) throws Exception {

        /**
         * 查询业务对象，并改写其状态
         */
        String id = (String) execution.getVariable("id");
        SrSettlement srSettlement = new SrSettlement();
        srSettlement.setId(id);
        List<SrSettlement> list
                = (List<SrSettlement>) getSrSettlementService().list(srSettlement);
        if (list != null && list.size() > 0) {
            srSettlement = list.get(0);
            srSettlement.setStatus(SrStatus.STATUS_WORKSHOP_SETTLEMENT);
            srSettlement = (SrSettlement) srSettlementService.save(srSettlement);
        }

        /**
         * 根据一级结算单的相关内容自动生成二级结算单
         */
        boolean hasGenerated = false;
        // 根据srSettlementSecond.pid查询对象
        SrSettlementSecond srSettlementSecond = new SrSettlementSecond(srSettlement);
        List<SrSettlementSecond> srSettlementSecondList
                = getSrSettlementSecondService().list(srSettlementSecond);
        // 如果查询到，则说明已经生成，将此记录查询出来
        if (srSettlementSecondList != null && srSettlementSecondList.size() > 0) {
            srSettlementSecond = srSettlementSecondList.get(0);
            hasGenerated = true;
        } else {
            // 如果未查询到，则插入记录
            srSettlementSecond = (SrSettlementSecond) getSrSettlementSecondService()
                    .save(srSettlementSecond);
        }

        // 获取一级结算单明细列表
        List<SrSettlementDetlFirst> srSettlementDetlFirstList = new ArrayList<>();
        SrSettlementDetlFirst paramFirst = new SrSettlementDetlFirst();
        paramFirst.setPid(srSettlement.getId());
        srSettlementDetlFirstList = getSrSettlementDetlFirstService().list(paramFirst);

        // 如果已经生成，则update明细项，否则新增明细项
        List<SrSettlementDetlSecond> srSettlementDetlSecondList = new ArrayList<>();
        if (hasGenerated) {

            // 获取已有的二级结算单明细
            SrSettlementDetlSecond param = new SrSettlementDetlSecond();
            param.setPid(srSettlementSecond.getId());
            srSettlementDetlSecondList = getSrSettlementDetlSecondService().list(param);

            // 将所有已存在的级结算单明细放入map
            Map<String, SrSettlementDetlSecond> map = new HashedMap();
            for (int i = 0; i < srSettlementDetlSecondList.size(); i++) {
                SrSettlementDetlSecond s = srSettlementDetlSecondList.get(i);
                map.put(s.getId(), s);
            }

            // 遍历一级结算明细，将其中的相关信息注入二级结算单明细
            for (int j = 0; j < srSettlementDetlFirstList.size(); j++) {
                SrSettlementDetlFirst f = srSettlementDetlFirstList.get(j);
                String key = f.getId();
                SrSettlementDetlSecond s = map.get(key);
                s.generateWithDetlFirst(f);
            }

            // 将map转为list，并批量更新
            List<SrSettlementDetlSecond> updateList = ArrayUtil.mapToList(map);
            getSrSettlementDetlSecondService().updateBatch(updateList);

        } else {
            // 如果未生成过，则根据一级结算明细，生成二级结算明细。
            for (int i = 0; i < srSettlementDetlFirstList.size(); i++) {
                SrSettlementDetlFirst first = srSettlementDetlFirstList.get(i);
                SrSettlementDetlSecond second
                        = new SrSettlementDetlSecond(srSettlementSecond, first);
                srSettlementDetlSecondList.add(second);
            }
            getSrSettlementDetlSecondService().insertBatch(srSettlementDetlSecondList);
        }

    }

    public void workshopSettlementApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_WORKSHOP_SETTLEMENT_APPROVE);
    }

    public void businessDivisionAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_BUSINESS_DIVISION_AUDIT);
    }

    public void hrAudit(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_HR_AUDIT);
    }

    public void hrDirectorApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_HR_DIRECTOR_APPROVE);
    }

    public void leaderApprove(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_LEADER_APPROVE);
    }

    public void endEvent(DelegateExecution execution) throws Exception {
        setStatus(execution, SrStatus.STATUS_COMPLETE);
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
        SrSettlement param = new SrSettlement();
        param.setId(id);
        SrSettlement srSettlement
                = (SrSettlement) getSrSettlementService()
                .list(param).get(0);
        if (srSettlement != null) {
            srSettlement.setStatus(status);
            if (status.equals(SrStatus.STATUS_COMMERCIAL_CENTER_DIRECTOR_APPROVE)) {
                srSettlement.setSettleFirstTime(new Date());
            }
            if (status.equals(SrStatus.STATUS_HR_AUDIT)) {
                srSettlement.setSettlementTime(new Date());
            }
            srSettlementService.save(srSettlement);
        }
    }

    private SrSettlementService getSrSettlementService() {
        if (srSettlementService == null) {
            srSettlementService = Application.getSpringContext()
                    .getBean("srSettlementService", SrSettlementService.class);
        }
        return srSettlementService;
    }

    private BaseService getSrSettlementSecondService() {
        if (srSettlementSecondService == null) {
            srSettlementSecondService = Application.getSpringContext()
                    .getBean("srSettlementSecondService", BaseService.class);
        }
        return srSettlementSecondService;
    }

    private SrSettlementDetlSecondService getSrSettlementDetlSecondService() {
        if (srSettlementDetlSecondService == null) {
            srSettlementDetlSecondService
                    = Application.getSpringContext().getBean(
                    "srSettlementDetlSecondService", SrSettlementDetlSecondService.class);
        }
        return srSettlementDetlSecondService;
    }

    private SrSettlementDetlFirstService getSrSettlementDetlFirstService() {
        if (srSettlementDetlFirstService == null) {
            srSettlementDetlFirstService
                    = Application.getSpringContext().getBean(
                    "srSettlementDetlFirstService", SrSettlementDetlFirstService.class);
        }
        return srSettlementDetlFirstService;
    }
}
