package com.iflat.report.entity;

/**
 * Created by tyriv on 2015/12/7.
 */
public class BalanceQty {

    private String name;
    private double estimate;
    private double purchase;
    private double actual;
    private double difference;
    private double diffPct;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getEstimate() {
        return estimate;
    }

    public void setEstimate(double estimate) {
        this.estimate = estimate;
    }

    public double getPurchase() {
        return purchase;
    }

    public void setPurchase(double purchase) {
        this.purchase = purchase;
        this.setDifference();
    }

    public double getActual() {
        return actual;
    }

    public void setActual(double actual) {
        this.actual = actual;
        this.setDifference();
    }

    public double getDifference() {
        return difference;
    }

    private void setDifference() {
        this.difference = this.actual - this.estimate;
        this.setDiffPct();
    }

    public double getDiffPct() {
        return diffPct;
    }

    private void setDiffPct() {
        if(this.estimate != 0) {
            this.diffPct = this.difference / this.estimate;
        }
    }
}
