package com.iflat.code.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/13.
 */
public class Employee {

    private String account;
    private String name;
    private String sex;
    private String deptCode;
    private String deptName;
    private String teamCode;
    private String teamName;
    private String groupCode;
    private String groupName;
    private String category;  // 本工/劳务工
    private String type;  // 类型
    private String property;  // 用工性质
    private String title;  // 职位

    private String fullName;

    private String idCardNo;  // 身份证
    private Date birth;  // 生日
    private String nation;  // 民族--
    private String birthplace;  // 籍贯--
    private Date startWorking;  // 工作时间
    private Date becomeFullMember;  // 转正时间
    private Date enrolment;  // 入学时间--
    private Date graduation;  // 毕业时间--
    private Date joinParty;  // 入党时间
    //private String diploma;  // 学历--
    //private String degree;  // 学位--
    //private String partyType;  // 正式党员/预备党员

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getIdCardNo() {
        return idCardNo;
    }

    public void setIdCardNo(String idCardNo) {
        this.idCardNo = idCardNo;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getBirthplace() {
        return birthplace;
    }

    public void setBirthplace(String birthplace) {
        this.birthplace = birthplace;
    }

    public Date getStartWorking() {
        return startWorking;
    }

    public void setStartWorking(Date startWorking) {
        this.startWorking = startWorking;
    }

    public Date getBecomeFullMember() {
        return becomeFullMember;
    }

    public void setBecomeFullMember(Date becomeFullMember) {
        this.becomeFullMember = becomeFullMember;
    }

    public Date getEnrolment() {
        return enrolment;
    }

    public void setEnrolment(Date enrolment) {
        this.enrolment = enrolment;
    }

    public Date getGraduation() {
        return graduation;
    }

    public void setGraduation(Date graduation) {
        this.graduation = graduation;
    }

    public Date getJoinParty() {
        return joinParty;
    }

    public void setJoinParty(Date joinParty) {
        this.joinParty = joinParty;
    }

    public String getFullName() {
        return fullName;
    }

    private void setFullName() {
        this.fullName = this.account + " " + this.name;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
        setFullName();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        setFullName();
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getTeamCode() {
        return teamCode;
    }

    public void setTeamCode(String teamCode) {
        this.teamCode = teamCode;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getGroupCode() {
        return groupCode;
    }

    public void setGroupCode(String groupCode) {
        this.groupCode = groupCode;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
