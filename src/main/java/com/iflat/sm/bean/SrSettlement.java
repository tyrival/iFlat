package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SrSettlement {

    protected String id;
    protected String type;  // 主体/零杂/机电
    protected String projNo;
    protected String projName;
    protected String deptName;
    protected String team;
    protected double laborAmount;
    protected double consumableAmount;
    protected double performanceAmount;
    protected double materialAmount;
    protected double summaryAmount;
    protected String attachment;
    protected String comment;
    protected String status;
    protected String creatorAcc;
    protected String creatorName;
    protected Date createTime;

    public SrSettlement() {
        this.createTime = new Date();
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getProjName() {
        return projName;
    }

    public void setProjName(String projName) {
        this.projName = projName;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public double getLaborAmount() {
        return laborAmount;
    }

    public void setLaborAmount(double laborAmount) {
        this.laborAmount = laborAmount;
        this.setSummaryAmount();
    }

    public double getConsumableAmount() {
        return consumableAmount;
    }

    public void setConsumableAmount(double consumableAmount) {
        this.consumableAmount = consumableAmount;
        this.setSummaryAmount();
    }

    public double getPerformanceAmount() {
        return performanceAmount;
    }

    public void setPerformanceAmount(double performanceAmount) {
        this.performanceAmount = performanceAmount;
        this.setSummaryAmount();
    }

    public double getMaterialAmount() {
        return materialAmount;
    }

    public void setMaterialAmount(double materialAmount) {
        this.materialAmount = materialAmount;
        this.setSummaryAmount();
    }

    public double getSummaryAmount() {
        return summaryAmount;
    }

    protected void setSummaryAmount() {
        this.summaryAmount = this.laborAmount + this.consumableAmount + this.performanceAmount - this.materialAmount;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public void setSummaryAmount(double summaryAmount) {
        this.summaryAmount = summaryAmount;
    }
}
