package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.entity.ScSettlementVo;
import com.iflat.sm.service.ScSettlementVoService;

import java.util.List;

/**
 * Created by tyriv on 2016/4/26.
 */
public class ScSettlementVoServiceImpl extends BaseServiceSupport implements ScSettlementVoService {

    @Override
    public Double getAmountSummary(Object scSettlementVo) throws Exception {
        List<ScSettlementVo> list = this.list(scSettlementVo);
        Double amount = Double.valueOf(0);
        for (int i = 0; i < list.size(); i++) {
            amount += list.get(i).getAmountDetl();
        }
        return amount;
    }
}