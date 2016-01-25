package com.iflat.system.dao.impl;

import com.iflat.system.bean.User;
import com.iflat.system.dao.UserDao;
import com.iflat.system.entity.PasswordChange;
import com.iflat.system.entity.UserInfoVo;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/8/18.
 */
public class UserDaoImpl implements UserDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public User insert(User user) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().insert("System.User.insert", user);
        return i == 1 ? user : null;
    }

    @Override
    public User update(User user) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().update("System.User.update", user);
        return i == 1 ? user : null;
    }

    @Override
    public int updateByAccount(User user) throws Exception {
        return getSqlSessionTemplate().update("System.User.updateByAccount", user);
    }

    @Override
    public int changePassword(PasswordChange password) throws Exception {
        return getSqlSessionTemplate().update("System.User.changePassword", password);
    }

    @Override
    public int delete(String userId) throws Exception {

        return getSqlSessionTemplate().delete("System.User.delete", userId);
    }

    @Override
    public int deleteByAccount(String account) throws Exception {

        return getSqlSessionTemplate().delete("System.User.deleteByAccount", account);
    }

    @Override
    public User get(String userId) throws Exception {

        return getSqlSessionTemplate().selectOne("System.User.get", userId);
    }

    @Override
    public User getByAccount(String account) throws Exception {
        return getSqlSessionTemplate().selectOne("System.User.getByAccount", account);
    }

    @Override
    public List<UserInfoVo> listActiveUserInfoByAccount(String account) throws Exception {
        return getSqlSessionTemplate().selectList("System.User.listActiveUserInfoByAccount", account);
    }

    @Override
    public List<UserInfoVo> listVoByVo(UserInfoVo user) throws Exception {

        return getSqlSessionTemplate().selectList("System.User.listVoByVo", user);
    }

    @Override
    public User getActivityUserByAccount(String account) throws Exception {

        return getSqlSessionTemplate().selectOne("System.User.getActivityUserByAccount", account);
    }

    @Override
    public List<User> list() throws Exception {

        return getSqlSessionTemplate().selectList("System.User.list");
    }

    @Override
    public List<User> listByOrgId(String orgId) throws Exception {

        return getSqlSessionTemplate().selectList("System.User.listByOrgId", orgId);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

}
