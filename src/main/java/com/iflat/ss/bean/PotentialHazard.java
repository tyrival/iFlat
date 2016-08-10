package com.iflat.ss.bean;

import java.util.Date;

/**
 * 隐患
 */
public class PotentialHazard {
    private String id;
    private Date date;
    private String time;
    private String riskLvl;
    private String phType;
    private String phCode;
    private String dept;
    private String team;
    private String groupName;
    private String title;  // 岗位
    private String personAcc;
    private String personName;
    private int age;
    private int seniority;  // 工龄
    private String sex;
    private String projNo;
    private String projName;
    private String area;  // 区域
    private String position;  // 位置
    private String description;
    private String measure;  // 整改措施
    private String deadline;  // 整改期限：立即整改/限期整改
    private String feedback;  // 整改情况：已整改/空白
    private double amount;  // 罚款
    private String busiDivision;  // 事业部
    private String projMgr;  // 总管
    private String profMgr;  // 主管
    private String workMgr;  // 作业张
    private String teamLeader;  // 班组长
    private String posiMgr;  // 档长
    private double score;
    private String attachment;
    private String rectifyAtt;  // 整改后照片
    private String comment;
    private String creatorAcc;
    private String creatorName;
    private String creatorDept;
    private Date createTime;

    private Date fromDate;
    private Date toDate;

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

    public String getRiskLvl() {
        return riskLvl;
    }

    public void setRiskLvl(String riskLvl) {
        this.riskLvl = riskLvl;
    }

    public String getPhType() {
        return phType;
    }

    public void setPhType(String phType) {
        this.phType = phType;
    }

    public String getPhCode() {
        return phCode;
    }

    public void setPhCode(String phCode) {
        this.phCode = phCode;
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

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getSeniority() {
        return seniority;
    }

    public void setSeniority(int seniority) {
        this.seniority = seniority;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
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

    public String getMeasure() {
        return measure;
    }

    public void setMeasure(String measure) {
        this.measure = measure;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getBusiDivision() {
        return busiDivision;
    }

    public void setBusiDivision(String busiDivision) {
        this.busiDivision = busiDivision;
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

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
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
