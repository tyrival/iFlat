package com.iflat.report.service.impl.wip.manhour;

import com.iflat.report.dao.ReportDao;
import com.iflat.report.dao.impl.wip.manhour.DetailOfMiscWoDaoImpl;
import com.iflat.report.entity.Parameter;
import com.iflat.report.service.ReportService;

import java.util.List;

/**
 * Created by tyriv on 2015/11/12.
 */
public class DetailOfMiscWoServiceImpl implements ReportService {

    private ReportDao reportDao = new DetailOfMiscWoDaoImpl();

    @Override
    public List query(Parameter parameter) throws Exception {
        return this.reportDao.queryList(parameter);
    }

    @Override
    public List queryList(Parameter parameter) throws Exception {
        return this.reportDao.queryList(parameter);
    }

    @Override
    public List queryBar(Parameter parameter) throws Exception {
        return this.reportDao.queryBar(parameter);
    }

    @Override
    public List queryLine(Parameter parameter) throws Exception {
        return this.reportDao.queryLine(parameter);
    }

    @Override
    public List queryArea(Parameter parameter) throws Exception {
        return this.reportDao.queryArea(parameter);
    }

    @Override
    public List queryScatter(Parameter parameter) throws Exception {
        return this.reportDao.queryScatter(parameter);
    }

    @Override
    public List queryFinancial(Parameter parameter) throws Exception {
        return this.reportDao.queryFinancial(parameter);
    }

    @Override
    public List queryPie(Parameter parameter) throws Exception {
        return this.reportDao.queryPie(parameter);
    }

    @Override
    public List queryRadar(Parameter parameter) throws Exception {
        return this.reportDao.queryRadar(parameter);
    }

    @Override
    public List queryGauge(Parameter parameter) throws Exception {
        return this.reportDao.queryGauge(parameter);
    }

    public ReportDao getReportDao() {
        return reportDao;
    }

    public void setReportDao(ReportDao reportDao) {
        this.reportDao = reportDao;
    }
}
