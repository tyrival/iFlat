package com.iflat.sm.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.SrSettlementBalance;

import java.util.List;

/**
 * Created by tyriv on 2016/3/23.
 */
public class SrSettlementBalanceServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeSave() throws Exception {

        Double adjustment = ((SrSettlementBalance) this.saveObj).getAdjustment();

        List<SrSettlementBalance> list = this.list(this.saveObj);
        // 获取原始余额，将调整数值置入后，更新数据
        if (list == null || list.size() == 0) {
            this.saveObj = new SrSettlementBalance();
        } else {
            this.saveObj = list.get(0);
        }
        ((SrSettlementBalance) this.saveObj).setAdjustment(adjustment);
    }

}
