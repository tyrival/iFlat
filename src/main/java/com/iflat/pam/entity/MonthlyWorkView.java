package com.iflat.pam.entity;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/8.
 */
public class MonthlyWorkView {

    private String pbName;
    private Date month;
    private String status;

    public String getPbName() {
        return pbName;
    }

    public void setPbName(String pbName) {
        this.pbName = pbName;
    }

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
