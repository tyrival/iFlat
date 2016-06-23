package com.iflat.dh.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.dh.bean.Post;
import com.iflat.dh.service.PostService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.iflat.workflow.service.WorkflowService;

/**
 * Created by tyriv on 2016/6/18.
 */
public class PostServiceImpl extends BaseServiceSupport implements PostService {

    private WorkflowService workflowService;

    @Override
    protected void beforeInsert() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        ((Post)this.saveObj).setDept(userInfoVo.getPorgName());
    }

    /**
     * 创建对象时，启动流程
     * @throws Exception
     */
    @Override
    protected void afterInsert() throws Exception {
        startProcess(this.saveObj);
    }

    @Override
    protected void beforeDelete() throws Exception {
        if (!"未提交".equals(((Post) this.deleteObj).getStatus())) {
            throw new Exception("无法删除已提交的数据");
        }
    }

    /**
     * 删除对象时，删除流程实例
     * @throws Exception
     */
    @Override
    protected void afterDelete() throws Exception {
        this.deleteProcessInstance(this.deleteObj);
    }

    /**
     * 将对象提交审批
     * @param post
     * @throws Exception
     */
    @Override
    public void submit(Post post) throws Exception {

        Post param = new Post();
        param.setId(post.getId());
        post = (Post) list(post).get(0);
        if (!"未提交".equals(post.getStatus())) {
            throw new Exception("此项目无法重复提交");
        }
        workflowService.completeTaskByBusinessKey(this.getBusinessKey(post));
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }
}
