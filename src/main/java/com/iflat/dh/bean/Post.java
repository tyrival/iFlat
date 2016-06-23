package com.iflat.dh.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/5/28.
 */
public class Post {

    /*
    采用工作流，
    部门领导审批完后，提交给指定的处理人，
    处理人进行回复后，流程转向提交人，(增加一条Reply)
    提交人如果继续提问，流程再次循环到处理人，(增加一条Reply)
    直至提交人关闭问题，转至处理人，处理人填写问题产生原因、工时等信息后，结束流程
    */

    private String id;
    private String type;  // 类型：新增/修改...
    private String system;  // 系统名
    private String description;
    private String attachment;
    private String comment;
    private String tel;
    private String dept;
    private String status;
    private String creatorAcc;
    private String creatorName;
    private Date createTime;

    private String handlerAcc;
    private String handlerName;
    private double workhour;  // 工时
    private String reason;  // 问题产生原因

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSystem() {
        return system;
    }

    public void setSystem(String system) {
        this.system = system;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatorAcc() {
        return creatorAcc;
    }

    public void setCreatorAcc(String creatorAcc) {
        this.creatorAcc = creatorAcc;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getHandlerAcc() {
        return handlerAcc;
    }

    public void setHandlerAcc(String handlerAcc) {
        this.handlerAcc = handlerAcc;
    }

    public String getHandlerName() {
        return handlerName;
    }

    public void setHandlerName(String handlerName) {
        this.handlerName = handlerName;
    }

    public double getWorkhour() {
        return workhour;
    }

    public void setWorkhour(double workhour) {
        this.workhour = workhour;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}