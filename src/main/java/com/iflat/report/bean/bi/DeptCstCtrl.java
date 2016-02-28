package com.iflat.report.bean.bi;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class DeptCstCtrl {

    private String id;
    private String dept;
    private String type;  //
    private double budget;  // 预算
    private double actual;  // 实际
    private double difference;  // 超支
    private double diffPct;  //节超
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

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
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

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
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
        this.difference = this.actual - this.budget;
        this.setDiffPct();
    }

    public double getDiffPct() {
        return diffPct;
    }

    private void setDiffPct() {
        if(this.budget != 0) {
            this.diffPct = this.difference * 100 / this.budget;
        } else {
            this.diffPct = 0;
        }
    }
}
