package com.iflat.system.dao;

import com.iflat.system.bean.DataDictionary;
import com.iflat.system.entity.DataBase;

import java.util.List;

/**
 * Created by tyriv on 2015/10/16.
 */
public interface DataDictionaryDao {

    public int insertByGenerate(List<DataBase> list) throws Exception;

    public int update(DataDictionary dataDictionary) throws Exception;

    public List<DataDictionary> list(DataDictionary dataDictionary) throws Exception;
}
