package com.iflat.code.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.service.BaseService;
import com.iflat.code.bean.*;

/**
 * Created by tyriv on 2016/1/18.
 */
public class CodeAction extends BaseAction {

    private Team team;
    private BaseService teamService;
    private Employee employee;
    private BaseService employeeService;
    private Worker worker;
    private BaseService workerService;
    private Group group;
    private BaseService groupService;
    private CardInfo cardInfo;
    private BaseService cardInfoService;

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

    public String listEmployee() throws Exception {
        this.result.setList(this.employeeService.list(this.employee));
        return SUCCESS;
    }

    public String listCardInfo() throws Exception {
        this.result.setList(this.cardInfoService.list(this.cardInfo));
        return SUCCESS;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public BaseService getEmployeeService() {
        return employeeService;
    }

    public void setEmployeeService(BaseService employeeService) {
        this.employeeService = employeeService;
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

    public CardInfo getCardInfo() {
        return cardInfo;
    }

    public void setCardInfo(CardInfo cardInfo) {
        this.cardInfo = cardInfo;
    }

    public BaseService getCardInfoService() {
        return cardInfoService;
    }

    public void setCardInfoService(BaseService cardInfoService) {
        this.cardInfoService = cardInfoService;
    }
}
