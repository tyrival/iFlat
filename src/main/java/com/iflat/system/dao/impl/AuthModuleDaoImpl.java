package com.iflat.system.dao.impl;

import com.iflat.system.bean.AuthModule;
import com.iflat.system.dao.AuthModuleDao;
import com.iflat.system.entity.AuthClearVo;
import com.iflat.system.entity.AuthDuplicateVo;
import com.iflat.system.entity.AuthModuleVo;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public class AuthModuleDaoImpl implements AuthModuleDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public AuthModule insert(AuthModule authModule) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().insert("System.AuthModule.insert", authModule);
        return i == 1 ? authModule : null;
    }

    @Override
    public int insertBatchVo(List<AuthModuleVo> list) throws Exception {

        return getSqlSessionTemplate().insert("System.AuthModule.insertBatch", list);
    }

    @Override
    public int insertDuplicate(List<AuthDuplicateVo> list) throws Exception {
        return getSqlSessionTemplate().insert("System.AuthModule.insertDuplicate", list);
    }

    @Override
    public AuthModule update(AuthModule authModule) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().update("System.AuthModule.update", authModule);
        return i == 1 ? authModule : null;
    }

    @Override
    public int updateBatch(List<AuthModule> list) throws Exception {

        return getSqlSessionTemplate().update("System.AuthModule.updateBatchVo", list);
    }

    @Override
    public int updateBatchVo(List<AuthModuleVo> list) throws Exception {

        return getSqlSessionTemplate().update("System.AuthModule.updateBatchVo", list);
    }

    @Override
    public int deleteByDuplicate(List<AuthDuplicateVo> list) throws Exception {

        return getSqlSessionTemplate().delete("System.AuthModule.deleteByDuplicate", list);
    }

    @Override
    public int deleteByClear(List<AuthClearVo> list) throws Exception {
        return getSqlSessionTemplate().delete("System.AuthModule.deleteByClear", list);
    }

    @Override
    public List<AuthModule> list(AuthModule authModule) throws Exception {

        return getSqlSessionTemplate().selectList("System.AuthModule.list", authModule);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
