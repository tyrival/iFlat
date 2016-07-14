package com.iflat.hr.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.hr.bean.Credit;
import com.iflat.util.Session;

/**
 * Created by tyriv on 2016/6/21.
 */
public class CreditServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeInsert() throws Exception {
        Credit fine = (Credit) this.saveObj;
        fine.setCreatorDept(Session.getUserInfo().getPorgName());
    }
}
