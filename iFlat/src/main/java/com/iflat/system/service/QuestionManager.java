package com.iflat.system.service;

import com.iflat.system.bean.Question;

import java.util.List;

/**
 * Created by tyriv on 2015/11/11.
 */
public interface QuestionManager {

    public Question save(Question question) throws Exception;

    public Question solve(Question question) throws Exception;

    public String delete(String quId) throws Exception;

    public List<Question> list(Question question) throws Exception;

    public List<Question> listOwn(Question question) throws Exception;
}
