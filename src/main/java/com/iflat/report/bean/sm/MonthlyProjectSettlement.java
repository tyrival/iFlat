package com.iflat.report.bean.sm;

import java.util.Date;

/**
 * Created by tyriv on 2016/6/24.
 */
public class MonthlyProjectSettlement {

    private String type;
    private Date month;
    private String projNo;
    private String projName;
    private String team;
    private String dept;
    private double labor;  // 工费
    private double consumable;  // 易耗品补贴
    private double performance;  // 绩效
    private double material;  // 材料费
    private double summary;
    private double invoice;
    private double rate;  // 管理费比例 0.94
    private double fine;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getFine() {
        return fine;
    }

    public void setFine(double fine) {
        this.fine = fine;
    }

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
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

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public double getLabor() {
        return labor;
    }

    public void setLabor(double labor) {
        this.labor = labor;
        setSummary();
    }

    public double getConsumable() {
        return consumable;
    }

    public void setConsumable(double consumable) {
        this.consumable = consumable;
        setSummary();
    }

    public double getPerformance() {
        return performance;
    }

    public void setPerformance(double performance) {
        this.performance = performance;
        setSummary();
    }

    public double getMaterial() {
        return material;
    }

    public void setMaterial(double material) {
        this.material = material;
        setSummary();
    }

    public double getSummary() {
        return summary;
    }

    private void setSummary() {
        this.summary = labor + performance + consumable - material;
        setInvoice();
    }

    public double getInvoice() {
        return invoice;
    }

    private void setInvoice() {
        this.invoice = summary * rate;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
        setInvoice();
    }
}
