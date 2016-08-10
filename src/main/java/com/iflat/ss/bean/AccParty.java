package com.iflat.ss.bean;

/**
 * Created by tyriv on 2016/8/5.
 */
public class AccParty {

    private String id;
    private String accId;
    private String type;  // 肇事人/受害人/肇事+受害
    private String dept;
    private String team;
    private String groupName;
    private String title;
    private String personAcc;
    private String personName;
    private String opIdCardNo;
    private int age;
    private int seniority;  // 工龄
    private String sex;
    private String injuryLvl;  // 工伤等级

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

    public String getAccId() {
        return accId;
    }

    public void setAccId(String accId) {
        this.accId = accId;
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

    public String getOpIdCardNo() {
        return opIdCardNo;
    }

    public void setOpIdCardNo(String opIdCardNo) {
        this.opIdCardNo = opIdCardNo;
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

    public String getInjuryLvl() {
        return injuryLvl;
    }

    public void setInjuryLvl(String injuryLvl) {
        this.injuryLvl = injuryLvl;
    }
}
