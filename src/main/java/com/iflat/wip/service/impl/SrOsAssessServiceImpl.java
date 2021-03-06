package com.iflat.wip.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.util.Session;
import com.iflat.wip.bean.SrOsAssess;

public class SrOsAssessServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeInsert() throws Exception {
        SrOsAssess srOsAssess = (SrOsAssess) this.saveObj;
        srOsAssess.setCreatorRole(Session.getUserInfo().getRoleName());
    }
}
