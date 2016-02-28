package com.iflat.report.service.impl.util;

import com.iflat.report.bean.util.Graph;
import com.iflat.report.bean.util.Paint;

import java.util.List;

/**
 * Created by tyriv on 2015/11/23.
 */
public interface GraphManager {

    public Graph save(Graph graph) throws Exception;

    public List saveBatch(List<Graph> list, Paint paint) throws Exception;

    public Graph delete(Graph graph) throws Exception;

    public List list(Graph graph) throws Exception;
}
