package com.iflat.system.dao.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.iflat.system.bean.Organization;
import com.iflat.system.dao.OrganizationDao;
import com.iflat.system.entity.OrganizationVo;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public class OrganizationDaoImpl implements OrganizationDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public Organization insert(Organization organization) throws Exception {
        int i = 0;
        i = getSqlSessionTemplate().insert("System.Organization.insert", organization);
        Organization result = i == 1 ? organization : null;
        return result;
    }

    @Override
    public Organization update(Organization organization) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().update("System.Organization.update", organization);
        Organization result = i == 1 ? organization : null;
        return result;
    }

    @Override
    public int delete(String orgId) throws Exception {

        return getSqlSessionTemplate().delete("System.Organization.delete", orgId);
    }

    @Override
    public Organization get(String orgId) throws Exception {

        return getSqlSessionTemplate().selectOne("System.Organization.get", orgId);
    }

    @Override
    public List<Organization> list() throws Exception {

        return getSqlSessionTemplate().selectList("System.Organization.list");
    }

    @Override
    public List<Organization> listActivity() throws Exception {

        return getSqlSessionTemplate().selectList("System.Organization.listActivity");
    }

    @Override
    public List<OrganizationVo> listVo() throws Exception {

        return getSqlSessionTemplate().selectList("System.Organization.listVo");
    }

    @Override
    public List<Organization> listChildren(String orgId) throws Exception {
        return getSqlSessionTemplate().selectList("System.Organization.listChildren", orgId);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
