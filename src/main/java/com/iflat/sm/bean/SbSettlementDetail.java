package com.iflat.sm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/3/21.
 */
public class SbSettlementDetail {
    /**
     * 修改时需要查看pid的流程状态，如果不为0，则不允许增删改
     */
    private String id;
    private String pid;  // SbSettlementId
    private String account;  // 成本科目 拼板/成型/物耗补贴/餐费...
    private String content;  // 工程内容
    private double matQty;  // 物量
    private String spec;  // 规格
    private String unit;  // 单位
    private double price;  // 单价
    private double amount;  // 金额
    private String attachment;
    private String comment;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public SbSettlementDetail() {
        this.createTime = new Date();
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

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public double getMatQty() {
        return matQty;
    }

    public void setMatQty(double matQty) {
        this.matQty = matQty;
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
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
