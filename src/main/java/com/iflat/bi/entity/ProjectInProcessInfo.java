package com.iflat.bi.entity;

import java.util.Date;

public class ProjectInProcessInfo {

    private String id;
    private String projNo;

    private String type;  // 费用类型

    private double target;  // 目标成本
    private double actual;  // 实际成本
    private double difference;  // 超支
    private double diffPct;  // 超过百分比

    private Date month;
    private Date fixed;
    private int version;  //版本

    private String code;  //船号
    private String name;  //船名
    private String shortName;          //简称
    private String plannedPlace;       //计划船位
    private String actualPlace;        //实际船位

    private Date commencePln;  //开工
    private Date shipwayPln;   //上船台
    private Date launchPln;    //下水
    private Date seaTrialPln;  //试航
    private Date deliveryPln;  //交付

    private Date commenceAct;  //开工
    private Date shipwayAct;   //上船台
    private Date launchAct;    //下水
    private Date seaTrialAct;  //试航
    private Date deliveryAct;  //交付

    private long blockPrdPln;   //分段周期
    private long shipwayPrdPln; //船台周期
    private long dockPrdPln;    //码头周期
    private long buildPrdPln;   //建造周期

    private long blockPrdAct;   //分段周期
    private long shipwayPrdAct; //船台周期
    private long dockPrdAct;    //码头周期
    private long buildPrdAct;   //建造周期

    private String owner;   //船东

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public Date getCommencePln() {
        return commencePln;
    }

    public void setCommencePln(Date commencePln) {
        this.commencePln = commencePln;
        this.setBlockPrdPln();
        this.setBuildPrdPln();
    }

    public Date getShipwayPln() {
        return shipwayPln;
    }

    public void setShipwayPln(Date shipwayPln) {
        this.shipwayPln = shipwayPln;
        this.setBlockPrdPln();
        this.setShipwayPrdPln();
    }

    public Date getLaunchPln() {
        return launchPln;
    }

    public void setLaunchPln(Date launchPln) {
        this.launchPln = launchPln;
        this.setShipwayPrdPln();
        this.setDockPrdPln();
    }

    public Date getSeaTrialPln() {
        return seaTrialPln;
    }

    public void setSeaTrialPln(Date seaTrialPln) {
        this.seaTrialPln = seaTrialPln;
        this.setDockPrdPln();
    }

    public Date getDeliveryPln() {
        return deliveryPln;
    }

    public void setDeliveryPln(Date deliveryPln) {
        this.deliveryPln = deliveryPln;
        this.setBuildPrdPln();
    }


    public long getBlockPrdPln() {
        return blockPrdPln;
    }

    private void setBlockPrdPln() {
        this.blockPrdPln = periodCalc(this.commencePln, this.shipwayPln);
    }

    public long getShipwayPrdPln() {
        return shipwayPrdPln;
    }

    private void setShipwayPrdPln() {
        this.shipwayPrdPln = periodCalc(this.shipwayPln, this.launchPln);
    }

    public long getDockPrdPln() {
        return dockPrdPln;
    }

    private void setDockPrdPln() {
        this.dockPrdPln = periodCalc(this.launchPln, this.seaTrialPln);
    }

    public long getBuildPrdPln() {
        return buildPrdPln;
    }

    private void setBuildPrdPln() {
        this.buildPrdPln = periodCalc(this.commencePln, this.deliveryPln);
    }

    public Date getCommenceAct() {
        return commenceAct;
    }

    public void setCommenceAct(Date commenceAct) {
        this.commenceAct = commenceAct;
        this.setBlockPrdAct();
        this.setBuildPrdAct();
    }

    public Date getShipwayAct() {
        return shipwayAct;
    }

    public void setShipwayAct(Date shipwayAct) {
        this.shipwayAct = shipwayAct;
        this.setBlockPrdAct();
        this.setShipwayPrdAct();
    }

    public Date getLaunchAct() {
        return launchAct;
    }

    public void setLaunchAct(Date launchAct) {
        this.launchAct = launchAct;
        this.setShipwayPrdAct();
        this.setDockPrdAct();
    }

    public Date getSeaTrialAct() {
        return seaTrialAct;
    }

    public void setSeaTrialAct(Date seaTrialAct) {
        this.seaTrialAct = seaTrialAct;
        this.setDockPrdAct();
    }

    public Date getDeliveryAct() {
        return deliveryAct;
    }

    public void setDeliveryAct(Date deliveryAct) {
        this.deliveryAct = deliveryAct;
        this.setBuildPrdAct();
    }


    public long getBlockPrdAct() {
        return blockPrdAct;
    }

    private void setBlockPrdAct() {
        this.blockPrdAct = periodCalc(this.commenceAct, this.shipwayAct);
    }

    public long getShipwayPrdAct() {
        return shipwayPrdAct;
    }

    private void setShipwayPrdAct() {
        this.shipwayPrdAct = periodCalc(this.shipwayAct, this.launchAct);
    }

    public long getDockPrdAct() {
        return dockPrdAct;
    }

    private void setDockPrdAct() {
        this.dockPrdAct = periodCalc(this.launchAct, this.seaTrialAct);
    }

    public long getBuildPrdAct() {
        return buildPrdAct;
    }

    private void setBuildPrdAct() {
        this.buildPrdAct = periodCalc(this.commenceAct, this.deliveryAct);
    }

    private long periodCalc(Date start, Date end) {
        long diff = 0;
        if(start != null && end != null) {
            diff = end.getTime() - start.getTime();
        }
        return diff / (1000 * 60 * 60 * 24);
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

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getPlannedPlace() {
        return plannedPlace;
    }

    public void setPlannedPlace(String plannedPlace) {
        this.plannedPlace = plannedPlace;
    }

    public String getActualPlace() {
        return actualPlace;
    }

    public void setActualPlace(String actualPlace) {
        this.actualPlace = actualPlace;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getTarget() {
        return target;
    }

    public void setTarget(double target) {
        this.target = target;
        this.setDifference();
    }

    public double getActual() {
        return actual;
    }

    public void setActual(double actual) {
        this.actual = actual;
        this.setDifference();
    }

    public double getDifference() {
        return difference;
    }

    private void setDifference() {
        this.difference = this.actual - this.target;
        this.setDiffPct();
    }

    public double getDiffPct() {
        return diffPct;
    }

    private void setDiffPct() {
        if(this.target != 0) {
            this.diffPct = this.difference * 100 / this.target;
        }
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
