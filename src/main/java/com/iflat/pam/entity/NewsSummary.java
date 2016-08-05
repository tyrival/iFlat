package com.iflat.pam.entity;

import java.util.Date;

    /**
     * Created by tyriv on 2016/7/29.
     */
    public class NewsSummary {

        private String type;  // 参数：author,dept,partyBranch
        private String name;
    private int total;
    private int adopt;

    private Date fromDate;
    private Date toDate;
    private String dept;
    private String pbName;

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getPbName() {
        return pbName;
    }

    public void setPbName(String pbName) {
        this.pbName = pbName;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getAdopt() {
        return adopt;
    }

    public void setAdopt(int adopt) {
        this.adopt = adopt;
    }
}
