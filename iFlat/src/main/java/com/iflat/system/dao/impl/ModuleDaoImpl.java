package com.iflat.system.dao.impl;

import com.iflat.system.bean.Module;
import com.iflat.system.dao.ModuleDao;
import com.iflat.system.entity.UserInfoVo;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/8/31.
 */
public class ModuleDaoImpl implements ModuleDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public Module insert(Module module) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().insert("System.Module.insert", module);
        Module result = i == 1 ? module : null;
        return result;
    }

    @Override
    public Module update(Module module) throws Exception {

        int i = 0;
        i = getSqlSessionTemplate().update("System.Module.update", module);
        Module result = i == 1 ? module : null;
        return result;
    }

    @Override
    public int delete(String nodeId) throws Exception {

        return getSqlSessionTemplate().delete("System.Module.delete", nodeId);
    }

    @Override
    public Module get(String nodeId) throws Exception {

        return getSqlSessionTemplate().selectOne("System.Module.get", nodeId);
    }

    @Override
    public List<Module> list() throws Exception {

        return getSqlSessionTemplate().selectList("System.Module.list");
    }

    @Override
    public List<Module> listNavigationByUser(UserInfoVo userInfoVo) throws Exception {

        return getSqlSessionTemplate().selectList("System.Module.listNavigationByUser", userInfoVo);
    }

    @Override
    public List<Module> listChildren(String nodeId) throws Exception {

        return getSqlSessionTemplate().selectList("System.Module.listChildren", nodeId);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
