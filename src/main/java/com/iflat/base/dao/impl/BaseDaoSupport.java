package com.iflat.base.dao.impl;

import com.iflat.base.dao.BaseDao;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/11/27.
 */
public class BaseDaoSupport implements BaseDao {

    protected SqlSessionTemplate sqlSessionTemplate;

    public BaseDaoSupport() {
    }

    @Override
    public int insert(Object o) throws Exception {
        return this.sqlSessionTemplate.insert(getNameSpace(o) + ".insert", o);
    }

    @Override
    public int insertBatch(List list) throws Exception {
        Object o = list != null && list.size() > 0 ? list.get(0) : null;
        return o != null ? this.sqlSessionTemplate.insert(getNameSpace(o) + ".insertBatch", list) : null;
    }

    @Override
    public int update(Object o) throws Exception {
        return this.sqlSessionTemplate.update(getNameSpace(o) + ".update", o);
    }

    @Override
    public int updateBatch(List list) throws Exception {
        Object o = list != null && list.size() > 0 ? list.get(0) : null;
        return o != null ? this.sqlSessionTemplate.update(getNameSpace(o) + ".updateBatch", list) : null;
    }

    @Override
    public int delete(Object o) throws Exception {
        return this.sqlSessionTemplate.delete(getNameSpace(o) + ".delete", o);
    }

    @Override
    public int deleteBatch(List list) throws Exception {
        Object o = list != null && list.size() > 0 ? list.get(0) : null;
        return o != null ? this.sqlSessionTemplate.delete(getNameSpace(o) + ".updateBatch", list) : null;
    }

    @Override
    public List list(Object o) throws Exception {
        return this.sqlSessionTemplate.selectList(getNameSpace(o) + ".list", o);
    }

    @Override
    public List listBatch(List list) throws Exception {
        Object o = list != null && list.size() > 0 ? list.get(0) : null;
        return o != null ? this.sqlSessionTemplate.selectList(getNameSpace(o) + ".listBatch", list) : null;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    private String getNameSpace(Object o) throws Exception {
        String module = o.getClass().getName();
        module = module.replace("com.iflat.", "").replace(".bean.", ".").replace(".entity.", ".");
        String[] array = module.split("\\.");
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < array.length; i++) {
            String j = this.firstCharUpperCase(array[i]);
            sb.append(j).append(".");
        }
        String result = sb.toString();
        result = result.substring(0, result.length() - 1);
        return result;
    }

    private String firstCharUpperCase(String str) throws Exception {
        if(Character.isUpperCase(str.charAt(0)))
            return str;
        else
            return (new StringBuilder()).append(Character.toUpperCase(str.charAt(0))).append(str.substring(1)).toString();
    }
}
