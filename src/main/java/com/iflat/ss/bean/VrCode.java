package com.iflat.ss.bean;

/**
 * Created by tyriv on 2016/8/5.
 */
public class VrCode {

    private String id;
    private String riskLvl;
    private String code;
    private String description;
    private double amount;
    private double score;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRiskLvl() {
        return riskLvl;
    }

    public void setRiskLvl(String riskLvl) {
        this.riskLvl = riskLvl;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
