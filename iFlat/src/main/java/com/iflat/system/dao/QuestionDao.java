package com.iflat.system.dao;

import com.iflat.system.bean.Question;

import java.util.List;

/**
 * Created by tyriv on 2015/11/11.
 */
public interface QuestionDao {
    
    public int insert(Question question) throws Exception;

    public int update(Question question) throws Exception;

    public int delete(String quId) throws Exception;

    public List<Question> list(Question question) throws Exception;
}
