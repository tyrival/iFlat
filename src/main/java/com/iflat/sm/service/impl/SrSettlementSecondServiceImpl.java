package com.iflat.sm.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.SrSettlementBalance;
import com.iflat.sm.bean.SrSettlementDetlSecond;
import com.iflat.sm.bean.SrSettlementSecond;
import com.iflat.sm.service.SrSettlementDetlSecondService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;

import java.util.List;

/**
 * Created by tyriv on 2016/4/15.
 */
public class SrSettlementSecondServiceImpl extends BaseServiceSupport {

    private BaseService srSettlementBalanceService;
    private SrSettlementBalance srSettlementBalance;
    private SrSettlementDetlSecondService srSettlementDetlSecondService;
    /**
     * 创建对象前，生成对象的创建人等属性
     * @throws Exception
     */
    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((SrSettlementSecond)this.saveObj).setCreatorAcc(userInfoVo.getAccount());
        ((SrSettlementSecond)this.saveObj).setCreatorName(userInfoVo.getUserName());
    }

    @Override
    protected void beforeSave() throws Exception {

        // 获取原始部门余额，看是否足以支付此次分配
        SrSettlementSecond srSettlementSecond = (SrSettlementSecond) this.saveObj;
        this.srSettlementBalance.setDeptName(srSettlementSecond.getDeptName());
        List<SrSettlementBalance> list
                = this.srSettlementBalanceService.list(this.srSettlementBalance);
        if (list == null || list.size() == 0) {
            throw new Exception("此部门的结余金额为0");
        }
        srSettlementBalance = list.get(0);

        // 根据id查询此单据，如果存在，则获取原始金额，与修改后的金额相减，差用于修改部门结余金额
        SrSettlementSecond orig = new SrSettlementSecond();
        orig.setId(((SrSettlementSecond) this.saveObj).getId());
        List<SrSettlementSecond> origList = this.list(orig);
        if (origList != null && origList.size() != 0) {
            orig = origList.get(0);
        }
        Double diff = ((SrSettlementSecond) this.saveObj).getSummaryAmount()
                - orig.getSummaryAmount();

        if (srSettlementBalance.getAmount() < diff) {
            throw new Exception("部门结余为" + this.srSettlementBalance.getAmount()
                    + "元，不足以支付此次金额为" + diff
                    + "元的分配，请重新调整。");
        }
        // 修改结余金额
        srSettlementBalance.setAdjustment(-diff);
        this.srSettlementBalanceService.save(srSettlementBalance);
    }

    @Override
    protected void afterDelete() throws Exception {
        SrSettlementDetlSecond param = new SrSettlementDetlSecond();
        param.setPid(((SrSettlementSecond) this.deleteObj).getId());
        this.srSettlementDetlSecondService.delete(param);
    }

    public BaseService getSrSettlementBalanceService() {
        return srSettlementBalanceService;
    }

    public void setSrSettlementBalanceService(BaseService srSettlementBalanceService) {
        this.srSettlementBalanceService = srSettlementBalanceService;
    }

    public SrSettlementBalance getSrSettlementBalance() {
        return srSettlementBalance;
    }

    public void setSrSettlementBalance(SrSettlementBalance srSettlementBalance) {
        this.srSettlementBalance = srSettlementBalance;
    }

    public SrSettlementDetlSecondService getSrSettlementDetlSecondService() {
        return srSettlementDetlSecondService;
    }

    public void setSrSettlementDetlSecondService(SrSettlementDetlSecondService srSettlementDetlSecondService) {
        this.srSettlementDetlSecondService = srSettlementDetlSecondService;
    }
}
