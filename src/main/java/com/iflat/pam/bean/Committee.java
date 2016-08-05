package com.iflat.pam.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/7/29.
 */
public class Committee {

    private String id;
    private String pbName;
    private Date electionTime;
    private int people;

    public int getPeople() {
        return people;
    }

    public void setPeople(int people) {
        this.people = people;
    }

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

    public Date getElectionTime() {
        return electionTime;
    }

    public void setElectionTime(Date electionTime) {
        this.electionTime = electionTime;
    }
}
