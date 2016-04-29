package com.iflat.sm.service;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.TecSettlement;

/**
 * Created by tyriv on 2016/3/28.
 */
public interface TecSettlementService extends BaseService {

    void submit(TecSettlement tecSettlement) throws Exception;
}
