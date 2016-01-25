package com.iflat.system.dao;

import com.iflat.system.bean.TableView;

import java.util.List;

/**
 * Created by tyriv on 2015/11/3.
 */
public interface TableViewDao {

    public int insert(TableView tableView) throws Exception;

    public int update(TableView tableView) throws Exception;

    public int delete(TableView tableView) throws Exception;

    public List<TableView> listByModule(TableView tableView) throws Exception;
}
