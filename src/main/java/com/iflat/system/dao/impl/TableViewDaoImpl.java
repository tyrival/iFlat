package com.iflat.system.dao.impl;

import com.iflat.system.bean.TableView;
import com.iflat.system.dao.TableViewDao;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

/**
 * Created by tyriv on 2015/11/3.
 */
public class TableViewDaoImpl implements TableViewDao {

    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insert(TableView tableView) throws Exception {
        return getSqlSessionTemplate().insert("System.TableView.insert", tableView);
    }

    @Override
    public int update(TableView tableView) throws Exception {
        return getSqlSessionTemplate().update("System.TableView.update", tableView);
    }

    @Override
    public int delete(TableView tableView) throws Exception {
        return getSqlSessionTemplate().delete("System.TableView.delete", tableView);
    }

    @Override
    public List<TableView> listByModule(TableView tableView) throws Exception {

        return getSqlSessionTemplate().selectList("System.TableView.listByModule", tableView);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
