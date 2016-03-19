package com.iflat.system.dao.impl;

import com.iflat.system.bean.UserRole;
import com.iflat.system.dao.UserRoleDao;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.entity.UserRoleVo;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public class UserRoleDaoImpl implements UserRoleDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insertBatch(List<UserRole> list) throws Exception {

        return getSqlSessionTemplate().insert("System.UserRole.insertBatchVo", list);
    }

    @Override
    public int update(UserRole userRole) throws Exception {
        return getSqlSessionTemplate().update("System.UserRole.update", userRole);
    }

    @Override
    public int deleteByAccount(String account) throws Exception {

        return getSqlSessionTemplate().delete("System.UserRole.deleteByAccount", account);
    }

    @Override
    public int deleteByRoleId(String roleId) throws Exception {

        return getSqlSessionTemplate().delete("System.UserRole.deleteByRoleId", roleId);
    }

    @Override
    public List<UserRole> listByRoleId(String roleId) throws Exception {

        return getSqlSessionTemplate().selectList("System.UserRole.listByRoleId", roleId);
    }

    @Override
    public List<UserRole> listByAccount(String account) throws Exception {

        return getSqlSessionTemplate().selectList("System.UserRole.listByAccount", account);
    }

    @Override
    public UserRole getByUR(UserRole userRole) throws Exception {
        return getSqlSessionTemplate().selectOne("System.UserRole.getByUR", userRole);
    }

    @Override
    public List<UserRoleVo> listVoByUser(UserInfoVo userInfoVo) throws Exception {

        return getSqlSessionTemplate().selectList("System.UserRole.listVoByUser", userInfoVo);
    }

    @Override
    public List<UserRoleVo> listVo() throws Exception {

        return getSqlSessionTemplate().selectList("System.UserRole.listVo");
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
