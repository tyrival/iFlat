package com.iflat.xr.service;

import com.iflat.base.service.BaseService;
import com.iflat.xr.bean.SrSettlement;

import java.io.File;
import java.util.Map;

/**
 * Created by tyriv on 2016/8/16.
 */
public interface SrSettlementService extends BaseService {
    void submit(SrSettlement srSettlement) throws Exception;
    Map importExcel(File file, String fileName, String type) throws Exception;
}
