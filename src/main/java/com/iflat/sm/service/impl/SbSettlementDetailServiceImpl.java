package com.iflat.sm.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.SbSettlement;
import com.iflat.sm.bean.SbSettlementDetail;
import com.iflat.sm.bean.TargetCostSplit;
import com.iflat.sm.entity.SbSettlementVo;
import com.iflat.sm.service.BaseSettlementService;
import com.iflat.sm.service.SbSettlementDetailService;

import java.util.List;

/**
 * Created by tyriv on 2016/3/23.
 */
public class SbSettlementDetailServiceImpl extends BaseServiceSupport implements SbSettlementDetailService {

    private BaseService sbSettlementService;
    private BaseService targetCostSplitService;
    private BaseSettlementService sbSettlementVoService;
    @Override
    protected void beforeInsert() throws Exception {
        // 判断目标成本余额是否足以支付此申请
        SbSettlementDetail sbSettlementDetail = (SbSettlementDetail) this.saveObj;

        Double remain = getRemainAmount(sbSettlementDetail);
        if (sbSettlementDetail.getAmount() > remain) {
            throw new Exception("新增失败。该科目的余额为 " + remain + ", 不足以提交本次申请，请重新输入。");
        }
    }

    @Override
    protected void beforeUpdate() throws Exception {
        SbSettlementDetail sbSettlementDetail = (SbSettlementDetail) this.saveObj;
        // 判断目标成本余额是否足以支付此申请
        Double adjust = getAdjustAmount(sbSettlementDetail);
        Double remain = getRemainAmount(sbSettlementDetail);
        if (adjust > 0 && adjust > remain) {
            throw new Exception("调整失败。此次调整增加金额为：" + adjust + "，超过该科目的余额 " + remain);
        }

    }

    private Double getRemainAmount(SbSettlementDetail sbSettlementDetail) throws Exception {

        // 获取工号
        SbSettlement sbSettlement = new SbSettlement();
        sbSettlement.setId(sbSettlementDetail.getPid());
        sbSettlement = (SbSettlement) sbSettlementService.list(sbSettlement).get(0);

        // 按工号、部门名称和成本科目查询总金额
        TargetCostSplit targetCostSplit = new TargetCostSplit();
        targetCostSplit.setProjNo(sbSettlement.getProjNo());
        targetCostSplit.setDeptName(sbSettlement.getDeptName());
        targetCostSplit.setCostAccount(sbSettlementDetail.getAccount());
        List<TargetCostSplit> list = targetCostSplitService.list(targetCostSplit);
        Double total = Double.valueOf(0);
        if (list == null) {
            throw new Exception("该科目尚未分配目标成本，请联系造船事业部结算员，进行目标成本分解。");
        }

        for (int i = 0; i < list.size(); i++) {
            total += list.get(i).getAmount();
        }

        // 根据工号、部门、成本科目查询已经填写过申请的总额
        SbSettlementVo sbSettlementVo = new SbSettlementVo();
        sbSettlementVo.setProjNo(sbSettlement.getProjNo());
        sbSettlementVo.setDeptName(sbSettlement.getDeptName());
        sbSettlementVo.setAccountDetl(sbSettlementDetail.getAccount());
        Double spent = sbSettlementVoService.getAmountSummary(sbSettlementVo);
        return total - spent;
    }

    /**
     * 获取结算申请明细项的调整差额
     * @param sbSettlementDetail
     * @return
     * @throws Exception
     */
    private Double getAdjustAmount(SbSettlementDetail sbSettlementDetail) throws Exception {
        SbSettlementDetail orig = (SbSettlementDetail) this.list(sbSettlementDetail).get(0);
        return sbSettlementDetail.getAmount() - orig.getAmount();
    }

    public void setSbSettlementService(BaseService sbSettlementService) {
        this.sbSettlementService = sbSettlementService;
    }

    public void setTargetCostSplitService(BaseService targetCostSplitService) {
        this.targetCostSplitService = targetCostSplitService;
    }

    public void setSbSettlementVoService(BaseSettlementService sbSettlementVoService) {
        this.sbSettlementVoService = sbSettlementVoService;
    }
}
