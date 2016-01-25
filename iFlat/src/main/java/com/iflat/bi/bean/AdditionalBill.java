package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class AdditionalBill {

    private String id;
    private String projNo;
    private String item;  // 项目
    private double labour;  // 人工
    private double device;  // 设备
    private double material;  // 材料
    private double amount;  // 金额
    private double labourUsd;  // 人工
    private double deviceUsd;  // 设备
    private double materialUsd;  // 材料
    private double amountUsd;  // 金额
    private String comment;  // 备注

    private Date month;  // 月份
    private Date fixed;  // 确定日期
    private int version;  //版本

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
    }

    public Date getFixed() {
        return fixed;
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

    public double getLabour() {
        return labour;
    }

    public void setLabour(double labour) {
        this.labour = labour;
        setAmount();
    }

    public double getDevice() {
        return device;
    }

    public void setDevice(double device) {
        this.device = device;
        setAmount();
    }

    public double getMaterial() {
        return material;
    }

    public void setMaterial(double material) {
        this.material = material;
        setAmount();
    }

    public double getLabourUsd() {
        return labourUsd;
    }

    public void setLabourUsd(double labourUsd) {
        this.labourUsd = labourUsd;
        setAmountUsd();
    }

    public double getDeviceUsd() {
        return deviceUsd;
    }

    public void setDeviceUsd(double deviceUsd) {
        this.deviceUsd = deviceUsd;
        setAmountUsd();
    }

    public double getMaterialUsd() {
        return materialUsd;
    }

    public void setMaterialUsd(double materialUsd) {
        this.materialUsd = materialUsd;
        setAmountUsd();
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public double getAmount() {
        return amount;
    }

    private void setAmount() {
        this.amount = this.labour + this.device + this.material;
    }

    public double getAmountUsd() {
        return amountUsd;
    }

    private void setAmountUsd() {
        this.amountUsd = this.labourUsd + this.deviceUsd + this.materialUsd;
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
}
