package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/4/27.
 */
public class TecSettlement {

    private String id;
    private String projNo;
    private String projName;
    private Date month;
    private String deptName;
    private String team;
    private String attachment;
    private String comment;
    private String status;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;
    private double amount;
    private double mgrScore;
    private double progressScore;
    private double qualityScore;
    private double safetyScore;
    private double fineAmount;
    private double summaryAmount;

    public TecSettlement() {
        this.createTime = new Date();
    }

    public double getMgrScore() {
        return mgrScore;
    }

    public void setMgrScore(double mgrScore) {
        this.mgrScore = mgrScore;
    }

    public double getProgressScore() {
        return progressScore;
    }

    public void setProgressScore(double progressScore) {
        this.progressScore = progressScore;
    }

    public double getQualityScore() {
        return qualityScore;
    }

    public void setQualityScore(double qualityScore) {
        this.qualityScore = qualityScore;
    }

    public double getSafetyScore() {
        return safetyScore;
    }

    public void setSafetyScore(double safetyScore) {
        this.safetyScore = safetyScore;
    }

    public double getFineAmount() {
        return fineAmount;
    }

    public void setFineAmount(double fineAmount) {
        this.fineAmount = fineAmount;
        setSummaryAmount();
    }

    public double getSummaryAmount() {
        return summaryAmount;
    }

    private void setSummaryAmount() {
        this.summaryAmount = amount - fineAmount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
        setSummaryAmount();
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

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
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

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }


}
