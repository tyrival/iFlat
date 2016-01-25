package com.iflat.system.service;

import com.iflat.system.bean.DataDictionary;

import java.util.List;

/**
 * Created by tyriv on 2015/10/16.
 */
public interface DataDictionaryManager {

    public int generateDataDictionary() throws Exception;

    public DataDictionary save(DataDictionary dataDictionary) throws Exception;

    public List<DataDictionary> list(DataDictionary dataDictionary) throws Exception;
}
