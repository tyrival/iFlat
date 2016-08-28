package com.iflat.report.bean.cst.cmp;

import com.iflat.util.DateUtil;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by tyriv on 2016/8/25.
 */
public class DeptTeamExpense {

    private String projNo;
    private String projName;
    private String deptCode;
    private String dept;
    private String teamCode;
    private String team;
    private double amountFirst;
    private double amountSecond;
    private String status;

    private String month;
    private Date fromDate;
    private Date toDate;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
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
    }

    public double getAmountSecond() {
        return amountSecond;
    }

    public void setAmountSecond(double amountSecond) {
        this.amountSecond = amountSecond;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
}
