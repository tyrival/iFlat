package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/4/15.
 */
public class SrSettlementSecond {

    private String id;
    private String pid;  // SrSettlement.id
    private String type;  // 主体/零星/机电
    private Double progress;  // 工程进度
    private String projNo;
    private String projName;
    private String deptName;
    private String team;
    private double laborAmount;  // 人工费
    private double consumableAmount;  // 易耗品补贴
    private double performanceAmount;  // 绩效
    private double materialAmount;  // 材料费
    private double summaryAmount;
    private String attachment;
    private String comment;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public SrSettlementSecond() {
        this.createTime = new Date();
    }

    public SrSettlementSecond(SrSettlement srSettlement) {
        this.pid = srSettlement.getId();
        this.type = srSettlement.getType();
        this.progress = srSettlement.getProgress();
        this.projNo = srSettlement.getProjNo();
        this.projName = srSettlement.getProjName();
        this.deptName = srSettlement.getDeptName();
        this.team = srSettlement.getTeam();
        this.createTime = new Date();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getProgress() {
        return progress;
    }

    public void setProgress(Double progress) {
        this.progress = progress;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
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
        setSummaryAmount();
    }

    public double getConsumableAmount() {
        return consumableAmount;
    }

    public void setConsumableAmount(double consumableAmount) {
        this.consumableAmount = consumableAmount;
        setSummaryAmount();
    }

    public double getPerformanceAmount() {
        return performanceAmount;
    }

    public void setPerformanceAmount(double performanceAmount) {
        this.performanceAmount = performanceAmount;
        setSummaryAmount();
    }

    public double getMaterialAmount() {
        return materialAmount;
    }

    public void setMaterialAmount(double materialAmount) {
        this.materialAmount = materialAmount;
        setSummaryAmount();
    }

    public double getSummaryAmount() {
        return summaryAmount;
    }

    private void setSummaryAmount() {
        this.summaryAmount
                = consumableAmount + laborAmount + performanceAmount
                - materialAmount;
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
