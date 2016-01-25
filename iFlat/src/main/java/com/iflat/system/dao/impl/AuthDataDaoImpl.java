package com.iflat.system.dao.impl;

import com.iflat.system.bean.AuthData;
import com.iflat.system.dao.AuthDataDao;
import com.iflat.system.entity.AuthClearVo;
import com.iflat.system.entity.AuthDataVo;
import com.iflat.system.entity.AuthDuplicateVo;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public class AuthDataDaoImpl implements AuthDataDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public AuthData insert(AuthData authModule) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().insert("System.AuthData.insert", authModule);
        return i == 1 ? authModule : null;
    }

    @Override
    public int insertDuplicate(List<AuthDuplicateVo> list) throws Exception {
        return getSqlSessionTemplate().insert("System.AuthData.insertDuplicate", list);
    }

    @Override
    public AuthData update(AuthData authModule) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().update("System.AuthData.update", authModule);
        return i == 1 ? authModule : null;
    }

    @Override
    public int delete(String amId) throws Exception {

        return getSqlSessionTemplate().delete("System.AuthData.delete", amId);
    }

    @Override
    public int deleteByDuplicate(List<AuthDuplicateVo> list) throws Exception {

        return getSqlSessionTemplate().delete("System.AuthData.deleteByDuplicate", list);
    }

    @Override
    public int deleteByClear(List<AuthClearVo> list) throws Exception {
        return getSqlSessionTemplate().delete("System.AuthData.deleteByClear", list);
    }

    @Override
    public AuthData get(AuthData authData) throws Exception {
        return getSqlSessionTemplate().selectOne("System.AuthData.get", authData);
    }

    @Override
    public List<AuthDataVo> listVoOfModuleByUser(AuthData authData) throws Exception {
        return getSqlSessionTemplate().selectList("System.AuthData.listVoOfModuleByUser", authData);
    }


    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
