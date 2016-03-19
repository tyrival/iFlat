package com.iflat.system.service.impl;

import com.iflat.system.bean.Operating;
import com.iflat.system.dao.OperatingDao;
import com.iflat.system.service.AuthOperatingService;
import com.iflat.system.service.OperatingService;

import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/14.
 */
public class OperatingServiceImpl implements OperatingService {

    private OperatingDao operatingDao;
    private AuthOperatingService authOperatingService;

    @Override
    public Operating save(Operating operating) throws Exception {

        int i = 0;
        if(operating.getOpId() != null && !"".equals(operating.getOpId())) {
            i = this.operatingDao.update(operating);

            Operating old = operatingDao.get(operating.getOpId());
            if (isKeyChanged(old, operating)) {
                authOperatingService.updateCascadeWithOperatingChange(old, operating);
            }
        } else {
            operating.setOpId(UUID.randomUUID().toString());
            i = this.operatingDao.insert(operating);
        }
        return i > 0 ? operating : null;
    }

    private boolean isKeyChanged(Operating oldOperating, Operating newOperating) {
        if (oldOperating.getNameSpace() != newOperating.getNameSpace()
                || oldOperating.getModuleName() != newOperating.getModuleName()
                || oldOperating.getOperating() != newOperating.getOperating()) {
            return true;
        }
        return false;
    }

    @Override
    public Operating delete(Operating operating) throws Exception {
        int i = this.operatingDao.delete(operating);
        return i > 0 ? operating : null;
    }

    @Override
    public List listOfModule(Operating operating) throws Exception {
        return this.operatingDao.list(operating);
    }

    public OperatingDao getOperatingDao() {
        return operatingDao;
    }

    public void setOperatingDao(OperatingDao operatingDao) {
        this.operatingDao = operatingDao;
    }

    public void setAuthOperatingService(AuthOperatingService authOperatingService) {
        this.authOperatingService = authOperatingService;
    }
}
