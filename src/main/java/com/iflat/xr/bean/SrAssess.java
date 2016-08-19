package com.iflat.xr.bean;


import java.util.Date;

/**
 * 条线考核
 */
public class SrAssess {

    private String id;
    private String settId;  // 结算单id
    private String type;  // 总管/生产部/安全/质量
    private double score;  // 打分
    private String description;  // 说明
    private String creatorAcc;  // 创建人
    private String creatorName;  // 创建人
    private Date createTime;  // 创建时间

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSettId() {
        return settId;
    }

    public void setSettId(String settId) {
        this.settId = settId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
