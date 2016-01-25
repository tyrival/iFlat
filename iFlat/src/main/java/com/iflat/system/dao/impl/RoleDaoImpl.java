package com.iflat.system.dao.impl;

import com.iflat.system.bean.Role;
import com.iflat.system.dao.RoleDao;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public class RoleDaoImpl implements RoleDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public Role insert(Role role) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().insert("System.Role.insert", role);
        Role result = i == 1 ? role : null;
        return result;
    }

    @Override
    public Role update(Role role) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().update("System.Role.update", role);
        Role result = i == 1 ? role : null;
        return result;
    }

    @Override
    public int delete(String roleId) throws Exception {

        return getSqlSessionTemplate().delete("System.Role.delete", roleId);
    }

    @Override
    public Role get(String roleId) throws Exception {

        return getSqlSessionTemplate().selectOne("System.Role.get", roleId);
    }

    @Override
    public List<Role> list() throws Exception {

        return getSqlSessionTemplate().selectList("System.Role.list");
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
