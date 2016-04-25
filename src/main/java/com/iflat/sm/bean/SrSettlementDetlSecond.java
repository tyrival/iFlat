package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SrSettlementDetlSecond {

    private String id;
    private String pid;  // SrSettlementSecond.id
    private String content;
    private String type;
    private String specs;
    private double settleQty1;
    private double settleQty2;
    private double settleQty3;
    private double settleQty4;
    private double settleQty5;
    private double settleQty6;
    private double settlePrice;
    private double settleAmount;
    private double qty1;
    private double qty2;
    private double qty3;
    private double qty4;
    private double qty5;
    private double qty6;
    private double price;
    private double amount;
    private String attachment;
    private String comment;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public SrSettlementDetlSecond() {
        this.createTime = new Date();
    }

    public SrSettlementDetlSecond(SrSettlementSecond head, SrSettlementDetlFirst first) {

        this.id = first.getId();
        this.pid = head.getId();
        this.content = first.getAdjustContent();
        this.type = first.getType();
        this.specs = first.getSpecs();
        this.settleQty1 = first.getSettleQty1();
        this.settleQty2 = first.getSettleQty2();
        this.settleQty3 = first.getSettleQty3();
        this.settleQty4 = first.getSettleQty4();
        this.settleQty5 = first.getSettleQty5();
        this.settleQty6 = first.getSettleQty6();
        this.settlePrice = first.getPrice();
        this.settleAmount = first.getAmount();
        this.creatorAcc = first.getCreatorAcc();
        this.creatorName = first.getCreatorName();
        this.createTime = new Date();
    }

    public void generateWithDetlFirst(SrSettlementDetlFirst first) {

        this.id = first.getId();
        this.content = first.getAdjustContent();
        this.type = first.getType();
        this.specs = first.getSpecs();
        this.settleQty1 = first.getSettleQty1();
        this.settleQty2 = first.getSettleQty2();
        this.settleQty3 = first.getSettleQty3();
        this.settleQty4 = first.getSettleQty4();
        this.settleQty5 = first.getSettleQty5();
        this.settleQty6 = first.getSettleQty6();
        this.settlePrice = first.getPrice();
        this.settleAmount = first.getAmount();
        this.creatorAcc = first.getCreatorAcc();
        this.creatorName = first.getCreatorName();
        this.createTime = new Date();
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

    public double getSettlePrice() {
        return settlePrice;
    }

    public void setSettlePrice(double settlePrice) {
        this.settlePrice = settlePrice;
    }

    public double getSettleAmount() {
        return settleAmount;
    }

    public void setSettleAmount(double settleAmount) {
        this.settleAmount = settleAmount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSpecs() {
        return specs;
    }

    public void setSpecs(String specs) {
        this.specs = specs;
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

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public double getQty1() {
        return qty1;
    }

    public void setQty1(double qty1) {
        this.qty1 = qty1;
    }

    public double getQty2() {
        return qty2;
    }

    public void setQty2(double qty2) {
        this.qty2 = qty2;
    }

    public double getQty3() {
        return qty3;
    }

    public void setQty3(double qty3) {
        this.qty3 = qty3;
    }

    public double getQty4() {
        return qty4;
    }

    public void setQty4(double qty4) {
        this.qty4 = qty4;
    }

    public double getQty5() {
        return qty5;
    }

    public void setQty5(double qty5) {
        this.qty5 = qty5;
    }

    public double getQty6() {
        return qty6;
    }

    public void setQty6(double qty6) {
        this.qty6 = qty6;
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
}
