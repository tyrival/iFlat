package com.iflat.pam.entity;

/**
 * Created by tyriv on 2016/8/5.
 */
public class MemberDist {
    private String pbName;
    private int memberFull;
    private int memberProb;
    private int applicant;
    private int activist;

    public String getPbName() {
        return pbName;
    }

    public void setPbName(String pbName) {
        this.pbName = pbName;
    }

    public int getMemberFull() {
        return memberFull;
    }

    public void setMemberFull(int memberFull) {
        this.memberFull = memberFull;
    }

    public int getMemberProb() {
        return memberProb;
    }

    public void setMemberProb(int memberProb) {
        this.memberProb = memberProb;
    }

    public int getApplicant() {
        return applicant;
    }

    public void setApplicant(int applicant) {
        this.applicant = applicant;
    }

    public int getActivist() {
        return activist;
    }

    public void setActivist(int activist) {
        this.activist = activist;
    }
}
