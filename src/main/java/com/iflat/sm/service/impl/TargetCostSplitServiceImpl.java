package com.iflat.sm.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.TargetCost;
import com.iflat.sm.bean.TargetCostSplit;
import com.iflat.sm.entity.SbSettlementVo;
import com.iflat.sm.service.SbSettlementVoService;
import com.iflat.sm.service.TargetCostSplitService;

/**
 * Created by tyriv on 2016/3/23.
 */
public class TargetCostSplitServiceImpl extends BaseServiceSupport implements TargetCostSplitService {

    private BaseService targetCostService;
    private SbSettlementVoService sbSettlementVoService;

    @Override
    protected void beforeInsert() throws Exception {
        // 查询此分解项对应的目标成本的余额
        TargetCostSplit sbTargetCostSplit = (TargetCostSplit) this.saveObj;

        Double add = sbTargetCostSplit.getAmount();
        Double remain = getRemainAmount(sbTargetCostSplit);
        // 余额与当前新增项目的比较
        if (add > remain) {
            throw new Exception("新增失败。新增项目的金额为"+ add +"，超过该目标成本科目的余额" + remain);
        }
    }

    @Override
    protected void beforeUpdate() throws Exception {
        // 查询此分解项对应的目标成本的余额
        TargetCostSplit sbTargetCostSplit = (TargetCostSplit) this.saveObj;

        Double adjust = getAdjustAmount(sbTargetCostSplit);
        Double remain = getRemainAmount(sbTargetCostSplit);
        // 余额与当前新增项目的比较
        if (adjust > remain) {
            throw new Exception("调整失败。目标成本调整额度为" + adjust + "， 超过了该部门的余额"  + remain +"，请重新调整。");
        }

        SbSettlementVo sbSettlementVo = new SbSettlementVo();
        sbSettlementVo.setProjNo(sbTargetCostSplit.getProjNo());
        sbSettlementVo.setAccountDetl(sbTargetCostSplit.getCostAccount());

        // 当调整为减金额时，判断此科目已经提交过的申请总额是否仍然小于修改后的金额，小于的话才可以修改科目余额
        Double apply = sbSettlementVoService.getAmountSummary(sbSettlementVo);
        if (adjust < 0 && sbTargetCostSplit.getAmount() < apply) {

            throw new Exception("调整失败。目标成本调整为" + sbTargetCostSplit.getAmount() + "， 小于该科目已有的结算申请的总额" + apply);
        }

    }

    @Override
    protected void beforeDelete() throws Exception {
        TargetCostSplit sbTargetCostSplit = (TargetCostSplit) this.deleteObj;
        // 判断该科目是否已经提交过申请，如果已有申请，则不允许删除
        SbSettlementVo sbSettlementVo = new SbSettlementVo();
        sbSettlementVo.setProjNo(sbTargetCostSplit.getProjNo());
        sbSettlementVo.setAccountDetl(sbTargetCostSplit.getCostAccount());

        if (sbSettlementVoService.getAmountSummary(sbSettlementVo) > 0) {
            throw new Exception("该科目已有结算申请，无法删除。");
        }

    }

    /**
     * 获取目标成本部门余额
     * @param sbTargetCostSplit
     * @return
     * @throws Exception
     */
    private Double getRemainAmount(TargetCostSplit sbTargetCostSplit) throws Exception {
        TargetCost sbTargetCost = new TargetCost();
        sbTargetCost.setProjNo(sbTargetCostSplit.getProjNo());
        sbTargetCost.setDeptName(sbTargetCostSplit.getDeptName());
        sbTargetCost = (TargetCost) targetCostService.list(sbTargetCost).get(0);
        Double amount = sbTargetCost.getAmount();
        Double distribution = sbTargetCost.getDistribution();
        return amount - distribution;
    }

    /**
     * 获取目标成本分解项的调整金额
     * @param sbTargetCostSplit
     * @return
     * @throws Exception
     */
    private Double getAdjustAmount(TargetCostSplit sbTargetCostSplit) throws Exception {
        TargetCostSplit orig = (TargetCostSplit) this.list(sbTargetCostSplit).get(0);
        return sbTargetCostSplit.getAmount() - orig.getAmount();
    }

    public void setTargetCostService(BaseService targetCostService) {
        this.targetCostService = targetCostService;
    }

    public void setSbSettlementVoService(SbSettlementVoService sbSettlementVoService) {
        this.sbSettlementVoService = sbSettlementVoService;
    }
}
