package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class ProjectCstCtrl {

    private String id;
    private String projNo;
    private String dept;
    private String type;  // 费用类型

    private double target;  // 目标成本
    private double actual;  // 实际成本
    private double difference;  // 超支
    private double diffPct;  // 超过百分比
    private String comment;

    private Date month;
    private Date fixed;
    private int version;  //版本

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

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

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
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
}
