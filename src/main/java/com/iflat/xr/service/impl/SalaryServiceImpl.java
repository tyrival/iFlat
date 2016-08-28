package com.iflat.xr.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.xr.bean.Salary;
import org.springframework.oxm.ValidationFailureException;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class SalaryServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeSave() throws Exception {
        Salary salary = (Salary) this.saveObj;
        salary.setMonth(formatDate(salary.getMonth()));
    }

    @Override
    protected void beforeInsertBatch() throws Exception {
        for (int i = 0; i < insertBatchList.size(); i++) {
            Salary salary = (Salary) this.insertBatchList.get(i);
            salary.setMonth(formatDate(salary.getMonth()));
        }
    }

    @Override
    public void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.xr.bean.Salary");
        String[] props = new String[]{"month", "teamCode", "team", "idCardNo", "name", "bank", "account", "workday", "workHour", "waitHour", "overtimeHour", "hourPrice", "dayPrice", "hourOfDay", "waitSubsidy", "monthPrice", "prepay", "deductionOfCheck", "overtimeAmount", "otherSubsidy", "springFestivalSubsidy", "bonusAmount", "payableAmount", "retentionAmount", "supplementaryAmount", "dinnerAmount", "loanAmount", "fineAmount", "otherDeductAmount", "otherFee", "actualAmount", "comment"};;
        super.getExcelReader().setProps(props);
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            Salary o = (Salary)list.get(i);
            if(o.getMonth() == null) {
                throw new ValidationFailureException("第" + (i + 1) + "行月份为空");
            }
            if(o.getName() == null || o.getName() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行人名为空");
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
