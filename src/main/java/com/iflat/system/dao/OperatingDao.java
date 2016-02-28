package com.iflat.system.dao;

import com.iflat.system.bean.Operating;

import java.util.List;

/**
 * Created by tyriv on 2015/11/14.
 */
public interface OperatingDao {

    public int insert(Operating operating) throws Exception;
    public int update(Operating operating) throws Exception;
    public int delete(Operating operating) throws Exception;
    public List listOfModule(Operating operating) throws Exception;

}
