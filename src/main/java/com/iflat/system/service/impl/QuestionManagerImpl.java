package com.iflat.system.service.impl;

import com.iflat.system.bean.Question;
import com.iflat.system.dao.QuestionDao;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.QuestionManager;
import com.iflat.util.Session;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/11.
 */
public class QuestionManagerImpl implements QuestionManager {

    private QuestionDao questionDao;

    @Override
    public Question save(Question question) throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        if(question.getAskUserName() == null || "".equals(question.getAskUserName())) {
            question.setAskAccount(userInfoVo.getAccount());
            question.setAskUserName(userInfoVo.getUserName());
        }
        if(question.getAskOrgName() == null || "".equals(question.getAskOrgName())) {
            question.setAskOrgId(userInfoVo.getOrgId());
            question.setAskOrgName(userInfoVo.getOrgName());
        }
        question.setCreateAccount(userInfoVo.getAccount());
        question.setCreateUserName(userInfoVo.getUserName());
        question.setStatus("待处理");
        question.setCreateTime(new Date());

        int i = 0;
        if(question.getQuId() == null || "".equals(question.getQuId())) {
            question.setQuId(UUID.randomUUID().toString());
            i = this.questionDao.insert(question);
        } else {
            i = this.questionDao.update(question);
        }
        return i > 0 ? question : null;
    }

    @Override
    public Question solve(Question question) throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        question.setAnsAccount(userInfoVo.getAccount());
        question.setAnsUserName(userInfoVo.getUserName());
        question.setStatus("完成");
        question.setCompleteTime(new Date());
        int i = this.questionDao.update(question);
        return i > 0 ? question : null;
    }

    @Override
    public String delete(String quId) throws Exception {
        int i = this.questionDao.delete(quId);
        return i > 0 ? quId : null;
    }

    @Override
    public List<Question> list(Question question) throws Exception {
        return this.questionDao.list(question);
    }

    @Override
    public List<Question> listOwn(Question question) throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        question.setAskAccount(userInfoVo.getAccount());
        question.setAnsAccount(userInfoVo.getAccount());
        question.setStatus("待处理");
        return this.questionDao.list(question);
    }

    public QuestionDao getQuestionDao() {
        return questionDao;
    }

    public void setQuestionDao(QuestionDao questionDao) {
        this.questionDao = questionDao;
    }
}
