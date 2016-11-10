package com.iflat.ss.entity;

import com.iflat.util.code.CodeUtil;

/**
 * Created by tyriv on 2016/11/9.
 */
public class PhDetailType {

    private String type;
    private String code;
    private String description;
    private String detailType;

    public String getDetailType() {
        return detailType;
    }

    private void setDetailType() {
        this.detailType = code + " " + description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
        setDetailType();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        setDetailType();
    }
}
