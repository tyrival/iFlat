package com.iflat.report.dao.impl.util;

import com.iflat.report.bean.util.Graph;

import java.util.List;

/**
 * Created by tyriv on 2015/11/23.
 */
public interface GraphDao {

    public int insert(Graph graph) throws Exception;
    public int insertBatch(List<Graph> list) throws Exception;
    public int update(Graph graph) throws Exception;
    public int delete(Graph graph) throws Exception;
    public List list(Graph graph) throws Exception;
}
