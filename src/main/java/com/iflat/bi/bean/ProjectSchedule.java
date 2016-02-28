package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class ProjectSchedule {

    private String id;
    private String projNo;

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

    private Date month;
    private Date fixed;
    private int version;  //版本

    public ProjectSchedule() {
        this.version = 1;
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
