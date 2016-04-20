package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.SrSettlementDetlFirst;
import com.iflat.sm.service.SrSettlementDetlFirstService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;

/**
 * Created by tyriv on 2016/3/23.
 */
public class SrSettlementDetlFirstServiceImpl extends BaseServiceSupport implements SrSettlementDetlFirstService {
    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((SrSettlementDetlFirst)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((SrSettlementDetlFirst)this.saveObj).setCreatorName(userInfoVo.getUserName());
    }

}
