package com.iflat.system.dao;

import java.util.List;

/**
 * Created by tyriv on 2015/11/27.
 */
public interface IflatDao {

    public int insert(Object o) throws Exception;
    public int insertBatch(List list) throws Exception;
    public int update(Object o) throws Exception;
    public int delete(Object o) throws Exception;
    public List list(Object o) throws Exception;
}
