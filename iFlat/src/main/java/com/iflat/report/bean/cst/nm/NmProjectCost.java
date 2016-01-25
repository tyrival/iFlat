package com.iflat.report.bean.cst.nm;

/**
 * Created by tyriv on 2015/12/23.
 */
public class NmProjectCost {
    private String projNo;
    private String type;
    private Double estimate;
    private Double amount;
    private Double grossProfit;
    private Double profitMargin;

    public NmProjectCost() {
        this.estimate = 0.0;
        this.amount = 0.0;
        this.grossProfit = 0.0;
        this.profitMargin = 0.0;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getEstimate() {
        return estimate;
    }

    public void setEstimate(Double estimate) {
        this.estimate = estimate;
        this.setGrossProfit();
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
        this.setGrossProfit();
    }

    public Double getGrossProfit() {
        return grossProfit;
    }

    private void setGrossProfit() {
        this.grossProfit = this.estimate - this.amount;
        this.setProfitMargin();
    }

    public Double getProfitMargin() {
        return profitMargin;
    }

    private void setProfitMargin() {
        if(this.estimate != 0) {
            this.profitMargin = this.grossProfit * 100 / this.estimate;
        }
    }
}
