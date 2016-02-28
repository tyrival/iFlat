package com.iflat.system.entity;

/**
 * Created by tyriv on 2015/10/17.
 */
public class AuthDataFieldVo {

    private String adId;
    private String fieldName;
    private String alias;
    private int status;
    private String filter;

    public String getAdId() {
        return adId;
    }

    public void setAdId(String adId) {
        this.adId = adId;
    }

    public AuthDataFieldVo() {
        this.status = 0;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }
}
