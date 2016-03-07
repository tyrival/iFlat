package com.iflat.report.service.impl.bi;

import com.iflat.bi.bean.MajorDevCst;
import com.iflat.report.entity.Parameter;
import com.iflat.report.service.ReportService;
import com.iflat.system.service.IflatService;
import com.iflat.util.ReportHelper;

import java.util.List;

/**
 * Created by tyriv on 2015/12/7.
 */
public class MajorDevCstServiceImpl implements ReportService {

    private IflatService iflatService;

    @Override
    public List query(Parameter parameter) throws Exception {
        MajorDevCst majorDevCst = new MajorDevCst();
        majorDevCst.setProjNo(parameter.getProjectNo());
        return ReportHelper.convertBalance(this.iflatService.list(majorDevCst));
    }

    @Override
    public List queryList(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryBar(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryLine(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryArea(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryScatter(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryFinancial(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryPie(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryRadar(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryGauge(Parameter parameter) throws Exception {
        return null;
    }

    public IflatService getIflatService() {
        return iflatService;
    }

    public void setIflatService(IflatService iflatService) {
        this.iflatService = iflatService;
    }
}
