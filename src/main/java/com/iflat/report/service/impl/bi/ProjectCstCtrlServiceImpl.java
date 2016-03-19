package com.iflat.report.service.impl.bi;

import com.iflat.report.bean.bi.ProjectCstCtrl;
import com.iflat.report.entity.Parameter;
import com.iflat.report.service.ReportService;
import com.iflat.base.service.BaseService;
import com.iflat.util.ReportUtil;

import java.util.List;

/**
 * Created by tyriv on 2015/12/8.
 */
public class ProjectCstCtrlServiceImpl implements ReportService {

    private BaseService baseService;

    @Override
    public List query(Parameter parameter) throws Exception {
        ProjectCstCtrl projectCstCtrl = new ProjectCstCtrl();
        projectCstCtrl.setProjNo(parameter.getProjectNo());
        return ReportUtil.convertPivot(this.baseService.list(projectCstCtrl));
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
