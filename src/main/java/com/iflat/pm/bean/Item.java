package com.iflat.pm.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/5/28.
 */
public class Item {
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
        setOverDue();
    }
}
