package com.iflat.xr.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/25.
 */
public class Salary {
    private String id;
    private Date month;
    private String teamCode;
    private String team;
    private String idCardNo;  // 工号
    private String name;
    private String bank;
    private String account;  // 银行账号
    private double workday;  // 出勤天数
    private double workHour;  // 计工工时
    private double waitHour;  // 等工工时
    private double overtimeHour;  // 加班工时
    private double hourPrice;  // 工价-小时
    private double dayPrice;  // 工价-天
    private double hourOfDay;  // 日标准工时
    private double waitSubsidy;  // 等工补助
    private double monthPrice;  // 包月工资
    private double prepay;  // 预付工资
    private double deductionOfCheck;  // 考勤扣款
    private double overtimeAmount;  // 加班工资
    private double otherSubsidy;  // 其他补贴
    private double springFestivalSubsidy;  // 春节补贴
    private double bonusAmount;  // 奖金
    private double payableAmount;  // 应付工资
    private double retentionAmount;  // 缓发工资
    private double supplementaryAmount;  // 补发工资
    private double dinnerAmount;  // 扣伙食费
    private double loanAmount;  // 扣借款
    private double fineAmount;  // 罚款
    private double otherDeductAmount;  // 其他扣款
    private double otherFee;  // 其他费用
    private double actualAmount;  // 实发工资
    private String comment;  // 备注

    private Date fromDate;
    private Date toDate;

    public Salary() {
        this.hourOfDay = 8;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
    }

    public String getTeamCode() {
        return teamCode;
    }

    public void setTeamCode(String teamCode) {
        this.teamCode = teamCode;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getIdCardNo() {
        return idCardNo;
    }

    public void setIdCardNo(String idCardNo) {
        this.idCardNo = idCardNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public double getWorkday() {
        return workday;
    }

    public void setWorkday(double workday) {
        this.workday = workday;
    }

    public double getWorkHour() {
        return workHour;
    }

    public void setWorkHour(double workHour) {
        this.workHour = workHour;
    }

    public double getWaitHour() {
        return waitHour;
    }

    public void setWaitHour(double waitHour) {
        this.waitHour = waitHour;
    }

    public double getOvertimeHour() {
        return overtimeHour;
    }

    public void setOvertimeHour(double overtimeHour) {
        this.overtimeHour = overtimeHour;
    }

    public double getHourPrice() {
        return hourPrice;
    }

    public void setHourPrice(double hourPrice) {
        this.hourPrice = hourPrice;
    }

    public double getDayPrice() {
        return dayPrice;
    }

    public void setDayPrice(double dayPrice) {
        this.dayPrice = dayPrice;
    }

    public double getHourOfDay() {
        return hourOfDay;
    }

    public void setHourOfDay(double hourOfDay) {
        this.hourOfDay = hourOfDay;
    }

    public double getWaitSubsidy() {
        return waitSubsidy;
    }

    public void setWaitSubsidy(double waitSubsidy) {
        this.waitSubsidy = waitSubsidy;
    }

    public double getMonthPrice() {
        return monthPrice;
    }

    public void setMonthPrice(double monthPrice) {
        this.monthPrice = monthPrice;
    }

    public double getPrepay() {
        return prepay;
    }

    public void setPrepay(double prepay) {
        this.prepay = prepay;
    }

    public double getDeductionOfCheck() {
        return deductionOfCheck;
    }

    public void setDeductionOfCheck(double deductionOfCheck) {
        this.deductionOfCheck = deductionOfCheck;
    }

    public double getOvertimeAmount() {
        return overtimeAmount;
    }

    public void setOvertimeAmount(double overtimeAmount) {
        this.overtimeAmount = overtimeAmount;
    }

    public double getOtherSubsidy() {
        return otherSubsidy;
    }

    public void setOtherSubsidy(double otherSubsidy) {
        this.otherSubsidy = otherSubsidy;
    }

    public double getSpringFestivalSubsidy() {
        return springFestivalSubsidy;
    }

    public void setSpringFestivalSubsidy(double springFestivalSubsidy) {
        this.springFestivalSubsidy = springFestivalSubsidy;
    }

    public double getBonusAmount() {
        return bonusAmount;
    }

    public void setBonusAmount(double bonusAmount) {
        this.bonusAmount = bonusAmount;
    }

    public double getPayableAmount() {
        return payableAmount;
    }

    public void setPayableAmount(double payableAmount) {
        this.payableAmount = payableAmount;
    }

    public double getRetentionAmount() {
        return retentionAmount;
    }

    public void setRetentionAmount(double retentionAmount) {
        this.retentionAmount = retentionAmount;
    }

    public double getSupplementaryAmount() {
        return supplementaryAmount;
    }

    public void setSupplementaryAmount(double supplementaryAmount) {
        this.supplementaryAmount = supplementaryAmount;
    }

    public double getDinnerAmount() {
        return dinnerAmount;
    }

    public void setDinnerAmount(double dinnerAmount) {
        this.dinnerAmount = dinnerAmount;
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public double getFineAmount() {
        return fineAmount;
    }

    public void setFineAmount(double fineAmount) {
        this.fineAmount = fineAmount;
    }

    public double getOtherDeductAmount() {
        return otherDeductAmount;
    }

    public void setOtherDeductAmount(double otherDeductAmount) {
        this.otherDeductAmount = otherDeductAmount;
    }

    public double getOtherFee() {
        return otherFee;
    }

    public void setOtherFee(double otherFee) {
        this.otherFee = otherFee;
    }

    public double getActualAmount() {
        return actualAmount;
    }

    public void setActualAmount(double actualAmount) {
        this.actualAmount = actualAmount;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
