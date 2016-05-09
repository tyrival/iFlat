package com.iflat.sm.service;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.Temporary;

/**
 * Created by tyriv on 2016/3/28.
 */
public interface TemporaryService extends BaseService {

    void submit(Temporary temporary) throws Exception;
}
