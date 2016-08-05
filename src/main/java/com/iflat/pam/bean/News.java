package com.iflat.pam.bean;

import com.iflat.util.StringUtil;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/29.
 */
public class News {

    private String id;
    private String type;
    private String title;
    private String author;
    private String content;
    private String attachment;
    private double amount;
    private String isSubmit;
    private Date submitTime;
    private String submitAcc;
    private String submitName;
    private String submitDept;
    private String apprvAcc;
    private String apprvName;
    private Date apprvTime;
    private String isAdopt;
    private String secApprv;
    private String secApprvAcc;
    private String secApprvName;
    private Date secApprvTime;
    private String status;
    private String pbName;

    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    private Date fromDate;
    private Date toDate;

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getIsSubmit() {
        return isSubmit;
    }

    public void setIsSubmit(String isSubmit) {
        this.isSubmit = isSubmit;
    }

    public Date getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Date submitTime) {
        this.submitTime = submitTime;
    }

    public String getSubmitAcc() {
        return submitAcc;
    }

    public void setSubmitAcc(String submitAcc) {
        this.submitAcc = submitAcc;
    }

    public String getSubmitName() {
        return submitName;
    }

    public void setSubmitName(String submitName) {
        this.submitName = submitName;
    }

    public String getSubmitDept() {
        return submitDept;
    }

    public void setSubmitDept(String submitDept) {
        this.submitDept = submitDept;
    }

    public String getApprvAcc() {
        return apprvAcc;
    }

    public void setApprvAcc(String apprvAcc) {
        this.apprvAcc = apprvAcc;
    }

    public String getApprvName() {
        return apprvName;
    }

    public void setApprvName(String apprvName) {
        this.apprvName = apprvName;
    }

    public Date getApprvTime() {
        return apprvTime;
    }

    public void setApprvTime(Date apprvTime) {
        this.apprvTime = apprvTime;
    }

    public String getIsAdopt() {
        return isAdopt;
    }

    public void setIsAdopt(String isAdopt) {
        this.isAdopt = isAdopt;
    }

    public String getSecApprv() {
        return secApprv;
    }

    public void setSecApprv(String secApprv) {
        this.secApprv = secApprv;
    }

    public String getSecApprvAcc() {
        return secApprvAcc;
    }

    public void setSecApprvAcc(String secApprvAcc) {
        this.secApprvAcc = secApprvAcc;
    }

    public String getSecApprvName() {
        return secApprvName;
    }

    public void setSecApprvName(String secApprvName) {
        this.secApprvName = secApprvName;
    }

    public Date getSecApprvTime() {
        return secApprvTime;
    }

    public void setSecApprvTime(Date secApprvTime) {
        this.secApprvTime = secApprvTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPbName() {
        return pbName;
    }

    public void setPbName(String pbName) {
        this.pbName = pbName;
    }

    public String getCreatorAcc() {
        return creatorAcc;
    }

    public void setCreatorAcc(String creatorAcc) {
        this.creatorAcc = creatorAcc;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
