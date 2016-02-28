package com.iflat.system.dao.impl;

import com.iflat.system.bean.Memo;
import com.iflat.system.dao.MemoDao;
import org.mybatis.spring.SqlSessionTemplate;

/**
 * Created by tyriv on 2015/11/10.
 */
public class MemoDaoImpl implements MemoDao {

    private SqlSessionTemplate sqlSessionTemplate;
    @Override
    public int insert(Memo memo) throws Exception {
        return getSqlSessionTemplate().insert("System.Memo.insert", memo);
    }

    @Override
    public int update(Memo memo) throws Exception {
        return getSqlSessionTemplate().update("System.Memo.update", memo);
    }

    @Override
    public Memo get(String account) throws Exception {
        return getSqlSessionTemplate().selectOne("System.Memo.get", account);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
