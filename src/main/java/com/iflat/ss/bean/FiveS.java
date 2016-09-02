package com.iflat.ss.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/5.
 */
public class FiveS {

    private String id;
    private Date date;
    private String time;
    private String funcDept;  // 职能部门，不包含车间
    private String areaType;
    private String area;
    private String code;
    private String otherArea;
    private String projNo;
    private String projName;
    private String region;  // 部位
    private String belongDept;  // 所属部门，对此记录进行责任分解
    private String regionPersonAcc;
    private String regionPersonName;
    private String fsType;
    private String fsDescription;
    private String attachment;
    private String description;

    private String dept;  // 责任部门
    private String team;
    private String personAcc;
    private String personName;
    private String feedback;  // 整改情况：已整改/空白
    private Date rectifyTime;
    private String rectifyAtt;
    private String comment;

    private String creatorAcc;
    private String creatorName;
    private String creatorDept;
    private Date createTime;

    private Date fromDate;
    private Date toDate;

    private double score;
    private double amount;
    private String issueDept;
    private String issuer;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getIssueDept() {
        return issueDept;
    }

    public void setIssueDept(String issueDept) {
        this.issueDept = issueDept;
    }


    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getAreaType() {
        return areaType;
    }

    public void setAreaType(String areaType) {
        this.areaType = areaType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getFuncDept() {
        return funcDept;
    }

    public void setFuncDept(String funcDept) {
        this.funcDept = funcDept;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getOtherArea() {
        return otherArea;
    }

    public void setOtherArea(String otherArea) {
        this.otherArea = otherArea;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getProjName() {
        return projName;
    }

    public void setProjName(String projName) {
        this.projName = projName;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getBelongDept() {
        return belongDept;
    }

    public void setBelongDept(String belongDept) {
        this.belongDept = belongDept;
    }

    public String getRegionPersonAcc() {
        return regionPersonAcc;
    }

    public void setRegionPersonAcc(String regionPersonAcc) {
        this.regionPersonAcc = regionPersonAcc;
    }

    public String getRegionPersonName() {
        return regionPersonName;
    }

    public void setRegionPersonName(String regionPersonName) {
        this.regionPersonName = regionPersonName;
    }

    public String getFsType() {
        return fsType;
    }

    public void setFsType(String fsType) {
        this.fsType = fsType;
    }

    public String getFsDescription() {
        return fsDescription;
    }

    public void setFsDescription(String fsDescription) {
        this.fsDescription = fsDescription;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getPersonAcc() {
        return personAcc;
    }

    public void setPersonAcc(String personAcc) {
        this.personAcc = personAcc;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Date getRectifyTime() {
        return rectifyTime;
    }

    public void setRectifyTime(Date rectifyTime) {
        this.rectifyTime = rectifyTime;
    }

    public String getRectifyAtt() {
        return rectifyAtt;
    }

    public void setRectifyAtt(String rectifyAtt) {
        this.rectifyAtt = rectifyAtt;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public String getCreatorDept() {
        return creatorDept;
    }

    public void setCreatorDept(String creatorDept) {
        this.creatorDept = creatorDept;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
