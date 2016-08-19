package com.iflat.xr.bean;

/**
 * Created by tyriv on 2016/8/16.
 */
public class SrStandardPrice {

    private String id;
    private String code;
    private String category;
    private String content;
    private String specs;
    private double degree;
    private String comment;
    private String unit;
    private double quota;
    private double price;
    private boolean isQuota;  // 需定额

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSpecs() {
        return specs;
    }

    public void setSpecs(String specs) {
        this.specs = specs;
    }

    public double getDegree() {
        return degree;
    }

    public void setDegree(double degree) {
        this.degree = degree;
    }

    public double getQuota() {
        return quota;
    }

    public void setQuota(double quota) {
        this.quota = quota;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public boolean getIsQuota() {
        return isQuota;
    }

    public void setIsQuota(boolean isQuota) {
        this.isQuota = isQuota;
    }
}
