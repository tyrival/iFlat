package com.iflat.bi.entity;

import java.util.Date;

public class ProjectInfo {

    private String projNo;    //工号
    private String code;  //船号
    private String name;  //船名
    private String shortName;          //简称
    private String plannedPlace;       //计划船位
    private String actualPlace;        //实际船位
    private double materialPct;       //器材费指标
    private double manufacturingPct;  //加工费指标
    private double auxiliaryPct;      //专项费指标

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

    private Date analyseDate;   //分析月份

    public Date getAnalyseDate() {
        return analyseDate;
    }

    public void setAnalyseDate(Date analyseDate) {
        this.analyseDate = analyseDate;
    }

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

    public double getMaterialPct() {
        return materialPct;
    }

    public void setMaterialPct(double materialPct) {
        this.materialPct = materialPct;
    }

    public double getManufacturingPct() {
        return manufacturingPct;
    }

    public void setManufacturingPct(double manufacturingPct) {
        this.manufacturingPct = manufacturingPct;
    }

    public double getAuxiliaryPct() {
        return auxiliaryPct;
    }

    public void setAuxiliaryPct(double auxiliaryPct) {
        this.auxiliaryPct = auxiliaryPct;
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
}
