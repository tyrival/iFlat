package com.iflat.system.dao.impl;

import com.iflat.system.bean.Question;
import com.iflat.system.dao.QuestionDao;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/11/11.
 */
public class QuestionDaoImpl implements QuestionDao {

    private SqlSessionTemplate sqlSessionTemplate;
    
    @Override
    public int insert(Question question) throws Exception {
        return getSqlSessionTemplate().insert("System.Question.insert", question);
    }

    @Override
    public int update(Question question) throws Exception {
        return getSqlSessionTemplate().update("System.Question.update", question);
    }

    @Override
    public int delete(String quId) throws Exception {
        return getSqlSessionTemplate().delete("System.Question.delete", quId);
    }

    @Override
    public List<Question> list(Question question) throws Exception {
        return getSqlSessionTemplate().selectList("System.Question.select", question);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
