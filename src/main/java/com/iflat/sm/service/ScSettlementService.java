package com.iflat.sm.service;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.ScSettlement;

/**
 * Created by tyriv on 2016/4/26.
 */
public interface ScSettlementService extends BaseService {
    void submit(ScSettlement scSettlement) throws Exception;
}
