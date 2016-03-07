package com.iflat.report.service.impl.util;

import com.iflat.report.bean.util.Paint;

import java.util.List;

/**
 * Created by tyriv on 2015/11/23.
 */
public interface PaintService {

    public Paint save(Paint paint) throws Exception;
    public Paint delete(Paint paint) throws Exception;
    public List list(Paint paint) throws Exception;
    public List listAct(Paint paint) throws Exception;
}
