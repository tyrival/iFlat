package com.iflat.pam.bean;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by tyriv on 2016/7/29.
 */
public class YearWork {

    private String id;
    private String type;  // 类型：计划/总结
    private Date year;
    private String pbName;
    private String content;
    private String attachment;
    private String status;
    private String creatorAcc;
    private String creatorName;
    private Date createrTime;

    private String text;
    private String parentId;
    private boolean leaf;

    public YearWork() {
        leaf = true;
    }

    public String getText() {
        return text;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
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

    public Date getYear() {
        return year;
    }

    public void setYear(Date year) {
        this.year = year;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
        this.text = sdf.format(year);
    }

    public String getPbName() {
        return pbName;
    }

    public void setPbName(String pbName) {
        this.pbName = pbName;
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

    public Date getCreaterTime() {
        return createrTime;
    }

    public void setCreaterTime(Date createrTime) {
        this.createrTime = createrTime;
    }
}
