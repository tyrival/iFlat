package com.iflat.report.service.impl.cst.sr;

import com.iflat.report.bean.cst.sr.SrProjectCostCmps;
import com.iflat.base.dao.BaseDao;
import com.iflat.base.service.impl.BaseServiceSupport;

import java.util.List;

/**
 * Created by tyriv on 2015/12/23.
 */
public class SrProjectCostCmpsServiceImpl extends BaseServiceSupport {

    public BaseDao baseDao;

    @Override
    public List list(Object o) throws Exception {
        List<SrProjectCostCmps> list = (List<SrProjectCostCmps>)this.baseDao.list(o);
        Double target = 0.0;
        Double actual = 0.0;
        if(list != null) {
            for(int i = 0; i < list.size(); i++) {
                target += list.get(i).getTarget();
                actual += list.get(i).getActual();
            }
            for(int i = 0; i < list.size(); i++) {
                if(target != 0) {
                    list.get(i).setTargetPct(list.get(i).getTarget() * 100 / target);
                }
                if(actual != 0) {
                    list.get(i).setActualPct(list.get(i).getActual() * 100 / actual);
                }
            }
        }
        return list;
    }

    @Override
    public void setImportExcelReader() throws Exception {
    }

    @Override
    public void setImportProps() throws Exception {
    }

    @Override
    public void importValidate() throws Exception {
    }

    public BaseDao getBaseDao() {
        return baseDao;
    }

    public void setBaseDao(BaseDao baseDao) {
        this.baseDao = baseDao;
    }
}
