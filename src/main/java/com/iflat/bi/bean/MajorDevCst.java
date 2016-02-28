package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class MajorDevCst {

    private String id;
    private String projNo;
    private String type;  // 报价/目标/实际
    private double summary;  // 合计

    private double mainEngine;  // 主机及附属含轴
    private double genset;  // 主发电机组
    private double steeringGear;  // 舵机
    private double ballastWaterTrtmt;  // 压载水处理
    private double hatchCoverSys;  // 舱盖系统
    private double distributionSys;  // 配电系统
    private double navigationSys;  // 通导系统
    private double boiler;  // 锅炉
    private double windlass;  // 锚机,拖缆绞车
    private double crane;  // 起货机（克令吊）

    private Date month;
    private Date fixed;
    private int version;  //版本

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getSummary() {
        return summary;
    }

    private void setSummary() {
        this.summary = this.mainEngine + this.genset + this.steeringGear + this.ballastWaterTrtmt + this.hatchCoverSys + this.distributionSys + this.navigationSys + this.boiler + this.windlass + this.crane;
    }

    public double getMainEngine() {
        return mainEngine;
    }

    public void setMainEngine(double mainEngine) {
        this.mainEngine = mainEngine;
        this.setSummary();
    }

    public double getGenset() {
        return genset;
    }

    public void setGenset(double genset) {
        this.genset = genset;
        this.setSummary();
    }

    public double getSteeringGear() {
        return steeringGear;
    }

    public void setSteeringGear(double steeringGear) {
        this.steeringGear = steeringGear;
        this.setSummary();
    }

    public double getBallastWaterTrtmt() {
        return ballastWaterTrtmt;
    }

    public void setBallastWaterTrtmt(double ballastWaterTrtmt) {
        this.ballastWaterTrtmt = ballastWaterTrtmt;
        this.setSummary();
    }

    public double getHatchCoverSys() {
        return hatchCoverSys;
    }

    public void setHatchCoverSys(double hatchCoverSys) {
        this.hatchCoverSys = hatchCoverSys;
        this.setSummary();
    }

    public double getDistributionSys() {
        return distributionSys;
    }

    public void setDistributionSys(double distributionSys) {
        this.distributionSys = distributionSys;
        this.setSummary();
    }

    public double getNavigationSys() {
        return navigationSys;
    }

    public void setNavigationSys(double navigationSys) {
        this.navigationSys = navigationSys;
        this.setSummary();
    }

    public double getBoiler() {
        return boiler;
    }

    public void setBoiler(double boiler) {
        this.boiler = boiler;
        this.setSummary();
    }

    public double getWindlass() {
        return windlass;
    }

    public void setWindlass(double windlass) {
        this.windlass = windlass;
        this.setSummary();
    }

    public double getCrane() {
        return crane;
    }

    public void setCrane(double crane) {
        this.crane = crane;
        this.setSummary();
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
