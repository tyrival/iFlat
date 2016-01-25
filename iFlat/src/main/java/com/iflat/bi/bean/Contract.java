package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class Contract {

    private String id;
    private String projNo;      //工号
    private String owner;       //船东
    private String surveyor;    //船检
    private Date deliveryDate;  //交船日
    private double amount;     //合同价
    private String currency;    //币种
    private double contractRate;  //合同汇率
    private double usd;        //结算美元
    private double actualRate; //实际汇率
    private double cny;        //结算人民币
    private double usdAdd;     //加帐美元
    private double cnyAdd;     //加帐人民币
    private double commissionPct; //佣金比例

    private Date fixed;  // 确定日期
    private int version;  // 版本

    public Date getFixed() {
        return fixed;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
        if(this.version == 0) {
            this.fixed = new Date();
        }
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

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getSurveyor() {
        return surveyor;
    }

    public void setSurveyor(String surveyor) {
        this.surveyor = surveyor;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getContractRate() {
        return contractRate;
    }

    public void setContractRate(double contractRate) {
        this.contractRate = contractRate;
    }

    public double getUsd() {
        return usd;
    }

    public void setUsd(double usd) {
        this.usd = usd;
    }

    public double getActualRate() {
        return actualRate;
    }

    public void setActualRate(double actualRate) {
        this.actualRate = actualRate;
    }

    public double getCny() {
        return cny;
    }

    public void setCny(double cny) {
        this.cny = cny;
    }

    public double getUsdAdd() {
        return usdAdd;
    }

    public void setUsdAdd(double usdAdd) {
        this.usdAdd = usdAdd;
    }

    public double getCnyAdd() {
        return cnyAdd;
    }

    public void setCnyAdd(double cnyAdd) {
        this.cnyAdd = cnyAdd;
    }

    public double getCommissionPct() {
        return commissionPct;
    }

    public void setCommissionPct(double commissionPct) {
        this.commissionPct = commissionPct;
    }
}
