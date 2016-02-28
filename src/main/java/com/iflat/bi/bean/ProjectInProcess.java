package com.iflat.bi.bean;

import java.util.Date;

public class ProjectInProcess {

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

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public Date getFixed() {
        return fixed;
    }

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
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
    /*private double steelEst;  // 用钢量
    private double craftEquipmentEst;  // 工装费
    private double weldingMatEst;  // 焊材用量
    private double pipesEst;  // 钢管用量
    private double outSourcingBlockEst;  // 外协分段吨位
    private double paintEst;  // 油漆用量
    private double shipwayEst;  // 船台费
    private double cableEst;  // 电缆用量
    private double dockEst;  // 码头费
    private double craneShipEst;  // 浮吊费
    private double tugEst;  // 拖轮费

    private double steelAct;  // 用钢量
    private double craftEquipmentAct;  // 工装费
    private double weldingMatAct;  // 焊材用量
    private double pipesAct;  // 钢管用量
    private double outSourcingBlockAct;  // 外协分段吨位
    private double paintAct;  // 油漆用量
    private double shipwayAct;  // 船台费
    private double cableAct;  // 电缆用量
    private double dockAct;  // 码头费
    private double craneShipAct;  // 浮吊费
    private double tugAct;  // 拖轮费

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

    public double getSteelEst() {
        return steelEst;
    }

    public void setSteelEst(double steelEst) {
        this.steelEst = steelEst;
    }

    public double getCraftEquipmentEst() {
        return craftEquipmentEst;
    }

    public void setCraftEquipmentEst(double craftEquipmentEst) {
        this.craftEquipmentEst = craftEquipmentEst;
    }

    public double getWeldingMatEst() {
        return weldingMatEst;
    }

    public void setWeldingMatEst(double weldingMatEst) {
        this.weldingMatEst = weldingMatEst;
    }

    public double getPipesEst() {
        return pipesEst;
    }

    public void setPipesEst(double pipesEst) {
        this.pipesEst = pipesEst;
    }

    public double getOutSourcingBlockEst() {
        return outSourcingBlockEst;
    }

    public void setOutSourcingBlockEst(double outSourcingBlockEst) {
        this.outSourcingBlockEst = outSourcingBlockEst;
    }

    public double getPaintEst() {
        return paintEst;
    }

    public void setPaintEst(double paintEst) {
        this.paintEst = paintEst;
    }

    public double getShipwayEst() {
        return shipwayEst;
    }

    public void setShipwayEst(double shipwayEst) {
        this.shipwayEst = shipwayEst;
    }

    public double getCableEst() {
        return cableEst;
    }

    public void setCableEst(double cableEst) {
        this.cableEst = cableEst;
    }

    public double getDockEst() {
        return dockEst;
    }

    public void setDockEst(double dockEst) {
        this.dockEst = dockEst;
    }

    public double getCraneShipEst() {
        return craneShipEst;
    }

    public void setCraneShipEst(double craneShipEst) {
        this.craneShipEst = craneShipEst;
    }

    public double getTugEst() {
        return tugEst;
    }

    public void setTugEst(double tugEst) {
        this.tugEst = tugEst;
    }

    public double getSteelAct() {
        return steelAct;
    }

    public void setSteelAct(double steelAct) {
        this.steelAct = steelAct;
    }

    public double getCraftEquipmentAct() {
        return craftEquipmentAct;
    }

    public void setCraftEquipmentAct(double craftEquipmentAct) {
        this.craftEquipmentAct = craftEquipmentAct;
    }

    public double getWeldingMatAct() {
        return weldingMatAct;
    }

    public void setWeldingMatAct(double weldingMatAct) {
        this.weldingMatAct = weldingMatAct;
    }

    public double getPipesAct() {
        return pipesAct;
    }

    public void setPipesAct(double pipesAct) {
        this.pipesAct = pipesAct;
    }

    public double getOutSourcingBlockAct() {
        return outSourcingBlockAct;
    }

    public void setOutSourcingBlockAct(double outSourcingBlockAct) {
        this.outSourcingBlockAct = outSourcingBlockAct;
    }

    public double getPaintAct() {
        return paintAct;
    }

    public void setPaintAct(double paintAct) {
        this.paintAct = paintAct;
    }

    public double getShipwayAct() {
        return shipwayAct;
    }

    public void setShipwayAct(double shipwayAct) {
        this.shipwayAct = shipwayAct;
    }

    public double getCableAct() {
        return cableAct;
    }

    public void setCableAct(double cableAct) {
        this.cableAct = cableAct;
    }

    public double getDockAct() {
        return dockAct;
    }

    public void setDockAct(double dockAct) {
        this.dockAct = dockAct;
    }

    public double getCraneShipAct() {
        return craneShipAct;
    }

    public void setCraneShipAct(double craneShipAct) {
        this.craneShipAct = craneShipAct;
    }

    public double getTugAct() {
        return tugAct;
    }

    public void setTugAct(double tugAct) {
        this.tugAct = tugAct;
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
    }*/
}
