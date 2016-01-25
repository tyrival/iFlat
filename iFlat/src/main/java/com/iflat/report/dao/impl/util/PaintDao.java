package com.iflat.report.dao.impl.util;

import com.iflat.report.bean.util.Paint;

import java.util.List;

/**
 * Created by tyriv on 2015/11/23.
 */
public interface PaintDao {
    public int insert(Paint paint) throws Exception;
    public int update(Paint paint) throws Exception;
    public int delete(Paint paint) throws Exception;
    public List list(Paint paint) throws Exception;
    public List listAct(Paint paint) throws Exception;
}
