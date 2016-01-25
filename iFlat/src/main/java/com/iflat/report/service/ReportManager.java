package com.iflat.report.service;

import com.iflat.report.entity.Parameter;

import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2015/11/11.
 */
public interface ReportManager {

    public List query(Parameter parameter) throws Exception;

    public List queryList(Parameter parameter) throws Exception;

    public List queryBar(Parameter parameter) throws Exception;

    public List queryLine(Parameter parameter) throws Exception;

    public List queryArea(Parameter parameter) throws Exception;

    public List queryScatter(Parameter parameter) throws Exception;

    public List queryFinancial(Parameter parameter) throws Exception;

    public List queryPie(Parameter parameter) throws Exception;

    public List queryRadar(Parameter parameter) throws Exception;

    public List queryGauge(Parameter parameter) throws Exception;

}
