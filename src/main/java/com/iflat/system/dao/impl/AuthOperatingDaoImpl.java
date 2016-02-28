package com.iflat.system.dao.impl;

import com.iflat.system.dao.AuthOperatingDao;
import com.iflat.system.entity.AuthClearVo;
import com.iflat.system.entity.AuthDuplicateVo;
import com.iflat.system.entity.AuthOperatingVo;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public class AuthOperatingDaoImpl implements AuthOperatingDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insertBatch(List<AuthOperatingVo> authOperatingVoList) throws Exception {
        return getSqlSessionTemplate().insert("System.AuthOperating.insertBatch", authOperatingVoList);
    }

    @Override
    public int insertDuplicate(List<AuthDuplicateVo> list) throws Exception {
        return getSqlSessionTemplate().insert("System.AuthOperating.insertDuplicate", list);
    }

    @Override
    public int updateBatch(List<AuthOperatingVo> authOperatingVoList) throws Exception {
        return getSqlSessionTemplate().update("System.AuthOperating.updateBatch", authOperatingVoList);
    }

    @Override
    public int deleteByDuplicate(List<AuthDuplicateVo> list) throws Exception {

        return getSqlSessionTemplate().delete("System.AuthOperating.deleteByDuplicate", list);
    }

    @Override
    public int deleteByClear(List<AuthClearVo> list) throws Exception {

        return getSqlSessionTemplate().delete("System.AuthOperating.deleteByClear", list);
    }

    @Override
    public List<AuthOperatingVo> listVoByAuthOperatingVo(AuthOperatingVo authOperatingVo) throws Exception {

        return getSqlSessionTemplate().selectList("System.AuthOperating.listVoByAuthOperatingVo", authOperatingVo);
    }

    @Override
    public List<AuthOperatingVo> listVoOfModuleByUser(AuthOperatingVo authOperatingVo) throws Exception {

        return getSqlSessionTemplate().selectList("System.AuthOperating.listVoOfModuleByUser", authOperatingVo);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
