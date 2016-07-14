package com.iflat.pm.entity;

import java.util.Date;

/**
 * Created by tyriv on 2016/5/28.
 */
public class ItemInfo {

    private String id;
    private String pid;
    private String type;  // 项目、年度、月度、周
    private String content;
    private String status;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;
    private Date completeTime;
    private Date deadline;
    private String projType;
    private String projName;
    private String projDescription;
    private String projStatus;
    private String projCreatorAcc;
    private String projCreatorName;
    private Date projCreateTime;
    private Date projCompleteTime;
    private Date projDeadline;
    private int projLevel;
    private String trxAccount;
    private String trxUserName;
    private int overDue;  // 超期天数

    public int getOverDue() {
        return overDue;
    }

    private void setOverDue() {
        int dl = (int) this.deadline.getTime();
        int now = (int) new Date().getTime();
        if (now > dl) {
            this.overDue = (now - dl) / (1000 * 3600 * 24);
        }
    }

    public int getProjLevel() {
        return projLevel;
    }

    public void setProjLevel(int projLevel) {
        this.projLevel = projLevel;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public Date getCompleteTime() {
        return completeTime;
    }

    public void setCompleteTime(Date completeTime) {
        this.completeTime = completeTime;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getProjType() {
        return projType;
    }

    public void setProjType(String projType) {
        this.projType = projType;
    }

    public String getProjName() {
        return projName;
    }

    public void setProjName(String projName) {
        this.projName = projName;
    }

    public String getProjDescription() {
        return projDescription;
    }

    public void setProjDescription(String projDescription) {
        this.projDescription = projDescription;
    }

    public String getProjStatus() {
        return projStatus;
    }

    public void setProjStatus(String projStatus) {
        this.projStatus = projStatus;
    }

    public String getProjCreatorAcc() {
        return projCreatorAcc;
    }

    public void setProjCreatorAcc(String projCreatorAcc) {
        this.projCreatorAcc = projCreatorAcc;
    }

    public String getProjCreatorName() {
        return projCreatorName;
    }

    public void setProjCreatorName(String projCreatorName) {
        this.projCreatorName = projCreatorName;
    }

    public Date getProjCreateTime() {
        return projCreateTime;
    }

    public void setProjCreateTime(Date projCreateTime) {
        this.projCreateTime = projCreateTime;
    }

    public Date getProjCompleteTime() {
        return projCompleteTime;
    }

    public void setProjCompleteTime(Date projCompleteTime) {
        this.projCompleteTime = projCompleteTime;
    }

    public Date getProjDeadline() {
        return projDeadline;
    }

    public void setProjDeadline(Date projDeadline) {
        this.projDeadline = projDeadline;
        setOverDue();
    }

    public String getTrxAccount() {
        return trxAccount;
    }

    public void setTrxAccount(String trxAccount) {
        this.trxAccount = trxAccount;
    }

    public String getTrxUserName() {
        return trxUserName;
    }

    public void setTrxUserName(String trxUserName) {
        this.trxUserName = trxUserName;
    }
}
