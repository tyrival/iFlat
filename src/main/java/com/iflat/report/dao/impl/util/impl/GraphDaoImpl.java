package com.iflat.report.dao.impl.util.impl;

import com.iflat.report.bean.util.Graph;
import com.iflat.report.dao.impl.util.GraphDao;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/11/23.
 */
public class GraphDaoImpl implements GraphDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insert(Graph graph) throws Exception {
        return getSqlSessionTemplate().insert("Report.util.Graph.insert", graph);
    }

    @Override
    public int insertBatch(List<Graph> list) throws Exception {
        return getSqlSessionTemplate().insert("Report.util.Graph.insertBatchVo", list);
    }

    @Override
    public int update(Graph graph) throws Exception {
        return getSqlSessionTemplate().update("Report.util.Graph.update", graph);
    }

    @Override
    public int delete(Graph graph) throws Exception {
        return getSqlSessionTemplate().delete("Report.util.Graph.delete", graph);
    }

    @Override
    public List list(Graph graph) throws Exception {
        return getSqlSessionTemplate().selectList("Report.util.Graph.list", graph);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
