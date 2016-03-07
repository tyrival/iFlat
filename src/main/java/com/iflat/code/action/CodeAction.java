package com.iflat.code.action;

import com.iflat.code.bean.Group;
import com.iflat.code.bean.Team;
import com.iflat.code.bean.Worker;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatService;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2016/1/18.
 */
public class CodeAction extends ActionSupport implements ResultAware {

    private Result result;

    private Team team;
    private IflatService teamService;
    private Worker worker;
    private IflatService workerService;
    private Group group;
    private IflatService groupService;

    public String listWorker() throws Exception {
        this.result.setList(this.workerService.list(this.worker));
        return SUCCESS;
    }

    public String listTeam() throws Exception {
        this.result.setList(this.teamService.list(this.team));
        return SUCCESS;
    }

    public String listGroup() throws Exception {
        this.result.setList(this.groupService.list(this.group));
        return SUCCESS;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public IflatService getGroupService() {
        return groupService;
    }

    public void setGroupService(IflatService groupService) {
        this.groupService = groupService;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public IflatService getTeamService() {
        return teamService;
    }

    public void setTeamService(IflatService teamService) {
        this.teamService = teamService;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public IflatService getWorkerService() {
        return workerService;
    }

    public void setWorkerService(IflatService workerService) {
        this.workerService = workerService;
    }

    @Override
    public void setResult(Result result) {
        this.result = result;
    }

    public Result getResult() {
        return result;
    }
}
