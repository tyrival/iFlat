package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SrSettlementDetlSecond {

    private String id;
    private String pid;
    private String content;
    private String type;
    private double qty1;
    private double qty2;
    private double qty3;
    private double qty4;
    private double qty5;
    private double qty6;
    private double amount;
    private String attachment;
    private String comment;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public SrSettlementDetlSecond() {
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
