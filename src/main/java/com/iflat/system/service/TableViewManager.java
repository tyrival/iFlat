package com.iflat.system.service;

import com.iflat.system.bean.TableView;

import java.util.List;

/**
 * Created by tyriv on 2015/11/3.
 */
public interface TableViewManager {

    public TableView save(TableView tableView) throws Exception;

    public TableView delete(TableView tableView) throws Exception;

    public List<TableView> listByModule(TableView tableView) throws Exception;
}
