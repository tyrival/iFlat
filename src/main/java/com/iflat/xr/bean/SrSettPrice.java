package com.iflat.xr.bean;

/**
 * 标准结算单价
 */
public class SrSettPrice {

    private String id;
    private String code;
    private String category;
    private String comment;
    private String unit;
    private double price;
    private boolean isQuota;  // 需定额

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
}
