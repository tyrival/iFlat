package com.iflat.system.dao.impl;

import com.iflat.system.bean.DataDictionary;
import com.iflat.system.dao.DataDictionaryDao;
import com.iflat.system.entity.DataBase;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/10/16.
 */
public class DataDictionaryDaoImpl implements DataDictionaryDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insertByGenerate(List<DataBase> list) throws Exception {

        return getSqlSessionTemplate().insert("System.DataDictionary.insertByGenerate", list);
    }

    @Override
    public int update(DataDictionary dataDictionary) throws Exception {

        return getSqlSessionTemplate().update("System.DataDictionary.update", dataDictionary);
    }

    @Override
    public List<DataDictionary> list(DataDictionary dataDictionary) throws Exception {
        return getSqlSessionTemplate().selectList("System.DataDictionary.list", dataDictionary);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
