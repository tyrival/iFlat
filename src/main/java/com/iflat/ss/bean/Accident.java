package com.iflat.ss.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/5.
 */
public class Accident {

    private String id;
    private Date time;
    private String projNo;
    private String projName;
    private String area;
    private String position;
    private String description;
    private String accLvl;
    private String accType;
    private double loss;
    private String projMgr;
    private String profMgr;
    private String workMgr;
    private String teamLeader;
    private String posiMgr;
    private String rptAtt;
    private String otherAtt;
    private String comment;

    private String creatorAcc;
    private String creatorName;
    private String creatorDept;
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

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
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

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccLvl() {
        return accLvl;
    }

    public void setAccLvl(String accLvl) {
        this.accLvl = accLvl;
    }

    public String getAccType() {
        return accType;
    }

    public void setAccType(String accType) {
        this.accType = accType;
    }

    public double getLoss() {
        return loss;
    }

    public void setLoss(double loss) {
        this.loss = loss;
    }

    public String getProjMgr() {
        return projMgr;
    }

    public void setProjMgr(String projMgr) {
        this.projMgr = projMgr;
    }

    public String getProfMgr() {
        return profMgr;
    }

    public void setProfMgr(String profMgr) {
        this.profMgr = profMgr;
    }

    public String getWorkMgr() {
        return workMgr;
    }

    public void setWorkMgr(String workMgr) {
        this.workMgr = workMgr;
    }

    public String getTeamLeader() {
        return teamLeader;
    }

    public void setTeamLeader(String teamLeader) {
        this.teamLeader = teamLeader;
    }

    public String getPosiMgr() {
        return posiMgr;
    }

    public void setPosiMgr(String posiMgr) {
        this.posiMgr = posiMgr;
    }

    public String getRptAtt() {
        return rptAtt;
    }

    public void setRptAtt(String rptAtt) {
        this.rptAtt = rptAtt;
    }

    public String getOtherAtt() {
        return otherAtt;
    }

    public void setOtherAtt(String otherAtt) {
        this.otherAtt = otherAtt;
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
