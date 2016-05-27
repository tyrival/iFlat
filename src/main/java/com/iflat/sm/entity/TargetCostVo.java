package com.iflat.sm.entity;

/**
 * Created by tyriv on 2016/5/27.
 */
public class TargetCostVo {

    private String type;
    private String projNo;
    private String projName;
    private String costAccount;
    private String costAccountName;
    private double amount;
    private double distribution;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getCostAccount() {
        return costAccount;
    }

    public void setCostAccount(String costAccount) {
        this.costAccount = costAccount;
    }

    public String getCostAccountName() {
        return costAccountName;
    }

    public void setCostAccountName(String costAccountName) {
        this.costAccountName = costAccountName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getDistribution() {
        return distribution;
    }

    public void setDistribution(double distribution) {
        this.distribution = distribution;
    }
}
