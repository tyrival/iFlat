package com.iflat.report.bean.mm;

/**
 * Created by tyriv on 2015/12/14.
 */
public class MatQuato {

    private String projNo;
    private String category;
    private String unit;
    private double palletQuato;
    private double additionalQuato;
    private double design;
    private double material;
    private double construction;
    private double shipowner;
    private double outSourcing;
    private double lack;
    private double subsitution;
    private double subtotal;
    private double totalQuato;
    private double requisition;
    private double progress;

    public double getSubsitution() {
        return subsitution;
    }

    public void setSubsitution(double subsitution) {
        this.subsitution = subsitution;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getPalletQuato() {
        return palletQuato;
    }

    public void setPalletQuato(double palletQuato) {
        this.palletQuato = palletQuato;
    }

    public double getAdditionalQuato() {
        return additionalQuato;
    }

    public void setAdditionalQuato(double additionalQuato) {
        this.additionalQuato = additionalQuato;
    }

    public double getDesign() {
        return design;
    }

    public void setDesign(double design) {
        this.design = design;
        this.setSubtotal();
    }

    public double getMaterial() {
        return material;
    }

    public void setMaterial(double material) {
        this.material = material;
        this.setSubtotal();
    }

    public double getConstruction() {
        return construction;
    }

    public void setConstruction(double construction) {
        this.construction = construction;
        this.setSubtotal();
    }

    public double getShipowner() {
        return shipowner;
    }

    public void setShipowner(double shipowner) {
        this.shipowner = shipowner;
        this.setSubtotal();
    }

    public double getOutSourcing() {
        return outSourcing;
    }

    public void setOutSourcing(double outSourcing) {
        this.outSourcing = outSourcing;
        this.setSubtotal();
    }

    public double getLack() {
        return lack;
    }

    public void setLack(double lack) {
        this.lack = lack;
        this.setSubtotal();
    }

    public double getSubtotal() {
        return subtotal;
    }

    private void setSubtotal() {
        this.subtotal = this.design + this.material + this.construction + this.shipowner + this.outSourcing + this.lack;
    }

    public double getTotalQuato() {
        return totalQuato;
    }

    public void setTotalQuato(double totalQuato) {
        this.totalQuato = totalQuato;
        this.setProgress();
    }

    public double getRequisition() {
        return requisition;
    }

    public void setRequisition(double requisition) {
        this.requisition = requisition;
        this.setProgress();
    }

    public double getProgress() {
        return progress;
    }

    private void setProgress() {
        if(this.totalQuato != 0) {
            this.progress = this.requisition * 100 / this.totalQuato;
        }
    }
}
