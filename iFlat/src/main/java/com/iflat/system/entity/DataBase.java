package com.iflat.system.entity;

/**
 * Created by tyriv on 2015/10/16.
 */
public class DataBase {

    private String instance;
    private String name;
    private String database;

    public DataBase() {
        this.instance = "";
        this.name = "";
    }

    public String getInstance() {
        return instance;
    }

    public void setInstance(String instance) {
        this.instance = instance;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDatabase() throws Exception{
        if(!"".equals(this.name.trim()) && "".equals(this.instance.trim())){
            throw new Exception("配置文件出错，未配置数据库名");
        }
        if(!"".equals(this.instance.trim())) {
            this.database = "[" + this.instance.trim() + "].";
        }
        if(!"".equals(this.name.trim())) {
            this.database = this.database + "[" + this.name.trim() + "].";
        }
        return this.database;
    }

}
