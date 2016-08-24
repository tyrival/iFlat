package com.iflat.xr.service;

import com.iflat.base.service.BaseService;
import com.iflat.xr.bean.SrSettlement;
import com.iflat.xr.bean.TrSettlement;

import java.io.File;
import java.util.Map;

/**
 * Created by tyriv on 2016/8/16.
 */
public interface TrSettlementService extends BaseService {
    void submit(TrSettlement trSettlement) throws Exception;
    Map importExcel(File file, String fileName, String type) throws Exception;
}
