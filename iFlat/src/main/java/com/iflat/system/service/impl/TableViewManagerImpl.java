package com.iflat.system.service.impl;

import com.iflat.system.bean.TableView;
import com.iflat.system.dao.TableViewDao;
import com.iflat.system.service.TableViewManager;

import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/3.
 */
public class TableViewManagerImpl implements TableViewManager {

    private TableViewDao tableViewDao;

    @Override
    public TableView save(TableView tableView) throws Exception {

        int i = 0;
        if(tableView.getTvId() != null && !"".equals(tableView.getTvId())) {
            i = this.tableViewDao.update(tableView);
        } else {
            tableView.setTvId(UUID.randomUUID().toString());
            i = this.tableViewDao.insert(tableView);
        }
        return i == 1 ? tableView : null;
    }

    @Override
    public TableView delete(TableView tableView) throws Exception {
        int i = this.tableViewDao.delete(tableView);
        return i == 1 ? tableView : null;
    }

    @Override
    public List<TableView> listByModule(TableView tableView) throws Exception {

        return this.tableViewDao.listByModule(tableView);
    }

    public TableViewDao getTableViewDao() {
        return tableViewDao;
    }

    public void setTableViewDao(TableViewDao tableViewDao) {
        this.tableViewDao = tableViewDao;
    }
}
