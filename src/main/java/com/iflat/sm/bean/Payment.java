package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/5/4.
 */
public class Payment {

    private String id;
    private String projNo;
    private String projName;
    private String deptCode;
    private String deptName;
    private String team;
    private Date month;
    private double amount;
    private double reduce;
    private double summary;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public Payment() {
        projNo = "F113";
        projName = "费113 劳动保护";
        deptCode = "170";
        deptName = "人力资源部";
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
        setSummary();
    }

    public double getReduce() {
        return reduce;
    }

    public void setReduce(double reduce) {
        this.reduce = reduce;
        setSummary();
    }

    public double getSummary() {
        return summary;
    }

    private void setSummary() {
        this.summary = this.amount - this.reduce;
    }

    public String getCreatorAcc() {
        return creatorAcc;
    }

    public void setCreatorAcc(String creatorAcc) {
        this.creatorAcc = creatorAcc;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
