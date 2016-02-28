package com.iflat.system.bean;

import java.util.Date;

/**
 * Created by tyriv on 2015/11/11.
 */
public class Question {

    private String quId;
    private String sysName;
    private String quContent;
    private String quAttachment;
    private String askAccount;
    private String askUserName;
    private String askOrgId;
    private String askOrgName;
    private String askContact;
    private String reason;
    private String ansContent;
    private String ansAttachment;
    private String ansAccount;
    private String ansUserName;
    private double workload;
    private String status;
    private String createAccount;
    private String createUserName;
    private Date createTime;
    private Date completeTime;

    public String getAnsUserName() {
        return ansUserName;
    }

    public void setAnsUserName(String ansUserName) {
        this.ansUserName = ansUserName;
    }

    public String getAskOrgName() {
        return askOrgName;
    }

    public void setAskOrgName(String askOrgName) {
        this.askOrgName = askOrgName;
    }

    public String getQuId() {
        return quId;
    }

    public void setQuId(String quId) {
        this.quId = quId;
    }

    public String getSysName() {
        return sysName;
    }

    public void setSysName(String sysName) {
        this.sysName = sysName;
    }

    public String getQuContent() {
        return quContent;
    }

    public void setQuContent(String quContent) {
        this.quContent = quContent;
    }

    public String getQuAttachment() {
        return quAttachment;
    }

    public void setQuAttachment(String quAttachment) {
        this.quAttachment = quAttachment;
    }

    public String getAskAccount() {
        return askAccount;
    }

    public void setAskAccount(String askAccount) {
        this.askAccount = askAccount;
    }

    public String getAskUserName() {
        return askUserName;
    }

    public void setAskUserName(String askUserName) {
        this.askUserName = askUserName;
    }

    public String getAskOrgId() {
        return askOrgId;
    }

    public void setAskOrgId(String askOrgId) {
        this.askOrgId = askOrgId;
    }

    public String getAskContact() {
        return askContact;
    }

    public void setAskContact(String askContact) {
        this.askContact = askContact;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getAnsContent() {
        return ansContent;
    }

    public void setAnsContent(String ansContent) {
        this.ansContent = ansContent;
    }

    public String getAnsAttachment() {
        return ansAttachment;
    }

    public void setAnsAttachment(String ansAttachment) {
        this.ansAttachment = ansAttachment;
    }

    public String getAnsAccount() {
        return ansAccount;
    }

    public void setAnsAccount(String ansAccount) {
        this.ansAccount = ansAccount;
    }

    public double getWorkload() {
        return workload;
    }

    public void setWorkload(double workload) {
        this.workload = workload;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreateAccount() {
        return createAccount;
    }

    public void setCreateAccount(String createAccount) {
        this.createAccount = createAccount;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getCompleteTime() {
        return completeTime;
    }

    public void setCompleteTime(Date completeTime) {
        this.completeTime = completeTime;
    }
}
