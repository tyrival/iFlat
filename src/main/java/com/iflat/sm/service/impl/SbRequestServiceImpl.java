package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.SbRequest;
import com.iflat.util.Session;

/**
 * Created by tyriv on 2016/3/10.
 */
public class SbRequestServiceImpl extends BaseServiceSupport {

    @Override
    public void beforeStartProcess() throws Exception {
        //获取业务对象，并将业务对象中储存的流程状态进行修改
        SbRequest sbRequest = (SbRequest) processObj;
        sbRequest.setStatus(1);
        this.save(sbRequest);

        processMap.put("submitUser", Session.getUserInfo().getAccount());;
    }
}
