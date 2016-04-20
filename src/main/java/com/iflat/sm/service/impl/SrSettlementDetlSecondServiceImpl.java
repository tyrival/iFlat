package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.SrSettlementDetlSecond;
import com.iflat.sm.service.SrSettlementDetlSecondService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;

/**
 * Created by tyriv on 2016/3/23.
 */
public class SrSettlementDetlSecondServiceImpl extends BaseServiceSupport implements SrSettlementDetlSecondService {
    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((SrSettlementDetlSecond)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((SrSettlementDetlSecond)this.saveObj).setCreatorName(userInfoVo.getUserName());
    }

}
