package com.iflat.xr.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/2.
 */
public class SrSettlementDetl {

    private String id;
    private String pid;  // SrSettlement.id
    private String code;  // 标准工种分类编码
    private String category;  // 标准工种分类
    private boolean isQuota;  // 需定额
    private String specs;  // 规格
    private String unit;  // 单位
    private String applyContent;  // 申请内容
    private double applyQty;  // 申请数量
    private String adjustContent;  // 生产部确认内容
    private double adjustQty;  // 生产部确认数量
    private double quota;  // 定额
    private double degree;  // 难度系数
    private double priceFirst;  // 一级单价
    private double amountFirst;  // 一级总额，自动计算，需定额时为 定额*单价*难度系数；不需定额时为 确认数量*单价*难度系数
    private double priceSecond;  // 二级单价
    private double amountSecond;  // 二级总额，自动计算，需定额时为 定额*单价*难度系数；不需定额时为 确认数量*单价*难度系数
    private String comment;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    public boolean isQuota() {
        return isQuota;
    }

    public void setQuota(boolean quota) {
        isQuota = quota;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getApplyContent() {
        return applyContent;
    }

    public void setApplyContent(String applyContent) {
        this.applyContent = applyContent;
    }

    public double getApplyQty() {
        return applyQty;
    }

    public void setApplyQty(double applyQty) {
        this.applyQty = applyQty;
    }

    public String getAdjustContent() {
        return adjustContent;
    }

    public void setAdjustContent(String adjustContent) {
        this.adjustContent = adjustContent;
    }

    public double getAdjustQty() {
        return adjustQty;
    }

    public void setAdjustQty(double adjustQty) {
        this.adjustQty = adjustQty;
        setAmountFirst();
        setAmountSecond();
    }

    public double getQuota() {
        return quota;
    }

    public void setQuota(double quota) {
        this.quota = quota;
        setAmountFirst();
        setAmountSecond();
    }

    public double getDegree() {
        return degree;
    }

    public void setDegree(double degree) {
        this.degree = degree;
        setAmountFirst();
        setAmountSecond();
    }

    public double getPriceFirst() {
        return priceFirst;
    }

    public void setPriceFirst(double priceFirst) {
        this.priceFirst = priceFirst;
        setAmountFirst();
        setAmountSecond();
    }

    public double getAmountFirst() {
        return amountFirst;
    }

    private void setAmountFirst() {
        if (isQuota) {
            this.amountFirst = this.priceFirst * this.quota * this.degree;
        } else {
            this.amountFirst = this.priceFirst * this.adjustQty * this.degree;
        }
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
        if (isQuota) {
            this.amountSecond = this.priceSecond * this.quota * this.degree;
        } else {
            this.amountSecond = this.priceSecond * this.adjustQty * this.degree;
        }
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
