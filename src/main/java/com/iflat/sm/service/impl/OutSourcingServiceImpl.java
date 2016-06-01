package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.Outsourcing;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;

/**
 * Created by tyriv on 2016/5/10.
 */
public class OutsourcingServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((Outsourcing)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((Outsourcing)this.saveObj).setCreatorName(userInfoVo.getUserName());
    }
}
