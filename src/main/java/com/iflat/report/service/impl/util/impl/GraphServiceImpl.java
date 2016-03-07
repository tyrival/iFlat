package com.iflat.report.service.impl.util.impl;

import com.iflat.report.bean.util.Graph;
import com.iflat.report.bean.util.Paint;
import com.iflat.report.dao.impl.util.GraphDao;
import com.iflat.report.service.impl.util.GraphService;

import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/23.
 */
public class GraphServiceImpl implements GraphService {

    private GraphDao graphDao;

    @Override
    public Graph save(Graph graph) throws Exception {
        int i = 0;
        if(graph.getId() != null && !"".equals(graph.getId())) {
            i = this.graphDao.insert(graph);
        } else {
            graph.setId(UUID.randomUUID().toString());
            i = this.graphDao.update(graph);
        }
        return i > 0 ? graph : null;
    }

    @Override
    public List saveBatch(List<Graph> list, Paint paint) throws Exception {

        Graph graph = new Graph();
        graph.setPaintId(paint.getPaintId());
        int i = this.graphDao.delete(graph);
        if(list != null && list.size() != 0) {
            i += this.graphDao.insertBatch(list);
        }
        return i > 0 ? list : null;
    }

    @Override
    public Graph delete(Graph graph) throws Exception {
        int i = this.graphDao.delete(graph);
        return i > 0 ? graph : null;
    }

    @Override
    public List list(Graph graph) throws Exception {
        return this.graphDao.list(graph);
    }

    public GraphDao getGraphDao() {
        return graphDao;
    }

    public void setGraphDao(GraphDao graphDao) {
        this.graphDao = graphDao;
    }
}
