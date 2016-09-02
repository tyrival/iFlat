package com.iflat.pam.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/29.
 */
public class Member {

    private String id;
    private String account;
    private String dept;
    private String name;
    private String sex;
    private Date birth;
    private String nation;  // 民族--
    private String birthplace;  // 籍贯--
    private Date joinParty;  // 入党时间
    private Date becomeFullMember;  // 转正时间
    private Date startWorking;  // 工作时间
    private String idCardNo;  // 身份证
    private String diploma;  // 学历--
    private String degree;  // 学位--
    private Date enrolment;  // 入学时间--
    private Date graduation;  // 毕业时间--
    private String adminTitle;  // 技术职务
    private String pbName;  // 党支部名
    private String type;  // 正式党员/预备党员
    private String source;  // 来源 HRP/手工

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
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

    public Date getJoinParty() {
        return joinParty;
    }

    public void setJoinParty(Date joinParty) {
        this.joinParty = joinParty;
    }

    public Date getBecomeFullMember() {
        return becomeFullMember;
    }

    public void setBecomeFullMember(Date becomeFullMember) {
        this.becomeFullMember = becomeFullMember;
    }

    public Date getStartWorking() {
        return startWorking;
    }

    public void setStartWorking(Date startWorking) {
        this.startWorking = startWorking;
    }

    public String getIdCardNo() {
        return idCardNo;
    }

    public void setIdCardNo(String idCardNo) {
        this.idCardNo = idCardNo;
    }

    public String getDiploma() {
        return diploma;
    }

    public void setDiploma(String diploma) {
        this.diploma = diploma;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
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

    public String getAdminTitle() {
        return adminTitle;
    }

    public void setAdminTitle(String adminTitle) {
        this.adminTitle = adminTitle;
    }

    public String getPbName() {
        return pbName;
    }

    public void setPbName(String pbName) {
        this.pbName = pbName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
