package com.iflat.report.service.impl.bi;

import com.iflat.bi.entity.ProjectInProcessInfo;
import com.iflat.report.entity.Parameter;
import com.iflat.report.service.ReportService;
import com.iflat.base.service.BaseService;
import com.iflat.util.ReportUtil;

import java.util.List;

/**
 * Created by tyriv on 2015/12/11.
 */
public class ProjectInProcessInfoServiceImpl implements ReportService {

    private BaseService baseService;

    @Override
    public List query(Parameter parameter) throws Exception {
        ProjectInProcessInfo projectInProcessInfo = new ProjectInProcessInfo();
        projectInProcessInfo.setType(parameter.getCategory());
        projectInProcessInfo.setMonth(parameter.getDate());
        return ReportUtil.convertPivot(this.baseService.list(projectInProcessInfo));
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
