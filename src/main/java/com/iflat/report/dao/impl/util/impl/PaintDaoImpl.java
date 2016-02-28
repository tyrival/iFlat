package com.iflat.report.dao.impl.util.impl;

import com.iflat.report.bean.util.Paint;
import com.iflat.report.dao.impl.util.PaintDao;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/11/23.
 */
public class PaintDaoImpl implements PaintDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insert(Paint paint) throws Exception {
        return getSqlSessionTemplate().insert("Report.util.Paint.insert", paint);
    }

    @Override
    public int update(Paint paint) throws Exception {
        return getSqlSessionTemplate().update("Report.util.Paint.update", paint);
    }

    @Override
    public int delete(Paint paint) throws Exception {
        return getSqlSessionTemplate().delete("Report.util.Paint.delete", paint);
    }

    @Override
    public List list(Paint paint) throws Exception {
        return getSqlSessionTemplate().selectList("Report.util.Paint.list", paint);
    }

    @Override
    public List listAct(Paint paint) throws Exception {
        return getSqlSessionTemplate().selectList("Report.util.Paint.listAct", paint);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
