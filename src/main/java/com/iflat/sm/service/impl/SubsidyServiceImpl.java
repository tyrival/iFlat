package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.Subsidy;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;

import java.util.Date;

/**
 * Created by tyriv on 2016/5/3.
 */
public class SubsidyServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((Subsidy)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((Subsidy)this.saveObj).setCreatorName(userInfoVo.getUserName());
        ((Subsidy)this.saveObj).setCreateTime(new Date());
    }

}
