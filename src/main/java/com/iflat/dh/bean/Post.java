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
    private String type;
    private String system;
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
    private String workhour;
    private String reason;
}