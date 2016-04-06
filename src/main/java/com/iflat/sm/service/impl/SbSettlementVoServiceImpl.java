package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.entity.SbSettlementVo;
import com.iflat.sm.service.SbSettlementVoService;

import java.util.List;

/**
 * Created by tyriv on 2016/4/5.
 */
public class SbSettlementVoServiceImpl extends BaseServiceSupport implements SbSettlementVoService {

    @Override
    public Double getAmountSummary(SbSettlementVo sbSettlementVo) throws Exception {
        List<SbSettlementVo> list = this.list(sbSettlementVo);
        Double amount = Double.valueOf(0);
        for (int i = 0; i < list.size(); i++) {
            amount += list.get(i).getAmountDetl();
        }
        return amount;
    }
}
