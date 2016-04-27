package com.iflat.sm.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.TargetCost;
import com.iflat.sm.bean.TargetCostSplit;
import com.iflat.sm.entity.SbSettlementVo;
import com.iflat.sm.entity.ScSettlementVo;
import com.iflat.sm.service.BaseSettlementService;
import com.iflat.sm.service.SbSettlementVoService;
import com.iflat.sm.service.ScSettlementVoService;
import com.iflat.sm.service.TargetCostSplitService;
import com.iflat.util.ReflectUtil;

import java.util.List;

/**
 * Created by tyriv on 2016/3/23.
 */
public class TargetCostSplitServiceImpl extends BaseServiceSupport implements TargetCostSplitService {

    private BaseService targetCostService;
    private SbSettlementVoService sbSettlementVoService;
    private ScSettlementVoService scSettlementVoService;

    @Override
    protected void beforeInsert() throws Exception {
        // 查询此分解项对应的目标成本的余额
        TargetCostSplit targetCostSplit = (TargetCostSplit) this.saveObj;

        Double add = targetCostSplit.getAmount();
        Double remain = getRemainAmount(targetCostSplit);
        // 余额与当前新增项目的比较
        if (add > remain) {
            throw new Exception("新增失败。新增项目的金额为"+ add +"，超过该目标成本科目的余额" + remain);
        }
    }

    @Override
    protected void beforeUpdate() throws Exception {
        // 查询此分解项对应的目标成本的余额
        TargetCostSplit targetCostSplit = (TargetCostSplit) this.saveObj;

        Double adjust = getAdjustAmount(targetCostSplit);
        TargetCost targetCost = getTargetCost(targetCostSplit);
        Double remain = targetCost.getAmount() - targetCost.getDistribution();
        // 余额与当前新增项目的比较
        if (adjust > remain) {
            throw new Exception("调整失败。目标成本调整额度为" + adjust + "， 超过了该部门的余额"  + remain +"，请重新调整。");
        }

        // 对调整金额进行校验
        validateAdjustmentWithApplied(targetCost.getType(), targetCostSplit, adjust);
    }

    /**
     * 根据已申请的金额校验调整金额，是否可以进行调整
     * @param type 目标成本类型，造船/钢结构
     * @param targetCostSplit 目标成本分解项目
     * @param adjust 调整额度
     * @throws Exception
     */
    private void validateAdjustmentWithApplied(String type, TargetCostSplit targetCostSplit, Double adjust) throws Exception {

        // 当调整为减金额时，判断此科目已经提交过的申请总额是否仍然小于修改后的金额，小于的话才可以修改科目余额
        Double apply = getAppliedAmount(type, targetCostSplit);
        if (adjust < 0 && targetCostSplit.getAmount() < apply) {
            throw new Exception("调整失败。目标成本调整为" + targetCostSplit.getAmount() + "， 小于该科目已有的结算申请的总额" + apply);
        }
    }

    /**
     * 获取已申请的金额
     * @param type
     * @param targetCostSplit
     * @return
     * @throws Exception
     */
    private Double getAppliedAmount(String type, TargetCostSplit targetCostSplit) throws Exception {

        BaseSettlementService baseSettlementService = null;
        Object param = null;

        switch (type) {
            case "造船":
                baseSettlementService = sbSettlementVoService;
                param = new SbSettlementVo();
                break;
            case "钢结构":
                baseSettlementService = scSettlementVoService;
                param = new ScSettlementVo();
                break;
        }

        ReflectUtil reflectUtil = new ReflectUtil(param);
        reflectUtil.setMethodValue("projNo", targetCostSplit.getProjNo());
        reflectUtil.setMethodValue("accountDetl", targetCostSplit.getCostAccount());

        return baseSettlementService.getAmountSummary(reflectUtil.getObject());
    }

    @Override
    protected void beforeDelete() throws Exception {
        TargetCostSplit targetCostSplit = (TargetCostSplit) this.deleteObj;

        TargetCost targetCost = new TargetCost();
        targetCost.setProjNo(targetCostSplit.getProjNo());
        targetCost.setDeptName(targetCostSplit.getDeptName());
        List<TargetCost> list = targetCostService.list(targetCost);
        String type = "";
        if (list != null && list.size() > 0) {
            type = list.get(0).getType();
        }

        Double apply = getAppliedAmount(type, targetCostSplit);
        if (apply > 0) {
            throw new Exception("该科目已有结算申请，无法删除。");
        }
    }

    /**
     * 获取目标成本部门余额
     * @param targetCostSplit
     * @return
     * @throws Exception
     */
    private Double getRemainAmount(TargetCostSplit targetCostSplit) throws Exception {
        TargetCost targetCost = getTargetCost(targetCostSplit);
        Double amount = targetCost.getAmount();
        Double distribution = targetCost.getDistribution();
        return amount - distribution;
    }

    private TargetCost getTargetCost(TargetCostSplit targetCostSplit) throws Exception {
        TargetCost targetCost = new TargetCost();
        targetCost.setProjNo(targetCostSplit.getProjNo());
        targetCost.setDeptName(targetCostSplit.getDeptName());
        List<TargetCost> list = (List<TargetCost>) targetCostService.list(targetCost);
        if (list != null && list.size() > 0) {
            targetCost = list.get(0);
        }
        return targetCost;
    }

    /**
     * 获取目标成本分解项的调整金额
     * @param targetCostSplit
     * @return
     * @throws Exception
     */
    private Double getAdjustAmount(TargetCostSplit targetCostSplit) throws Exception {
        TargetCostSplit orig = (TargetCostSplit) this.list(targetCostSplit).get(0);
        return targetCostSplit.getAmount() - orig.getAmount();
    }

    public void setTargetCostService(BaseService targetCostService) {
        this.targetCostService = targetCostService;
    }

    public void setSbSettlementVoService(SbSettlementVoService sbSettlementVoService) {
        this.sbSettlementVoService = sbSettlementVoService;
    }

    public void setScSettlementVoService(ScSettlementVoService scSettlementVoService) {
        this.scSettlementVoService = scSettlementVoService;
    }
}
