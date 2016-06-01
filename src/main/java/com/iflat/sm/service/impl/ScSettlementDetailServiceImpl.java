package com.iflat.sm.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.ScSettlement;
import com.iflat.sm.bean.ScSettlementDetail;
import com.iflat.sm.bean.TargetCostSplit;
import com.iflat.sm.entity.ScSettlementVo;
import com.iflat.sm.service.BaseSettlementService;
import com.iflat.sm.service.ScSettlementDetailService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;

import java.util.List;

/**
 * Created by tyriv on 2016/3/23.
 */
public class ScSettlementDetailServiceImpl extends BaseServiceSupport implements ScSettlementDetailService {

    private BaseService scSettlementService;
    private BaseService targetCostSplitService;
    private BaseSettlementService scSettlementVoService;

    @Override
    protected void beforeInsert() throws Exception {
        // 判断目标成本余额是否足以支付此申请
        ScSettlementDetail scSettlementDetail = (ScSettlementDetail) this.saveObj;

        Double remain = getRemainAmount(scSettlementDetail);
        if (scSettlementDetail.getAmount() > remain) {
            throw new Exception("新增失败。该科目的余额为 " + remain + ", 不足以提交本次申请，请重新输入。");
        }
    }

    @Override
    protected void beforeUpdate() throws Exception {
        ScSettlementDetail scSettlementDetail = (ScSettlementDetail) this.saveObj;
        // 判断目标成本余额是否足以支付此申请
        Double adjust = getAdjustAmount(scSettlementDetail);
        Double remain = getRemainAmount(scSettlementDetail);
        if (adjust > 0 && adjust > remain) {
            throw new Exception("调整失败。此次调整增加金额为：" + adjust + "，超过该科目的余额 " + remain);
        }

    }

    private Double getRemainAmount(ScSettlementDetail scSettlementDetail) throws Exception {

        // 获取工号
        ScSettlement scSettlement = new ScSettlement();
        scSettlement.setId(scSettlementDetail.getPid());
        scSettlement = (ScSettlement) scSettlementService.list(scSettlement).get(0);

        // 按工号、部门名称和成本科目查询总金额
        TargetCostSplit targetCostSplit = new TargetCostSplit();
        targetCostSplit.setProjNo(scSettlement.getProjNo());
        targetCostSplit.setDeptName(scSettlement.getDeptName());
        targetCostSplit.setCostAccount(scSettlementDetail.getAccount());
        List<TargetCostSplit> list = targetCostSplitService.list(targetCostSplit);
        Double total = Double.valueOf(0);
        if (list == null) {
            throw new Exception("该科目尚未分配目标成本，请先进行目标成本分解。");
        }

        for (int i = 0; i < list.size(); i++) {
            total += list.get(i).getAmount();
        }

        // 根据工号、部门、成本科目查询已经填写过申请的总额
        ScSettlementVo scSettlementVo = new ScSettlementVo();
        scSettlementVo.setProjNo(scSettlement.getProjNo());
        scSettlementVo.setDeptName(scSettlement.getDeptName());
        scSettlementVo.setAccountDetl(scSettlementDetail.getAccount());
        Double spent = scSettlementVoService.getAmountSummary(scSettlementVo);
        return total - spent;
    }

    /**
     * 获取结算申请明细项的调整差额
     * @param scSettlementDetail
     * @return
     * @throws Exception
     */
    private Double getAdjustAmount(ScSettlementDetail scSettlementDetail) throws Exception {
        ScSettlementDetail orig = (ScSettlementDetail) this.list(scSettlementDetail).get(0);
        return scSettlementDetail.getAmount() - orig.getAmount();
    }

    public void setScSettlementService(BaseService scSettlementService) {
        this.scSettlementService = scSettlementService;
    }

    public void setTargetCostSplitService(BaseService targetCostSplitService) {
        this.targetCostSplitService = targetCostSplitService;
    }

    public void setScSettlementVoService(BaseSettlementService scSettlementVoService) {
        this.scSettlementVoService = scSettlementVoService;
    }
}
