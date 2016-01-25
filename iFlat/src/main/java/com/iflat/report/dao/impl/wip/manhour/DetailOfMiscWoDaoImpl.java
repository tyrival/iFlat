package com.iflat.report.dao.impl.wip.manhour;

import com.iflat.report.dao.ReportDao;
import com.iflat.report.entity.Parameter;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2015/11/11.
 */
public class DetailOfMiscWoDaoImpl implements ReportDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public Object queryObj(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public Map queryMap(Parameter parameter) throws Exception {
        return null;
    }

    @Override
    public List queryList(Parameter parameter) throws Exception {
        return getSqlSessionTemplate().selectList("Report.Wip.Manhour.DetailOfMiscWo.list", parameter);
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


    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

}
