package com.iflat.xr.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.xr.bean.SrBalance;

import java.util.List;

public class SrBalanceServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeSave() throws Exception {

        Double adjustment = ((SrBalance) this.saveObj).getAdjustment();

        List<SrBalance> list = this.list(this.saveObj);
        // 获取原始余额，将调整数值置入后，更新数据
        if (list == null || list.size() == 0) {
            this.saveObj = new SrBalance();
        } else {
            this.saveObj = list.get(0);
        }
        ((SrBalance) this.saveObj).setAdjustment(adjustment);
    }

}
