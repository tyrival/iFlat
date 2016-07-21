package com.iflat.hr.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/6/21.
 */
public class Credit {

    private String id;
    private String type;  // 计划/能源/其他
    private Date date;
    private String projNo;
    private String projName;
    private String dept;  // 部门
    private String team;  // 施工队
    private String group;  // 施工班组
    private String personAcc;  // 人员
    private String personName;  // 人名
    private String description;  // 描述
    private String attachment;  //附件
    private double amount;
    private double score;
    private String comment;
    private String area;// 区域
    private String areaMgr;// 区域长
    private String manager;// 负责人
    private String groupMgr;// 班长
    private String projMgr;// 总管
    private String profMgr;// 主管
    private String workMgr;// 作业长
    private String feedback;  // 处理意见

    private String creatorAcc;  //录入人
    private String creatorName;  //录入人
    private String creatorDept;  //录入部门
    private Date createTime;  //录入日期

    private Date fromDate;
    private Date toDate;

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAreaMgr() {
        return areaMgr;
    }

    public void setAreaMgr(String areaMgr) {
        this.areaMgr = areaMgr;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getGroupMgr() {
        return groupMgr;
    }

    public void setGroupMgr(String groupMgr) {
        this.groupMgr = groupMgr;
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

    public String getCreatorDept() {
        return creatorDept;
    }

    public void setCreatorDept(String creatorDept) {
        this.creatorDept = creatorDept;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
