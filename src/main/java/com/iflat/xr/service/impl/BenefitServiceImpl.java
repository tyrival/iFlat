package com.iflat.xr.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.xr.bean.Benefit;
import org.springframework.oxm.ValidationFailureException;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class BenefitServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeSave() throws Exception {
        Benefit benefit = (Benefit) this.saveObj;
        benefit.setMonth(formatDate(benefit.getMonth()));
    }

    @Override
    protected void beforeInsertBatch() throws Exception {
        for (int i = 0; i < insertBatchList.size(); i++) {
            Benefit benefit = (Benefit) this.insertBatchList.get(i);
            benefit.setMonth(formatDate(benefit.getMonth()));
        }
    }

    @Override
    public void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.xr.bean.Benefit");
        String[] props = new String[]{"month", "dept", "teamCode", "team", "workday", "manhour", "personNum", "workPersonTime", "waitPersonTime", "casualInPersonTime", "casualOutPersonTime", "salaryPersonNum", "averagePersonNum", "quarterProjectBonus", "waitSubsidy", "springFestivalSubsidy", "springFestivalStable", "dinnerSubsidy", "temperatureSubsidy", "rent", "dinnerSelf", "insurance", "material", "comment"};;
        super.getExcelReader().setProps(props);
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            Benefit o = (Benefit)list.get(i);
            if(o.getMonth() == null) {
                throw new ValidationFailureException("第" + (i + 1) + "行月份为空");
            }
            if(o.getDept() == null || o.getDept() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行部门为空");
            }
            if(o.getTeamCode() == null || o.getTeamCode() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工程队id为空");
            }
            if(o.getTeam() == null || o.getTeam() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工程队名为空");
            }
        }
    }

    private Date formatDate(Date date) {
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        cal.setTime(date);
        cal.set(Calendar.DATE, 1);
        return cal.getTime();
    }
}
