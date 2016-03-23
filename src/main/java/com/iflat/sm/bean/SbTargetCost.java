package com.iflat.sm.bean;

/**
 * Created by tyriv on 2016/3/21.
 */
public class SbTargetCost {

    private String id;
    private String projNo;
    private String deptName;
    private double amount;

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
}
