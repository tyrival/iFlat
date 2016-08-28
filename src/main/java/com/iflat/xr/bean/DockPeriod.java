package com.iflat.xr.bean;

import com.iflat.util.code.CodeUtil;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/25.
 */
public class DockPeriod {

    public static void main(String[] args) {
        CodeUtil.generate("com.iflat.xr.bean.DockPeriod", "struts");
    }
    private String id;
    private String projNo;
    private Date inDock;
    private Date outDock;
    private int period;

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

    public Date getInDock() {
        return inDock;
    }

    public void setInDock(Date inDock) {
        this.inDock = inDock;
        setPeriod();
    }

    public Date getOutDock() {
        return outDock;
    }

    public void setOutDock(Date outDock) {
        this.outDock = outDock;
        setPeriod();
    }

    public int getPeriod() {
        return period;
    }

    private void setPeriod() {
        Date end = outDock;
        if (end == null) {
            end = new Date();
        }
        this.period = (int) ((end.getTime() - inDock.getTime()) / 1000 / 60 / 60 / 24);
    }
}
