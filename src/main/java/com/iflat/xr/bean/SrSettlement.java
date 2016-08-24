package com.iflat.xr.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/2.
 */
public class SrSettlement {

    private String id;
    private double progress;  // 工程进度
    private String projNo;  // 工号
    private String projName;  // 工程名
    private String dept;  // 部门
    private String team;  // 施工队
    private boolean isOutwork;  // 本工/外包工
    private double amountFirst;  // 一级工费
    private double amountSecond;  // 二级工费
    private double amountDiff;  // 盈亏
    private String attachment;  // 附件
    private String balApplAtt;  // 余额使用申请
    private String comment;  // 备注
    private String status;  // 状态
    private boolean isQuota;  // 需定额
    private String creatorAcc;  // 创建人
    private String creatorName;  // 创建人
    private Date createTime;  // 创建时间

    private String teamAcc;  // 工程队打卡确认
    private String teamName;  // 工程队打卡确认

    private double score;  // 综合分
    private String opinion;  // 说明意见
    private String settFirstAcc;  // 一级结算人
    private String settFirstName;  // 一级结算人
    private Date settFirstTime;  // 一级结算时间
    private Date settlementTime;  // 人力资源部结算月份

    private double discountRate;
    private double amountWithDiscount;

    public double getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(double discountRate) {
        this.discountRate = discountRate;
    }

    public double getAmountWithDiscount() {
        return amountWithDiscount;
    }

    public void setAmountWithDiscount(double amountWithDiscount) {
        this.amountWithDiscount = amountWithDiscount;
    }

    public double getAmountDiff() {
        return amountDiff;
    }

    private void setAmountDiff() {
        this.amountDiff = this.amountFirst - this.amountSecond;
    }

    public String getBalApplAtt() {
        return balApplAtt;
    }

    public void setBalApplAtt(String balApplAtt) {
        this.balApplAtt = balApplAtt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getProgress() {
        return progress;
    }

    public void setProgress(double progress) {
        this.progress = progress;
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

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public boolean getIsOutwork() {
        return isOutwork;
    }

    public void setIsOutwork(boolean isOutwork) {
        this.isOutwork = isOutwork;
    }

    public double getAmountFirst() {
        return amountFirst;
    }

    public void setAmountFirst(double amountFirst) {
        this.amountFirst = amountFirst;
        setAmountDiff();
    }

    public double getAmountSecond() {
        return amountSecond;
    }

    public void setAmountSecond(double amountSecond) {
        this.amountSecond = amountSecond;
        setAmountDiff();
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

    public boolean getIsQuota() {
        return isQuota;
    }

    public void setIsQuota(boolean isQuota) {
        this.isQuota = isQuota;
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

    public String getTeamAcc() {
        return teamAcc;
    }

    public void setTeamAcc(String teamAcc) {
        this.teamAcc = teamAcc;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }

    public String getSettFirstAcc() {
        return settFirstAcc;
    }

    public void setSettFirstAcc(String settFirstAcc) {
        this.settFirstAcc = settFirstAcc;
    }

    public String getSettFirstName() {
        return settFirstName;
    }

    public void setSettFirstName(String settFirstName) {
        this.settFirstName = settFirstName;
    }

    public Date getSettFirstTime() {
        return settFirstTime;
    }

    public void setSettFirstTime(Date settFirstTime) {
        this.settFirstTime = settFirstTime;
    }

    public Date getSettlementTime() {
        return settlementTime;
    }

    public void setSettlementTime(Date settlementTime) {
        this.settlementTime = settlementTime;
    }
}
