package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.TemporaryDetail;
import com.iflat.sm.service.TemporaryDetailService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/23.
 */
public class TemporaryDetailServiceImpl extends BaseServiceSupport implements TemporaryDetailService {

    @Override
    protected void beforeInsert() throws Exception {
        TemporaryDetail detail = (TemporaryDetail) this.saveObj;
        UserInfoVo user = Session.getUserInfo();
        detail.setCreatorAcc(user.getAccount());
        detail.setCreatorName(user.getUserName());
        detail.setCreateTime(new Date());
    }

}
