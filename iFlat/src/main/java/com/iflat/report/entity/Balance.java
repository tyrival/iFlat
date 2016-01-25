package com.iflat.report.entity;

/**
 * Created by tyriv on 2015/12/2.
 */
public class Balance {

    private String name;
    private double estimate;
    private double target;
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

    public double getTarget() {
        return target;
    }

    public void setTarget(double target) {
        this.target = target;
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
        this.difference = this.actual - this.target;
        this.setDiffPct();
    }

    public double getDiffPct() {
        return diffPct;
    }

    private void setDiffPct() {
        if(this.target != 0) {
            this.diffPct = this.difference / this.target;
        }
    }
}
