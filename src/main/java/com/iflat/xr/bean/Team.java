package com.iflat.xr.bean;

/**
 * Created by tyriv on 2016/7/2.
 */
public class Team {

    private String dept;
    private String team;
    private String type;  // 本工/外包工

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
