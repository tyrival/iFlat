package com.iflat.sm.service;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SrSettlement;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2016/4/8.
 */
public interface SrSettlementService extends BaseService {
    void submit(SrSettlement srSettlement) throws Exception;
    Map importExcel(File file, String fileName, String type) throws Exception;
}
