package com.iflat.system.service.impl;

import com.iflat.system.bean.DataDictionary;
import com.iflat.system.dao.DataDictionaryDao;
import com.iflat.system.entity.DataBase;
import com.iflat.system.service.DataDictionaryManager;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by tyriv on 2015/10/16.
 */
public class DataDictionaryManagerImpl implements DataDictionaryManager {

    private DataDictionaryDao dataDictionaryDao;
    private String path;

    @Override
    public int generateDataDictionary() throws Exception {
        List<DataBase> list = new ArrayList<DataBase>();
        //读取数据库配置文件
        InputStream in = readConfig();
        if(in == null) {
            throw new Exception("未找到数据库配置文件，请修改/WEB-INF/config/spring/applicationContext-system.xml中，bean id='dataDictionaryManager'的path参数值");
        }
        Properties prop = new Properties();
        if(in != null) {
            String word = "^(jdbc).*";
            BufferedReader bf = new BufferedReader(new InputStreamReader(in,"UTF-8"));  //转码
            prop.load(bf);  //将属性文件流装载到Properties对象中
            Enumeration enu = prop.elements();
            while(enu.hasMoreElements()){
                String value = (String)enu.nextElement();
                Pattern p = Pattern.compile(word);
                Matcher m = p.matcher(value);
                if(m.matches()) {
                    list.add(analyzeValueString(value));
                }
            }
        }
        list.get(0).setInstance("");  //第一个数据库为主数据库，在本地，所以instance为空
        return this.dataDictionaryDao.insertByGenerate(list);
    }

    @Override
    public DataDictionary save(DataDictionary dataDictionary) throws Exception {
        int i = this.dataDictionaryDao.update(dataDictionary);
        return i == 1 ? dataDictionary : null;
    }

    @Override
    public List<DataDictionary> list(DataDictionary dataDictionary) throws Exception {
        return this.dataDictionaryDao.list(dataDictionary);
    }

    //读取配置文件
    private InputStream readConfig() {
        return getClass().getResourceAsStream(this.path);  //读取文件
    }

    //解析value字符串为message和time
    private DataBase analyzeValueString(String value) {

        DataBase dataBase = new DataBase();
        String dbType = value.substring(value.indexOf(":") + 1, value.indexOf(":", value.indexOf(":") + 1));
        if("sqlserver".equals(dbType)) {
            String instance = value.substring(value.indexOf("//") + 2, value.indexOf(";"));
            instance = "localhost:1433".equals(instance) ? "" : instance;
            dataBase.setInstance(instance);
            String name = value.substring(value.indexOf("=") + 1, value.length());
            name = "iFlat".equals(name) ? "" : name;
            dataBase.setName(name);
        }
        //mysql等数据库未写
        return dataBase;
    }

    public DataDictionaryDao getDataDictionaryDao() {
        return dataDictionaryDao;
    }

    public void setDataDictionaryDao(DataDictionaryDao dataDictionaryDao) {
        this.dataDictionaryDao = dataDictionaryDao;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
