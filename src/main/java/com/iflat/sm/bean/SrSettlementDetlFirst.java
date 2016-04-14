package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SrSettlementDetlFirst {

    private String id;
    private String pid;
    private String specs;  //规格
    private String type;  //类型

    // 申请内容
    private String applyContent;  // 施工内容
    private double applyQty1;
    private double applyQty2;
    private double applyQty3;
    private double applyQty4;
    private double applyQty5;
    private double applyQty6;

    // 调整（事业部）
    private String adjustContent;
    private double adjustQty1;
    private double adjustQty2;
    private double adjustQty3;
    private double adjustQty4;
    private double adjustQty5;
    private double adjustQty6;

    // 结算（经营部）
    private double settleQty1;
    private double settleQty2;
    private double settleQty3;
    private double settleQty4;
    private double settleQty5;
    private double settleQty6;
    private double price;
    private double amount;  // 结算金额

    private String attachment;
    private String comment;  // 备注
    private String creatorAcc;
    private String creatorName;
    private Date createTime;
    private String confirmAcc;
    private String confirmName;
    private Date confirmTime;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public SrSettlementDetlFirst() {
        this.createTime = new Date();
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
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

    public String getSpecs() {
        return specs;
    }

    public void setSpecs(String specs) {
        this.specs = specs;
    }

    public String getApplyContent() {
        return applyContent;
    }

    public void setApplyContent(String applyContent) {
        this.applyContent = applyContent;
    }

    public double getApplyQty1() {
        return applyQty1;
    }

    public void setApplyQty1(double applyQty1) {
        this.applyQty1 = applyQty1;
    }

    public double getApplyQty2() {
        return applyQty2;
    }

    public void setApplyQty2(double applyQty2) {
        this.applyQty2 = applyQty2;
    }

    public double getApplyQty3() {
        return applyQty3;
    }

    public void setApplyQty3(double applyQty3) {
        this.applyQty3 = applyQty3;
    }

    public double getApplyQty4() {
        return applyQty4;
    }

    public void setApplyQty4(double applyQty4) {
        this.applyQty4 = applyQty4;
    }

    public double getApplyQty5() {
        return applyQty5;
    }

    public void setApplyQty5(double applyQty5) {
        this.applyQty5 = applyQty5;
    }

    public double getApplyQty6() {
        return applyQty6;
    }

    public void setApplyQty6(double applyQty6) {
        this.applyQty6 = applyQty6;
    }

    public String getAdjustContent() {
        return adjustContent;
    }

    public void setAdjustContent(String adjustContent) {
        this.adjustContent = adjustContent;
    }

    public double getAdjustQty1() {
        return adjustQty1;
    }

    public void setAdjustQty1(double adjustQty1) {
        this.adjustQty1 = adjustQty1;
    }

    public double getAdjustQty2() {
        return adjustQty2;
    }

    public void setAdjustQty2(double adjustQty2) {
        this.adjustQty2 = adjustQty2;
    }

    public double getAdjustQty3() {
        return adjustQty3;
    }

    public void setAdjustQty3(double adjustQty3) {
        this.adjustQty3 = adjustQty3;
    }

    public double getAdjustQty4() {
        return adjustQty4;
    }

    public void setAdjustQty4(double adjustQty4) {
        this.adjustQty4 = adjustQty4;
    }

    public double getAdjustQty5() {
        return adjustQty5;
    }

    public void setAdjustQty5(double adjustQty5) {
        this.adjustQty5 = adjustQty5;
    }

    public double getAdjustQty6() {
        return adjustQty6;
    }

    public void setAdjustQty6(double adjustQty6) {
        this.adjustQty6 = adjustQty6;
    }

    public double getSettleQty1() {
        return settleQty1;
    }

    public void setSettleQty1(double settleQty1) {
        this.settleQty1 = settleQty1;
    }

    public double getSettleQty2() {
        return settleQty2;
    }

    public void setSettleQty2(double settleQty2) {
        this.settleQty2 = settleQty2;
    }

    public double getSettleQty3() {
        return settleQty3;
    }

    public void setSettleQty3(double settleQty3) {
        this.settleQty3 = settleQty3;
    }

    public double getSettleQty4() {
        return settleQty4;
    }

    public void setSettleQty4(double settleQty4) {
        this.settleQty4 = settleQty4;
    }

    public double getSettleQty5() {
        return settleQty5;
    }

    public void setSettleQty5(double settleQty5) {
        this.settleQty5 = settleQty5;
    }

    public double getSettleQty6() {
        return settleQty6;
    }

    public void setSettleQty6(double settleQty6) {
        this.settleQty6 = settleQty6;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
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

    public String getConfirmAcc() {
        return confirmAcc;
    }

    public void setConfirmAcc(String confirmAcc) {
        this.confirmAcc = confirmAcc;
    }

    public String getConfirmName() {
        return confirmName;
    }

    public void setConfirmName(String confirmName) {
        this.confirmName = confirmName;
    }

    public Date getConfirmTime() {
        return confirmTime;
    }

    public void setConfirmTime(Date confirmTime) {
        this.confirmTime = confirmTime;
    }
}
