package com.iflat.sm.entity;

import java.util.Date;

/**
 * Created by tyriv on 2016/4/5.
 */
public class SbSettlementVo {

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
    private String idDetl;
    private String accountDetl;  // 成本科目 拼板/成型/物耗补贴/餐费...
    private String contentDetl;  // 工程内容
    private double matQtyDetl;  // 物量
    private String specDetl;  // 规格
    private String unitDetl;  // 单位
    private double priceDetl;  // 单价
    private double amountDetl;  // 金额
    private String attachmentDetl;
    private String commentDetl;
    private String creatorAccDetl;
    private String creatorNameDetl;
    private Date createTimeDetl;
    private Date settlementTime;

    public Date getSettlementTime() {
        return settlementTime;
    }

    public void setSettlementTime(Date settlementTime) {
        this.settlementTime = settlementTime;
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

    public String getIdDetl() {
        return idDetl;
    }

    public void setIdDetl(String idDetl) {
        this.idDetl = idDetl;
    }

    public String getAccountDetl() {
        return accountDetl;
    }

    public void setAccountDetl(String accountDetl) {
        this.accountDetl = accountDetl;
    }

    public String getContentDetl() {
        return contentDetl;
    }

    public void setContentDetl(String contentDetl) {
        this.contentDetl = contentDetl;
    }

    public double getMatQtyDetl() {
        return matQtyDetl;
    }

    public void setMatQtyDetl(double matQtyDetl) {
        this.matQtyDetl = matQtyDetl;
    }

    public String getSpecDetl() {
        return specDetl;
    }

    public void setSpecDetl(String specDetl) {
        this.specDetl = specDetl;
    }

    public String getUnitDetl() {
        return unitDetl;
    }

    public void setUnitDetl(String unitDetl) {
        this.unitDetl = unitDetl;
    }

    public double getPriceDetl() {
        return priceDetl;
    }

    public void setPriceDetl(double priceDetl) {
        this.priceDetl = priceDetl;
    }

    public double getAmountDetl() {
        return amountDetl;
    }

    public void setAmountDetl(double amountDetl) {
        this.amountDetl = amountDetl;
    }

    public String getAttachmentDetl() {
        return attachmentDetl;
    }

    public void setAttachmentDetl(String attachmentDetl) {
        this.attachmentDetl = attachmentDetl;
    }

    public String getCommentDetl() {
        return commentDetl;
    }

    public void setCommentDetl(String commentDetl) {
        this.commentDetl = commentDetl;
    }

    public String getCreatorAccDetl() {
        return creatorAccDetl;
    }

    public void setCreatorAccDetl(String creatorAccDetl) {
        this.creatorAccDetl = creatorAccDetl;
    }

    public String getCreatorNameDetl() {
        return creatorNameDetl;
    }

    public void setCreatorNameDetl(String creatorNameDetl) {
        this.creatorNameDetl = creatorNameDetl;
    }

    public Date getCreateTimeDetl() {
        return createTimeDetl;
    }

    public void setCreateTimeDetl(Date createTimeDetl) {
        this.createTimeDetl = createTimeDetl;
    }
}
