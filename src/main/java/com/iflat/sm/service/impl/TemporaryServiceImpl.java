package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.Temporary;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;

import java.util.Date;

/**
 * Created by tyriv on 2016/5/4.
 */
public class TemporaryServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((Temporary)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((Temporary)this.saveObj).setCreatorName(userInfoVo.getUserName());
        ((Temporary)this.saveObj).setCreateTime(new Date());
    }
}
