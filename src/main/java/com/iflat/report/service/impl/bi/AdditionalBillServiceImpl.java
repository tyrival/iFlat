package com.iflat.report.service.impl.bi;

import com.iflat.bi.bean.AdditionalBill;
import com.iflat.report.entity.Parameter;
import com.iflat.report.service.ReportService;
import com.iflat.base.service.BaseService;

import java.util.List;

/**
 * Created by tyriv on 2015/12/8.
 */
public class AdditionalBillServiceImpl implements ReportService {

    private BaseService baseService;

    @Override
    public List query(Parameter parameter) throws Exception {
        AdditionalBill additionalBill = new AdditionalBill();
        additionalBill.setProjNo(parameter.getProjectNo());
        return this.baseService.list(additionalBill);
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

    public BaseService getBaseService() {
        return baseService;
    }

    public void setBaseService(BaseService baseService) {
        this.baseService = baseService;
    }
}
