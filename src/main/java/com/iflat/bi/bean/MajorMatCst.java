package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class MajorMatCst {

    private String id;
    private String projNo;
    private String type;  // 报价/目标/实际
    private double summary;  // 合计

    private double steel;  // 钢材
    private double pipes;  // 管材
    private double weldingMat;  // 焊材
    private double paint;  // 油漆
    private double cable;  // 电缆
    private double oil;  // 油料

    private Date month;
    private Date fixed;
    private int version;  //版本

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
        this.summary = this.steel + this.pipes + this.weldingMat + this.paint + this.cable + this.oil;
    }

    public double getSteel() {
        return steel;
    }

    public void setSteel(double steel) {
        this.steel = steel;
        this.setSummary();
    }

    public double getPipes() {
        return pipes;
    }

    public void setPipes(double pipes) {
        this.pipes = pipes;
        this.setSummary();
    }

    public double getWeldingMat() {
        return weldingMat;
    }

    public void setWeldingMat(double weldingMat) {
        this.weldingMat = weldingMat;
        this.setSummary();
    }

    public double getPaint() {
        return paint;
    }

    public void setPaint(double paint) {
        this.paint = paint;
        this.setSummary();
    }

    public double getCable() {
        return cable;
    }

    public void setCable(double cable) {
        this.cable = cable;
        this.setSummary();
    }

    public double getOil() {
        return oil;
    }

    public void setOil(double oil) {
        this.oil = oil;
        this.setSummary();
    }
}
