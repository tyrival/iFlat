package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SrSettlement {

    private String id;
    private String type;  // 主体/零杂/机电
    private String projNo;
    private String projName;
    private String deptName;
    private String team;
    private double laborAmount;
    private double consumableAmount;
    private double performanceAmount;
    private double materialAmount;
    private double summaryAmount;
    private String attachment;
    private String comment;
    private String status;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public SrSettlement() {
        this.createTime = new Date();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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

    private void setSummaryAmount() {
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
