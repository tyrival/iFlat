package com.iflat.report.bean.bi;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by tyriv on 2016/2/18.
 */
public class CostItem {

    private BigInteger id;
    private String projNo;
    private String subject;
    private String year;
    private String month;
    private String deptCode;
    private String deptName;
    private String description;
    private Double quantity;
    private String unit;
    private Double amount;
    private String docNo;
    private Date time;

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDocNo() {
        return docNo;
    }

    public void setDocNo(String docNo) {
        this.docNo = docNo;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) throws ParseException {
        this.year = year;
        this.setTime();
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) throws ParseException {
        this.month = month;
        this.setTime();
    }

    public Date getTime() {
        return time;
    }

    private void setTime() throws ParseException {
        if (year != null && month != null) {
            String date = month.length() == 1 ? "0" + month : month;
            date = year + "-" + date + "-01 ";
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            this.time = sdf.parse(date);
        }
    }
}
