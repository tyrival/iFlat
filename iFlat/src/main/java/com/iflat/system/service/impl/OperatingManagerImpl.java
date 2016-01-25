package com.iflat.system.service.impl;

import com.iflat.system.bean.Operating;
import com.iflat.system.dao.OperatingDao;
import com.iflat.system.service.OperatingManager;

import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/14.
 */
public class OperatingManagerImpl implements OperatingManager {

    private OperatingDao operatingDao;

    @Override
    public Operating save(Operating operating) throws Exception {

        int i = 0;
        if(operating.getOpId() != null && !"".equals(operating.getOpId())) {
            i = this.operatingDao.update(operating);
        } else {
            operating.setOpId(UUID.randomUUID().toString());
            i = this.operatingDao.insert(operating);
        }
        return i > 0 ? operating : null;
    }

    @Override
    public Operating delete(Operating operating) throws Exception {
        int i = this.operatingDao.delete(operating);
        return i > 0 ? operating : null;
    }

    @Override
    public List listOfModule(Operating operating) throws Exception {
        return this.operatingDao.listOfModule(operating);
    }

    public OperatingDao getOperatingDao() {
        return operatingDao;
    }

    public void setOperatingDao(OperatingDao operatingDao) {
        this.operatingDao = operatingDao;
    }
}
