package com.iflat.base.dao.impl;

import com.iflat.base.dao.BaseDao;
import com.iflat.util.StringUtil;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.ArrayList;
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

        if (list != null && list.size() > 0) {

            Object o = list.get(0);
            int fieldCount = o.getClass().getDeclaredFields().length;
            int batchSize = 2000 / fieldCount;
            int batchCount = list.size() / batchSize + 1;
            int result = 0;
            for (int i = 0; i < batchCount; i++) {
                List temp = new ArrayList();
                int beginIndex = i * batchSize;
                int lastIndex = (i + 1) * batchSize - 1;
                if (i == batchCount - 1) {
                    lastIndex = list.size() - 1;
                }
                for (int j = beginIndex; j <= lastIndex; j++) {
                    temp.add(list.get(j));
                }
                result += this.sqlSessionTemplate.insert(getNameSpace(o) + ".insertBatch", temp);
            }
            return result;

        } else {
            return 0;
        }
    }

    @Override
    public int update(Object o) throws Exception {
        return this.sqlSessionTemplate.update(getNameSpace(o) + ".update", o);
    }

    @Override
    public int updateBatch(List list) throws Exception {
        if (list != null && list.size() > 0) {

            Object o = list.get(0);
            int fieldCount = o.getClass().getDeclaredFields().length;
            int batchSize = 2000 / fieldCount;
            int batchCount = list.size() / batchSize + 1;
            int result = 0;
            for (int i = 0; i < batchCount; i++) {
                List temp = new ArrayList();
                int beginIndex = i * batchSize;
                int lastIndex = (i + 1) * batchSize - 1;
                if (i == batchCount - 1) {
                    lastIndex = list.size() - 1;
                }
                for (int j = beginIndex; j <= lastIndex; j++) {
                    temp.add(list.get(j));
                }
                result += this.sqlSessionTemplate.update(getNameSpace(o) + ".updateBatch", temp);
            }
            return result;

        } else {
            return 0;
        }
    }

    @Override
    public int delete(Object o) throws Exception {
        return this.sqlSessionTemplate.delete(getNameSpace(o) + ".delete", o);
    }

    @Override
    public int deleteBatch(List list) throws Exception {
        if (list != null && list.size() > 0) {

            Object o = list.get(0);
            int fieldCount = o.getClass().getDeclaredFields().length;
            int batchSize = 2000 / fieldCount;
            int batchCount = list.size() / batchSize + 1;
            int result = 0;
            for (int i = 0; i < batchCount; i++) {
                List temp = new ArrayList();
                int beginIndex = i * batchSize;
                int lastIndex = (i + 1) * batchSize - 1;
                if (i == batchCount - 1) {
                    lastIndex = list.size() - 1;
                }
                for (int j = beginIndex; j <= lastIndex; j++) {
                    temp.add(list.get(j));
                }
                result += this.sqlSessionTemplate.delete(getNameSpace(o) + ".deleteBatch", temp);
            }
            return result;

        } else {
            return 0;
        }
    }

    @Override
    public List list(Object o) throws Exception {
        return this.sqlSessionTemplate.selectList(getNameSpace(o) + ".list", o);
    }

    @Override
    public List listBatch(List list) throws Exception {
        List<Object> result = new ArrayList();
        if (list != null && list.size() > 0) {

            Object o = list.get(0);
            int fieldCount = o.getClass().getDeclaredFields().length;
            int batchSize = 2000 / fieldCount;
            int batchCount = list.size() / batchSize + 1;
            for (int i = 0; i < batchCount; i++) {
                List temp = new ArrayList();
                int beginIndex = i * batchSize;
                int lastIndex = (i + 1) * batchSize - 1;
                if (i == batchCount - 1) {
                    lastIndex = list.size() - 1;
                }
                for (int j = beginIndex; j <= lastIndex; j++) {
                    temp.add(list.get(j));
                }
                result.add(this.sqlSessionTemplate.selectList(getNameSpace(o) + ".listBatch", temp));
            }
        }
        return result;
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
            String j = StringUtil.upperCaseFirstChar(array[i]);
            sb.append(j).append(".");
        }
        String result = sb.toString();
        result = result.substring(0, result.length() - 1);
        return result;
    }
}
