package com.iflat.pm.entity;

import java.util.Date;

/**
 * Created by tyriv on 2016/5/28.
 */
public class ProjectInfo {
    private String id;
    private String type;
    private String name;
    private String description;
    private String status;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;
    private Date completeTime;
    private Date deadline;
    private String mgrAcc;
    private String mgrName;
    private String mbrAccount;
    private String mbrUserName;
    private int level;
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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        setOverDue();
    }

    public String getMgrAcc() {
        return mgrAcc;
    }

    public void setMgrAcc(String mgrAcc) {
        this.mgrAcc = mgrAcc;
    }

    public String getMgrName() {
        return mgrName;
    }

    public void setMgrName(String mgrName) {
        this.mgrName = mgrName;
    }

    public String getMbrAccount() {
        return mbrAccount;
    }

    public void setMbrAccount(String mbrAccount) {
        this.mbrAccount = mbrAccount;
    }

    public String getMbrUserName() {
        return mbrUserName;
    }

    public void setMbrUserName(String mbrUserName) {
        this.mbrUserName = mbrUserName;
    }
}