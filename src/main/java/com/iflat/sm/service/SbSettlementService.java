package com.iflat.sm.service;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SbSettlement;

/**
 * Created by tyriv on 2016/3/28.
 */
public interface SbSettlementService extends BaseService {

    void submit(SbSettlement sbSettlement) throws Exception;
}
