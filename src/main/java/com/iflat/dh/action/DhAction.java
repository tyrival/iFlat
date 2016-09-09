package com.iflat.dh.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.dh.bean.Post;
import com.iflat.dh.bean.Reply;
import com.iflat.dh.service.PostService;
import com.iflat.workflow.service.WorkflowService;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

/**
 * Created by tyriv on 2016/6/18.
 */
public class DhAction extends BaseAction implements ModelDriven<Page> {
    protected Page page;
    private File upload;
    private String uploadFileName;
    private PostService postService;
    private Post post;
    private BaseService replyService;
    private Reply reply;
    private WorkflowService workflowService;
    private String taskId;
    private String outGoingName;
    private String comment;

    public String approvePost() throws Exception {
        String businessKey = postService.getBusinessKey(post);
        workflowService.completeTaskByBusinessKey(businessKey, outGoingName, comment);
        return SUCCESS;
    }

    public String savePost() throws Exception {
        this.result.setObject(this.postService.save(this.post));
        return SUCCESS;
    }

    public String deletePost() throws Exception {
        this.result.setObject(this.postService.delete(this.post));
        return SUCCESS;
    }

    public String listPost() throws Exception {
        this.result.setList(this.postService.list(this.post));
        return SUCCESS;
    }

    public String uploadPost() throws Exception {
        this.result.setObject(this.postService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listPostComment() throws Exception {
        this.result.setList(this.postService.listComment(this.post));
        return SUCCESS;
    }

    public String submitPost() throws Exception {
        postService.submit(this.post);
        return SUCCESS;
    }

    public String saveAndSubmitPost() throws Exception {
        Post post = (Post) this.postService.save(this.post);
        postService.submit(this.post);
        this.result.setObject(post);
        return SUCCESS;
    }

    public String saveReply() throws Exception {
        this.result.setObject(this.replyService.save(this.reply));
        return SUCCESS;
    }

    public String deleteReply() throws Exception {
        this.result.setObject(this.replyService.delete(this.reply));
        return SUCCESS;
    }

    public String listReply() throws Exception {
        this.result.setList(this.replyService.list(this.reply));
        return SUCCESS;
    }

    public String uploadReply() throws Exception {
        this.result.setObject(this.replyService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public File getUpload() {
        return upload;
    }

    public void setUpload(File upload) {
        this.upload = upload;
    }

    public String getUploadFileName() {
        return uploadFileName;
    }

    public void setUploadFileName(String uploadFileName) {
        this.uploadFileName = uploadFileName;
    }

    public PostService getPostService() {
        return postService;
    }

    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public BaseService getReplyService() {
        return replyService;
    }

    public void setReplyService(BaseService replyService) {
        this.replyService = replyService;
    }

    public Reply getReply() {
        return reply;
    }

    public void setReply(Reply reply) {
        this.reply = reply;
    }

    public WorkflowService getWorkflowService() {
        return workflowService;
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getOutGoingName() {
        return outGoingName;
    }

    public void setOutGoingName(String outGoingName) {
        this.outGoingName = outGoingName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public Page getModel() {
        if (page == null) {
            page = new Page();
        }
        return page;
    }

}