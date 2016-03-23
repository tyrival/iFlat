package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/21.
 */
public class SbTargetCostSplit {

    private String id;
    // 类型 0原始 1调整 2结算 可以自动判断，新增一条记录时，如果已经有该科目的目标成本存在，则为调整；一个科目向另一个科目调整，可以采用新增两行记录，一增一减的方式，均为调整类型
    private String type;
    private String projNo;
    private String projName;
    private String deptName;
    private String costAccount;  // 成本科目
    private double amount;  // 金额
    private String creatorAcc;
    private String creatorName;
    private Date createTime;
    private boolean fixed;  // 确认后不可修改，只能进行调整
    private Date fixedTime;

    public SbTargetCostSplit() {
        this.createTime = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getCostAccount() {
        return costAccount;
    }

    public void setCostAccount(String costAccount) {
        this.costAccount = costAccount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
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

    public boolean isFixed() {
        return fixed;
    }

    public void setFixed(boolean fixed) {
        this.fixed = fixed;
    }

    public Date getFixedTime() {
        return fixedTime;
    }

    public void setFixedTime(Date fixedTime) {
        this.fixedTime = fixedTime;
    }
}
