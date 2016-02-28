package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class MajorMatQty {

    private String id;
    private String projNo;
    private String type;  // 设计/订货/实际

    private double steel;  // 钢材
    private double steelPlate;  // 钢板
    private double shapeSteel;  // 型钢
    private double otherSteel;  // 其他钢材

    private double pipes;  // 管材
    private double steelPipe;  // 钢管

    private double weldingMat;  // 焊材
    private double weldingWire;  // 焊丝

    private double paint;  // 油漆
    private double importPaint;  // 进口油漆
    private double importThinner;  // 进口稀料

    private double cable;  // 电缆
    private double marineCable;  // 船用电缆

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

    public double getSteel() {
        return steel;
    }

    private void setSteel() {
        this.steel = this.steelPlate + this.shapeSteel + this.otherSteel;
    }

    public double getSteelPlate() {
        return steelPlate;
    }

    public void setSteelPlate(double steelPlate) {
        this.steelPlate = steelPlate;
        this.setSteel();
    }

    public double getShapeSteel() {
        return shapeSteel;
    }

    public void setShapeSteel(double shapeSteel) {
        this.shapeSteel = shapeSteel;
        this.setSteel();
    }

    public double getOtherSteel() {
        return otherSteel;
    }

    public void setOtherSteel(double otherSteel) {
        this.otherSteel = otherSteel;
        this.setSteel();
    }

    public double getPipes() {
        return pipes;
    }

    private void setPipes() {
        this.pipes = this.steelPipe;
    }

    public double getSteelPipe() {
        return steelPipe;
    }

    public void setSteelPipe(double steelPipe) {
        this.steelPipe = steelPipe;
        this.setPipes();
    }

    public double getWeldingMat() {
        return weldingMat;
    }

    private void setWeldingMat() {
        this.weldingMat = this.weldingWire;
    }

    public double getWeldingWire() {
        return weldingWire;
    }

    public void setWeldingWire(double weldingWire) {
        this.weldingWire = weldingWire;
        this.setWeldingMat();
    }

    public double getPaint() {
        return paint;
    }

    private void setPaint() {
        this.paint = this.importPaint + this.importThinner;
    }

    public double getImportPaint() {
        return importPaint;
    }

    public void setImportPaint(double importPaint) {
        this.importPaint = importPaint;
        this.setPaint();
    }

    public double getImportThinner() {
        return importThinner;
    }

    public void setImportThinner(double importThinner) {
        this.importThinner = importThinner;
        this.setPaint();
    }

    public double getCable() {
        return cable;
    }

    private void setCable() {
        this.cable = this.marineCable;
    }

    public double getMarineCable() {
        return marineCable;
    }

    public void setMarineCable(double marineCable) {
        this.marineCable = marineCable;
        this.setCable();
    }
}
