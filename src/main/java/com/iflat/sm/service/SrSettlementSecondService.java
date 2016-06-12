package com.iflat.sm.service;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SrSettlementSecond;

import java.io.File;
import java.util.Map;

/**
 * Created by tyriv on 2016/5/5.
 */
public interface SrSettlementSecondService extends BaseService {
    Map importExcel(File file, String fileName, SrSettlementSecond srSettlementSecond) throws Exception;
}
