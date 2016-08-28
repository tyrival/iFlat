package com.iflat.xr.bean;

/**
 * Created by tyriv on 2016/8/25.
 */
public class ProjectType {

    private String id;
    private String type;
    private String attribute;

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
