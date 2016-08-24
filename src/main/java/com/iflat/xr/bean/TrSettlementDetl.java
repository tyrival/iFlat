package com.iflat.xr.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/2.
 */
public class TrSettlementDetl {

    private String id;
    private String pid;  // TrSettlement.id
    private String category;  // 标准工种分类
    private String specs;  // 规格
    private String unit;  // 单位
    private String content;  // 申请内容
    private double applyQty;  // 申请数量
    private String settUnit;  // 结算单位
    private double settleQtyFirst;  // 结算数量
    private double settleQtySecond;  // 结算数量
    private double degree;  // 难度系数
    private double priceFirst;  // 一级单价
    private double amountFirst;  // 一级总额
    private String settUnitSecond;  // 结算单位
    private double priceSecond;  // 二级单价
    private double amountSecond;  // 二级总额
    private double quota;  // 定额
    private String comment;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public String getSettUnitSecond() {
        return settUnitSecond;
    }

    public void setSettUnitSecond(String settUnitSecond) {
        this.settUnitSecond = settUnitSecond;
    }

    public double getQuota() {
        return quota;
    }

    public void setQuota(double quota) {
        this.quota = quota;
    }

    public String getSettUnit() {
        return settUnit;
    }

    public void setSettUnit(String settUnit) {
        this.settUnit = settUnit;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSpecs() {
        return specs;
    }

    public void setSpecs(String specs) {
        this.specs = specs;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public double getApplyQty() {
        return applyQty;
    }

    public void setApplyQty(double applyQty) {
        this.applyQty = applyQty;
    }

    public double getSettleQtyFirst() {
        return settleQtyFirst;
    }

    public void setSettleQtyFirst(double settleQtyFirst) {
        this.settleQtyFirst = settleQtyFirst;
        setAmountFirst();
    }

    public double getSettleQtySecond() {
        return settleQtySecond;
    }

    public void setSettleQtySecond(double settleQtySecond) {
        this.settleQtySecond = settleQtySecond;
        setAmountSecond();
    }

    public double getDegree() {
        return degree;
    }

    public void setDegree(double degree) {
        this.degree = degree;
        setAmountSecond();
    }

    public double getPriceFirst() {
        return priceFirst;
    }

    public void setPriceFirst(double priceFirst) {
        this.priceFirst = priceFirst;
        setAmountFirst();
    }

    public double getAmountFirst() {
        return amountFirst;
    }

    private void setAmountFirst() {

        this.amountFirst = this.priceFirst * this.settleQtyFirst;
    }

    public double getPriceSecond() {
        return priceSecond;
    }

    public void setPriceSecond(double priceSecond) {
        this.priceSecond = priceSecond;
        setAmountSecond();
    }

    public double getAmountSecond() {
        return amountSecond;
    }

    private void setAmountSecond() {
        this.amountSecond = this.priceSecond * this.settleQtySecond * this.degree;
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
