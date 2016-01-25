package com.iflat.report.bean.mm;

/**
 * Created by tyriv on 2016/1/11.
 */
public class PaintMRP {
    private String projNo;
    private String code;
    private String name;
    private String description;
    private String unit;
    private double demand;  //需求数量
    private double hasRequest;  //已申请数量
    private double carryOver;  //结转数量
    private double delivery;   //出库
    private double rest;  //可申请余量

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getDemand() {
        return demand;
    }

    public void setDemand(double demand) {
        this.demand = demand;
    }

    public double getHasRequest() {
        return hasRequest;
    }

    public void setHasRequest(double hasRequest) {
        this.hasRequest = hasRequest;
    }

    public double getCarryOver() {
        return carryOver;
    }

    public void setCarryOver(double carryOver) {
        this.carryOver = carryOver;
    }

    public double getDelivery() {
        return delivery;
    }

    public void setDelivery(double delivery) {
        this.delivery = delivery;
    }

    public double getRest() {
        return rest;
    }

    public void setRest(double rest) {
        this.rest = rest;
    }
}
