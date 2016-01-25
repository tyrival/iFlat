package com.iflat.bi.bean;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class ProjectCost {

    private String id;
    private String projNo;
    private String type;   // 报价/目标/实际
    private double salesRevenue;  // 销售收入

    private double device;  // 设备费
    private double raw;  // 原材料
    private double foundry;  // 外协包料

    private double casualLabor;  // 劳务工费
    private double salary;  // 职工薪酬
    private double maintenance;  // 制造费
    private double power;  // 动力费
    private double outSourcing;  // 外协费

    private double design;  // 设计费
    private double survey;  // 检验费
    private double salesFee;  // 销售费
    private double salesAssCharge;  // 销售附加费
    private double purchaseAssCharge;  // 采购附加费
    private double colabouration;  // 专项协作费
    private double craftEquipment;  // 专项设备工装费
    private double seaTrial;  // 试航费
    private double other;  // 其他费用
    private double warranty;  // 保修费

    private double reserve;  // 不可预见费

    private double matCst;  //器材费
    private double manuCst;  // 加工费
    private double auxCst;  // 专项费
    private double matPct;  //器材费比例
    private double manuPct;  // 加工费比例
    private double auxPct;  // 专项费比例
    private double cost;  // 总成本
    private double grossProfit;  // 毛利
    private double profitMargin; // 毛利率

    private double matCstAdj;  //器材费
    private double matPctAdj;  //器材费比例
    private double manuCstAdj;  // 加工费
    private double manuPctAdj;  // 加工费比例
    private double auxCstAdj;  // 专项费
    private double auxPctAdj;  // 专项费比例
    private double costAdj;  // 总成本

    private Date month;
    private Date fixed;
    private int version;  //版本

    public void setId(String id) {
        this.id = id;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSalesRevenue(double salesRevenue) {
        this.salesRevenue = salesRevenue;
        this.setGrossProfit();
        this.setMatPct();
        this.setManuPct();
        this.setAuxPct();
        this.setMatPctAdj();
        this.setManuPctAdj();
        this.setAuxPctAdj();
    }

    private void setCost() {
        this.cost = this.matCst + this.manuCst + this.auxCst + this.reserve;
        this.setGrossProfit();
    }

    private void setGrossProfit() {
        this.grossProfit = this.salesRevenue - this.cost;
        this.setProfitMargin();
    }

    private void setProfitMargin() {
        if(this.salesRevenue != 0) {
            this.profitMargin = this.grossProfit / this.salesRevenue;
            this.profitMargin = formatPct(this.profitMargin);
        }
    }
    /* MatCst */
    private void setMatCst() {
        this.matCst = this.device + this.raw + this.foundry;
        this.setCost();
        this.setMatPct();
    }

    private void setMatPct() {
        if(this.salesRevenue != 0) {
            this.matPct = this.matCst / this.salesRevenue;
            this.matPct = formatPct(this.matPct);
        }
    }

    public void setDevice(double device) {
        this.device = device;
        this.setMatCst();
    }

    public void setRaw(double raw) {
        this.raw = raw;
        this.setMatCst();
    }

    public void setFoundry(double foundry) {
        this.foundry = foundry;
        this.setMatCst();
    }

    /* ManuCst */
    private void setManuCst() {
        this.manuCst = this.casualLabor + this.salary + this.maintenance
                + this.power + this.outSourcing;
        this.setCost();
        this.setManuPct();
    }

    private void setManuPct() {
        if(this.salesRevenue != 0) {
            this.manuPct = this.manuCst / this.salesRevenue;
            this.manuPct = formatPct(this.manuPct);
        }
    }

    public void setCasualLabor(double casualLabor) {
        this.casualLabor = casualLabor;
        this.setManuCst();
    }

    public void setSalary(double salary) {
        this.salary = salary;
        this.setManuCst();
    }

    public void setMaintenance(double maintenance) {
        this.maintenance = maintenance;
        this.setManuCst();
    }

    public void setPower(double power) {
        this.power = power;
        this.setManuCst();
    }

    public void setOutSourcing(double outSourcing) {
        this.outSourcing = outSourcing;
        this.setManuCst();
    }

    /* AuxCst */
    private void setAuxCst() {
        this.auxCst = this.design + this.survey + this.salesFee + this.salesAssCharge
                + this.purchaseAssCharge + this.colabouration + this.seaTrial
                + this.warranty + this.craftEquipment + this.other;
        this.setCost();
        this.setAuxPct();
    }

    private void setAuxPct() {
        if(this.salesRevenue != 0) {
            this.auxPct = this.auxCst / this.salesRevenue;
            this.auxPct = formatPct(this.auxPct);
        }
    }

    public void setDesign(double design) {
        this.design = design;
        this.setAuxCst();
    }

    public void setSurvey(double survey) {
        this.survey = survey;
        this.setAuxCst();
    }

    public void setSalesFee(double salesFee) {
        this.salesFee = salesFee;
        this.setAuxCst();
    }

    public void setSalesAssCharge(double salesAssCharge) {
        this.salesAssCharge = salesAssCharge;
        this.setAuxCst();
    }

    public void setPurchaseAssCharge(double purchaseAssCharge) {
        this.purchaseAssCharge = purchaseAssCharge;
        this.setAuxCst();
    }

    public void setColabouration(double colabouration) {
        this.colabouration = colabouration;
        this.setAuxCst();
    }

    public void setCraftEquipment(double craftEquipment) {
        this.craftEquipment = craftEquipment;
        this.setAuxCst();
    }

    public void setSeaTrial(double seaTrial) {
        this.seaTrial = seaTrial;
        this.setAuxCst();
    }

    public void setOther(double other) {
        this.other = other;
        this.setAuxCst();
    }

    public void setWarranty(double warranty) {
        this.warranty = warranty;
        this.setAuxCst();
    }

    /* Reserve */
    public void setReserve(double reserve) {
        this.reserve = reserve;
        this.setCost();
        this.setCostAdj();
    }

    /* CostAdj */
    private void setCostAdj() {
        this.costAdj = this.matCstAdj + this.manuCstAdj + this.auxCstAdj + this.reserve;
    }

    /* MatCstAdj */
    public void setMatCstAdj(double matCstAdj) {
        this.matCstAdj = matCstAdj;
        this.setCostAdj();
        this.setMatPctAdj();
    }

    private void setMatPctAdj() {
        if(this.salesRevenue != 0) {
            this.matPctAdj = this.matCstAdj / this.salesRevenue;
            this.matPctAdj = formatPct(this.matPctAdj);
        }
    }

    /* ManuCstAdj */
    public void setManuCstAdj(double manuCstAdj) {
        this.manuCstAdj = manuCstAdj;
        this.setCostAdj();
        this.setManuPctAdj();
    }

    private void setManuPctAdj() {
        if(this.salesRevenue != 0) {
            this.manuPctAdj = this.manuCstAdj / this.salesRevenue;
            this.manuPctAdj = formatPct(this.manuPctAdj);
        }
    }

    /* AuxCstAdj */
    public void setAuxCstAdj(double auxCstAdj) {
        this.auxCstAdj = auxCstAdj;
        this.setCostAdj();
        this.setAuxPctAdj();
    }

    private void setAuxPctAdj() {
        if(this.salesRevenue != 0) {
            this.auxPctAdj = this.auxCstAdj / this.salesRevenue;
            this.auxPctAdj = formatPct(this.auxPctAdj);
        }
    }

    private double formatPct(double var) {
        BigDecimal b = new BigDecimal(var);
        return b.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue() * 100;
    }

    public void setVersion(int version) {
        this.version = version;
        if(this.version == 0) {
            this.fixed = new Date();
        }
    }

    public void setMonth(Date month) {
        this.month = month;
    }

    public String getId() {
        return id;
    }

    public String getProjNo() {
        return projNo;
    }

    public String getType() {
        return type;
    }

    public double getSalesRevenue() {
        return salesRevenue;
    }

    public double getDevice() {
        return device;
    }

    public double getRaw() {
        return raw;
    }

    public double getFoundry() {
        return foundry;
    }

    public double getCasualLabor() {
        return casualLabor;
    }

    public double getSalary() {
        return salary;
    }

    public double getMaintenance() {
        return maintenance;
    }

    public double getPower() {
        return power;
    }

    public double getOutSourcing() {
        return outSourcing;
    }

    public double getDesign() {
        return design;
    }

    public double getSurvey() {
        return survey;
    }

    public double getSalesFee() {
        return salesFee;
    }

    public double getSalesAssCharge() {
        return salesAssCharge;
    }

    public double getPurchaseAssCharge() {
        return purchaseAssCharge;
    }

    public double getColabouration() {
        return colabouration;
    }

    public double getCraftEquipment() {
        return craftEquipment;
    }

    public double getSeaTrial() {
        return seaTrial;
    }

    public double getOther() {
        return other;
    }

    public double getWarranty() {
        return warranty;
    }

    public double getReserve() {
        return reserve;
    }

    public double getMatCst() {
        return matCst;
    }

    public double getManuCst() {
        return manuCst;
    }

    public double getAuxCst() {
        return auxCst;
    }

    public double getMatPct() {
        return matPct;
    }

    public double getManuPct() {
        return manuPct;
    }

    public double getAuxPct() {
        return auxPct;
    }

    public double getCost() {
        return cost;
    }

    public double getGrossProfit() {
        return grossProfit;
    }

    public double getProfitMargin() {
        return profitMargin;
    }

    public double getMatCstAdj() {
        return matCstAdj;
    }

    public double getMatPctAdj() {
        return matPctAdj;
    }

    public double getManuCstAdj() {
        return manuCstAdj;
    }

    public double getManuPctAdj() {
        return manuPctAdj;
    }

    public double getAuxCstAdj() {
        return auxCstAdj;
    }

    public double getAuxPctAdj() {
        return auxPctAdj;
    }

    public double getCostAdj() {
        return costAdj;
    }

    public Date getMonth() {
        return month;
    }

    public Date getFixed() {
        return fixed;
    }

    public int getVersion() {
        return version;
    }
}
