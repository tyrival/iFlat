package com.iflat.sm.service;

import com.iflat.sm.entity.SbSettlementVo;

/**
 * Created by tyriv on 2016/4/5.
 */
public interface SbSettlementVoService {

    Double getAmountSummary(SbSettlementVo sbSettlementVo) throws Exception;
}
