package com.iflat.system.dao.impl;

import com.iflat.system.bean.Operating;
import com.iflat.system.dao.OperatingDao;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/11/14.
 */
public class OperatingDaoImpl implements OperatingDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insert(Operating operating) throws Exception {
        return getSqlSessionTemplate().insert("System.Operating.insert", operating);
    }

    @Override
    public int update(Operating operating) throws Exception {
        return getSqlSessionTemplate().update("System.Operating.update", operating);
    }

    @Override
    public int delete(Operating operating) throws Exception {
        return getSqlSessionTemplate().delete("System.Operating.delete", operating);
    }

    @Override
    public List listOfModule(Operating operating) throws Exception {
        return getSqlSessionTemplate().selectList("System.Operating.listOfModule", operating);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
