package com.iflat.xr.entity;

import com.iflat.util.code.CodeUtil;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/26.
 */
public class LaborExpense {
    private String projNo;
    private String projName;
    private String deptCode;
    private String dept;
    private String teamCode;
    private String team;
    private double amountFirst;
    private double amountSecond;
    private double amountDiff;
    private double amountRating;
    private double amountWithDiscount;
    private Date settlementTime;
    private String status;
    private Date createTime;

    private Date fromDate;
    private Date toDate;

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

    public double getAmountWithDiscount() {
        return amountWithDiscount;
    }

    public void setAmountWithDiscount(double amountWithDiscount) {
        this.amountWithDiscount = amountWithDiscount;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getProjName() {
        return projName;
    }

    public void setProjName(String projName) {
        this.projName = projName;
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
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

    public double getAmountFirst() {
        return amountFirst;
    }

    public void setAmountFirst(double amountFirst) {
        this.amountFirst = amountFirst;
        setAmountDiff();
        setAmountRating();
    }

    public double getAmountSecond() {
        return amountSecond;
    }

    public void setAmountSecond(double amountSecond) {
        this.amountSecond = amountSecond;
        setAmountDiff();
        setAmountRating();
    }

    public double getAmountDiff() {
        return amountDiff;
    }

    private void setAmountDiff() {
        this.amountDiff = amountFirst - amountSecond;
    }

    public double getAmountRating() {
        return amountRating;
    }

    private void setAmountRating() {
        this.amountRating = amountSecond / amountFirst;
    }

    public Date getSettlementTime() {
        return settlementTime;
    }

    public void setSettlementTime(Date settlementTime) {
        this.settlementTime = settlementTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
