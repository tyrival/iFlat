package com.iflat.report.entity;

/**
 * Created by tyriv on 2015/12/9.
 */
public class Pivot {

    private String left;
    private String leftSub;
    private String top;
    private Double value;

    public String getLeft() {
        return left;
    }

    public void setLeft(String left) {
        this.left = left;
    }

    public String getLeftSub() {
        return leftSub;
    }

    public void setLeftSub(String leftSub) {
        this.leftSub = leftSub;
    }

    public String getTop() {
        return top;
    }

    public void setTop(String top) {
        this.top = top;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
