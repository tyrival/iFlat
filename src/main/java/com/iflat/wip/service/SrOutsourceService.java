package com.iflat.wip.service;

import com.iflat.base.service.BaseService;
import com.iflat.wip.bean.SrOutsource;

import java.io.File;
import java.util.Map;

/**
 * Created by tyriv on 2016/9/2.
 */
public interface SrOutsourceService extends BaseService {
    void submit(SrOutsource srOutsource) throws Exception;
    //Map importExcel(File file, String fileName, String type) throws Exception;
}