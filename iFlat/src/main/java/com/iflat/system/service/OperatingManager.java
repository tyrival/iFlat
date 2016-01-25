package com.iflat.system.service;

import com.iflat.system.bean.Operating;

import java.util.List;

/**
 * Created by tyriv on 2015/11/14.
 */
public interface OperatingManager {

    public Operating save(Operating operating) throws Exception;
    public Operating delete(Operating operating) throws Exception;
    public List listOfModule(Operating operating) throws Exception;
}
