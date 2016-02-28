package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class Project {

    private String id;
    private String projNo;    //工号
    private String code;  //船号
    private String name;  //船名
    private String shortName;          //简称
    private String plannedPlace;       //计划船位
    private String actualPlace;        //实际船位
    private double materialPct;       //器材费指标
    private double manufacturingPct;  //加工费指标
    private double auxiliaryPct;      //专项费指标
    private Date analyseDate;         //分析月份

    public Date getAnalyseDate() {
        return analyseDate;
    }

    public void setAnalyseDate(Date analyseDate) {
        this.analyseDate = analyseDate;
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
}
