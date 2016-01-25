package com.iflat.report.bean.cst.sb;

/**
 * Created by tyriv on 2015/12/18.
 */
public class SbProjectCostCmps {

    private String projNo;
    private String name;
    private Double target;
    private Double actual;
    private Double difference;
    private Double diffPct;
    private Double targetPct;
    private Double actualPct;

    public SbProjectCostCmps() {
        this.target = 0.0;
        this.actual = 0.0;
        this.difference = 0.0;
        this.diffPct = 0.0;
        this.targetPct = 0.0;
        this.actualPct = 0.0;
    }

    public Double getTargetPct() {
        return targetPct;
    }

    public void setTargetPct(Double targetPct) {
        this.targetPct = targetPct;
    }

    public Double getActualPct() {
        return actualPct;
    }

    public void setActualPct(Double actualPct) {
        this.actualPct = actualPct;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getTarget() {
        return target;
    }

    public void setTarget(Double target) {
        this.target = target;
        this.setDifference();
    }

    public Double getActual() {
        return actual;
    }

    public void setActual(Double actual) {
        this.actual = actual;
        this.setDifference();
    }

    public Double getDifference() {
        return difference;
    }

    private void setDifference() {
        this.difference = this.actual - this.target;
        this.setDiffPct();
    }

    public Double getDiffPct() {
        return diffPct;
    }

    private void setDiffPct() {
        if(this.target != 0) {
            this.diffPct = this.difference / this.target;
        }
    }
}
