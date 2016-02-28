package com.iflat.report.service.impl.bi;

import com.iflat.bi.bean.ProjectCost;
import com.iflat.report.entity.Parameter;
import com.iflat.report.service.ReportManager;
import com.iflat.system.service.IflatManager;
import com.iflat.util.ReportHelper;

import java.util.List;

/**
 * Created by tyriv on 2015/12/3.
 */
public class ProjectCostManager implements ReportManager {

    private IflatManager iflatManager;
    
    @Override
    public List query(Parameter parameter) throws Exception {

        ProjectCost projectCost = new ProjectCost();
        projectCost.setProjNo(parameter.getProjectNo());
        return ReportHelper.convertBalance(this.iflatManager.list(projectCost));
    }

    @Override
    public List queryList(Parameter parameter) throws Exception {
        ProjectCost projectCost = new ProjectCost();
        projectCost.setProjNo(parameter.getProjectNo());
        return this.iflatManager.list(projectCost);
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

    public IflatManager getIflatManager() {
        return iflatManager;
    }

    public void setIflatManager(IflatManager iflatManager) {
        this.iflatManager = iflatManager;
    }
}
