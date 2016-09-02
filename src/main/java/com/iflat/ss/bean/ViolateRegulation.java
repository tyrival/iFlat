package com.iflat.ss.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/5.
 */
public class ViolateRegulation {

    private String id;
    private Date date;
    private String time;  // 时间
    private String riskLvl;  // 风险等级
    private String code;  // 隐患代码
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
    private String area;
    private String position;
    private String content;
    private String description;
    private String measure;  // 整改措施
    private String feedback;  // 整改情况：已整改/拒绝整改
    private double amount;  // 罚款
    private String busiDivision;  // 事业部
    private String projMgr;  // 总管
    private String profMgr;  // 主管
    private String workMgr;  // 作业张
    private String teamLeader;  // 班组长
    private String posiMgr;  // 档长
    private double score;
    private String training;  // 是否培训
    private double trainingEff;  // 培训分
    private String attachment;
    private String comment;
    private String rectifyAtt;  // 整改后照片

    private String creatorDept;  // 创建部门
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    private Date fromDate;
    private Date toDate;

    private String issueDept;
    private String issuer;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRectifyAtt() {
        return rectifyAtt;
    }

    public void setRectifyAtt(String rectifyAtt) {
        this.rectifyAtt = rectifyAtt;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getTraining() {
        return training;
    }

    public void setTraining(String training) {
        this.training = training;
    }

    public double getTrainingEff() {
        return trainingEff;
    }

    public void setTrainingEff(double trainingEff) {
        this.trainingEff = trainingEff;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCreatorDept() {
        return creatorDept;
    }

    public void setCreatorDept(String creatorDept) {
        this.creatorDept = creatorDept;
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
