package com.iflat.report.bean.wip.manhour;

import java.util.Date;

/**
 * Created by tyriv on 2015/12/21.
 */
public class WoStatus {

    //工号
    private String projNo;
    //派工单类型
    private String type;
    //船名
    private String name;
    //派工单号
    private String woNo;
    //内容
    private String description;
    //开单时间
    private Date createTime;
    //施工部门
    private String dept;
    //施工队
    private String team;
    //施工班组
    private String group;
    //开单人员
    private String createUser;
    //工程单审核
    private boolean mgrConfirm;
    //结算审核
    private boolean balConfirm;
    //是否完工
    private boolean hasComplete;
    //是否已定额
    private boolean hasQuota;
    //定额工时
    private Double quota;
    //是否有反馈
    private boolean hasActual;
    //已打印
    private boolean printed;
    //定额员审核
    private boolean finalConfirm;

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWoNo() {
        return woNo;
    }

    public void setWoNo(String woNo) {
        this.woNo = woNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public boolean isMgrConfirm() {
        return mgrConfirm;
    }

    public void setMgrConfirm(boolean mgrConfirm) {
        this.mgrConfirm = mgrConfirm;
    }

    public boolean isHasComplete() {
        return hasComplete;
    }

    public void setHasComplete(boolean hasComplete) {
        this.hasComplete = hasComplete;
    }

    public boolean isHasQuota() {
        return hasQuota;
    }

    public void setHasQuota(boolean hasQuota) {
        this.hasQuota = hasQuota;
    }

    public boolean isHasActual() {
        return hasActual;
    }

    public void setHasActual(boolean hasActual) {
        this.hasActual = hasActual;
    }

    public boolean isBalConfirm() {
        return balConfirm;
    }

    public void setBalConfirm(boolean balConfirm) {
        this.balConfirm = balConfirm;
    }

    public boolean isPrinted() {
        return printed;
    }

    public void setPrinted(boolean printed) {
        this.printed = printed;
    }

    public boolean isFinalConfirm() {
        return finalConfirm;
    }

    public void setFinalConfirm(boolean finalConfirm) {
        this.finalConfirm = finalConfirm;
    }

    public Double getQuota() {
        return quota;
    }

    public void setQuota(Double quota) {
        this.quota = quota;
    }
}
