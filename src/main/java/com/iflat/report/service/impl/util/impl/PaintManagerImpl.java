package com.iflat.report.service.impl.util.impl;

import com.iflat.report.bean.util.Paint;
import com.iflat.report.dao.impl.util.PaintDao;
import com.iflat.report.service.impl.util.PaintManager;

import java.util.List;
import java.util.UUID;

public class PaintManagerImpl implements PaintManager {

    private PaintDao paintDao;

    @Override
    public Paint save(Paint paint) throws Exception {
        int i = 0;
        if(paint != null && !"".equals(paint.getPaintId())) {
            paint.setPaintId(UUID.randomUUID().toString());
            paint.setStatus(true);
            i = this.paintDao.insert(paint);
        } else {
            i = this.paintDao.update(paint);
        }
        return i > 0 ? paint : null;
    }

    @Override
    public Paint delete(Paint paint) throws Exception {
        int i = this.paintDao.delete(paint);
        return i > 0 ? paint : null;
    }

    @Override
    public List list(Paint paint) throws Exception {
        return this.paintDao.list(paint);
    }

    @Override
    public List listAct(Paint paint) throws Exception {
        return this.paintDao.listAct(paint);
    }

    public PaintDao getPaintDao() {
        return paintDao;
    }

    public void setPaintDao(PaintDao paintDao) {
        this.paintDao = paintDao;
    }
}
