package com.iflat.sm.bean;

/**
 * Created by tyriv on 2016/4/5.
 */
public class TargetCostAccount {
    private String code;
    private String name;
    private String type;
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription() {
        this.description = this.code + " " + this.name;
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
        setDescription();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        setDescription();
    }
}
