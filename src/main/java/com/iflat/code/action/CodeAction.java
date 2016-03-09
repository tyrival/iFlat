package com.iflat.code.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.service.BaseService;
import com.iflat.code.bean.Group;
import com.iflat.code.bean.Team;
import com.iflat.code.bean.Worker;

/**
 * Created by tyriv on 2016/1/18.
 */
public class CodeAction extends BaseAction {

    private Team team;
    private BaseService teamService;
    private Worker worker;
    private BaseService workerService;
    private Group group;
    private BaseService groupService;

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

    public BaseService getGroupService() {
        return groupService;
    }

    public void setGroupService(BaseService groupService) {
        this.groupService = groupService;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public BaseService getTeamService() {
        return teamService;
    }

    public void setTeamService(BaseService teamService) {
        this.teamService = teamService;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public BaseService getWorkerService() {
        return workerService;
    }

    public void setWorkerService(BaseService workerService) {
        this.workerService = workerService;
    }
}
