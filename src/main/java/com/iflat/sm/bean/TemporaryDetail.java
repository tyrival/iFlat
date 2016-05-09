package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/5/6.
 */
public class TemporaryDetail {
    private String id;
    private String pid;
    private String team;
    private String name;
    private String trades;  // 工种
    private double standard;
    private int days;
    private double ratio;
    private double score;
    private double salary;
    private double adjust;
    private double summary;
    private String comment;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public double getStandard() {
        return standard;
    }

    public void setStandard(double standard) {
        this.standard = standard;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public double getRatio() {
        return ratio;
    }

    public void setRatio(double ratio) {
        this.ratio = ratio;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
        setSummary();
    }

    public double getAdjust() {
        return adjust;
    }

    public void setAdjust(double adjust) {
        this.adjust = adjust;
        setSummary();
    }

    public double getSummary() {
        return summary;
    }

    private void setSummary() {
        this.summary = salary + adjust;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTrades() {
        return trades;
    }

    public void setTrades(String trades) {
        this.trades = trades;
    }

    public String getCreatorAcc() {
        return creatorAcc;
    }

    public void setCreatorAcc(String creatorAcc) {
        this.creatorAcc = creatorAcc;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
