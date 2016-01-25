package com.iflat.code.action;

import com.iflat.code.bean.Group;
import com.iflat.code.bean.Team;
import com.iflat.code.bean.Worker;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatManager;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2016/1/18.
 */
public class CodeAction extends ActionSupport implements ResultAware {

    private Result result;

    private Team team;
    private IflatManager teamManager;
    private Worker worker;
    private IflatManager workerManager;
    private Group group;
    private IflatManager groupManager;

    public String listWorker() throws Exception {
        this.result.setList(this.workerManager.list(this.worker));
        return SUCCESS;
    }

    public String listTeam() throws Exception {
        this.result.setList(this.teamManager.list(this.team));
        return SUCCESS;
    }

    public String listGroup() throws Exception {
        this.result.setList(this.groupManager.list(this.group));
        return SUCCESS;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public IflatManager getGroupManager() {
        return groupManager;
    }

    public void setGroupManager(IflatManager groupManager) {
        this.groupManager = groupManager;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public IflatManager getTeamManager() {
        return teamManager;
    }

    public void setTeamManager(IflatManager teamManager) {
        this.teamManager = teamManager;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public IflatManager getWorkerManager() {
        return workerManager;
    }

    public void setWorkerManager(IflatManager workerManager) {
        this.workerManager = workerManager;
    }

    @Override
    public void setResult(Result result) {
        this.result = result;
    }

    public Result getResult() {
        return result;
    }
}
