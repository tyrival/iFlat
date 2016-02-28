package com.iflat.report.bean.cst.nm;

/**
 * Created by tyriv on 2015/12/23.
 */
public class NmProjectCostNode {
    private String projNo;
    private String id;
    private String parentId;
    private String text;
    private boolean leaf;

    public boolean getLeaf() {
        return leaf;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
        this.leaf = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
