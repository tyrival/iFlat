package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/21.
 */
public class SbTargetCost {

    private String id;
    private String projNo;
    private String projName;
    private String deptName;
    private double amount;
    private double distribution;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

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

    public double getDistribution() {
        return distribution;
    }

    public void setDistribution(double distribution) {
        this.distribution = distribution;
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

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getProjName() {
        return projName;
    }

    public void setProjName(String projName) {
        this.projName = projName;
    }
}
