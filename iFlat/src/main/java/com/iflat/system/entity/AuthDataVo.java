package com.iflat.system.entity;

/**
 * Created by tyriv on 2015/10/23.
 */
public class AuthDataVo {

    //adId
    private String adId;
    //roleId
    private String roleId;
    //帐号
    private String account;
    //模块
    private String nameSpace;
    //功能
    private String moduleName;
    //数据库实例
    private String dbInstance;
    //数据库名
    private String dbName;
    //表名
    private String tableName;
    //字段权限
    private String field;
    //过滤语句
    private String filter;
    //status
    private boolean adStatus;

    public String getAdId() {
        return adId;
    }

    public void setAdId(String adId) {
        this.adId = adId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getNameSpace() {
        return nameSpace;
    }

    public void setNameSpace(String nameSpace) {
        this.nameSpace = nameSpace;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getDbInstance() {
        return dbInstance;
    }

    public void setDbInstance(String dbInstance) {
        this.dbInstance = dbInstance;
    }

    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public boolean getAdStatus() {
        return adStatus;
    }

    public void setAdStatus(boolean adStatus) {
        this.adStatus = adStatus;
    }
}
