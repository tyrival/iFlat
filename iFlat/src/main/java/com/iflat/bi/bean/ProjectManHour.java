package com.iflat.bi.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/26.
 */
public class ProjectManHour {

    private String id;
    private String projNo;
    private String dept;
    private double casualLabor;
    private double employee;

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

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public double getCasualLabor() {
        return casualLabor;
    }

    public void setCasualLabor(double casualLabor) {
        this.casualLabor = casualLabor;
    }

    public double getEmployee() {
        return employee;
    }

    public void setEmployee(double employee) {
        this.employee = employee;
    }
}
