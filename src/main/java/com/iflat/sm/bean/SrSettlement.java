package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SrSettlement {

    private String id;
    private String type;  // 主体/零星/机电
    private double progress;  // 工程进度
    private String projNo;
    private String projName;
    private String deptName;
    private String team;  // 机电修理填写
    private double laborAmount;  // 人工费
    private double consumableAmount;  // 易耗品补贴
    private double performanceAmount;  // 绩效
    private double materialAmount;  // 材料费
    private double summaryAmount;
    private String attachment;
    private String comment;
    private String status;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;
    private String professionalMgrAcc;  // 主修
    private String settleFirstAcc;
    private String settleFirstName;
    private Date settleFirstTime;

    public String getSettleFirstAcc() {
        return settleFirstAcc;
    }

    public void setSettleFirstAcc(String settleFirstAcc) {
        this.settleFirstAcc = settleFirstAcc;
    }

    public String getSettleFirstName() {
        return settleFirstName;
    }

    public void setSettleFirstName(String settleFirstName) {
        this.settleFirstName = settleFirstName;
    }

    public Date getSettleFirstTime() {
        return settleFirstTime;
    }

    public void setSettleFirstTime(Date settleFirstTime) {
        this.settleFirstTime = settleFirstTime;
    }

    public String getProfessionalMgrAcc() {
        return professionalMgrAcc;
    }

    public void setProfessionalMgrAcc(String professionalMgrAcc) {
        this.professionalMgrAcc = professionalMgrAcc;
    }

    public double getProgress() {
        return progress;
    }

    public void setProgress(double progress) {
        this.progress = progress;
    }

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
