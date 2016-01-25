package com.iflat.report.dao.impl.cst.sb;

import com.iflat.report.dao.ReportDao;
import com.iflat.report.entity.Parameter;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2015/11/11.
 */
public class EstimateOfProjectDaoImpl implements ReportDao {

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
        return null;
    }

    @Override
    public List queryBar(Parameter parameter) throws Exception {
        return getSqlSessionTemplate().selectOne("Report.Cst.ShipBuilding.EstimateOfProject.list", parameter);
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
        return getSqlSessionTemplate().selectOne("Report.Cst.ShipBuilding.EstimateOfProject.listSumWithDept", parameter);
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
