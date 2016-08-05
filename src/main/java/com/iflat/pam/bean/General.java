package com.iflat.pam.bean;

/**
 * Created by tyriv on 2016/7/29.
 */
public class General {

    private String id;
    private String pbName;
    private int deptMemberNum;  // 部门人数
    private int partyMemberNum;  // 党员人数
    private int partyGroupNum;  // 党小组数
    private int malePartyMember;  // 男党员数
    private int femalePartyMember;  // 女党员数
    private int groupWithoutParty;  // 无党员班组数
    private int comsomol;  // 团员数
    private String contact;  // 联络人
    private String phoneNum;  // 联系方式

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPbName() {
        return pbName;
    }

    public void setPbName(String pbName) {
        this.pbName = pbName;
    }

    public int getDeptMemberNum() {
        return deptMemberNum;
    }

    public void setDeptMemberNum(int deptMemberNum) {
        this.deptMemberNum = deptMemberNum;
    }

    public int getPartyMemberNum() {
        return partyMemberNum;
    }

    public void setPartyMemberNum(int partyMemberNum) {
        this.partyMemberNum = partyMemberNum;
    }

    public int getPartyGroupNum() {
        return partyGroupNum;
    }

    public void setPartyGroupNum(int partyGroupNum) {
        this.partyGroupNum = partyGroupNum;
    }

    public int getMalePartyMember() {
        return malePartyMember;
    }

    public void setMalePartyMember(int malePartyMember) {
        this.malePartyMember = malePartyMember;
    }

    public int getFemalePartyMember() {
        return femalePartyMember;
    }

    public void setFemalePartyMember(int femalePartyMember) {
        this.femalePartyMember = femalePartyMember;
    }

    public int getGroupWithoutParty() {
        return groupWithoutParty;
    }

    public void setGroupWithoutParty(int groupWithoutParty) {
        this.groupWithoutParty = groupWithoutParty;
    }

    public int getComsomol() {
        return comsomol;
    }

    public void setComsomol(int comsomol) {
        this.comsomol = comsomol;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }
}
