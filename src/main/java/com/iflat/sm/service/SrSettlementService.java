package com.iflat.sm.service;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SrSettlement;

/**
 * Created by tyriv on 2016/4/8.
 */
public interface SrSettlementService extends BaseService {
    void submit(SrSettlement srSettlement) throws Exception;
}
