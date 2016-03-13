package com.iflat.sm.bean;

/**
 * Created by tyriv on 2016/3/10.
 */
public class SbRequest {

    private String id;
    private String projNo;
    private String projName;
    private String team;
    private int status; //流程状态 0 初始录入 / 1 开始审批 / 2 流程结束

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
