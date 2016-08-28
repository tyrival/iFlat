package com.iflat.xr.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/2.
 */
public class Project {

    private String projNo;    //工号
    private String category;  //分类
    private String code;  //船号
    private String name;  //船名
    private String shortName;  //简称
    private String status;  //状态
    private String type;  //状态
    private Date completeTime;  //完工时间
    private int dockPeriod;

    public int getDockPeriod() {
        return dockPeriod;
    }

    public void setDockPeriod(int dockPeriod) {
        this.dockPeriod = dockPeriod;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCompleteTime() {
        return completeTime;
    }

    public void setCompleteTime(Date completeTime) {
        this.completeTime = completeTime;
    }
}
