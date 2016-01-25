package com.iflat.system.entity;

import java.util.List;

/**
 * Created by tyriv on 2015/11/18.
 */
public class ExcelWriter {

    private String sheetName;
    private String title;
    private String[] tableHead;
    private boolean withSerial;
    private String document;
    private List dataSource;

    public ExcelWriter() {
        this.title = "";
        this.withSerial = true;
        this.sheetName = "Sheet0";
    }

    public String getSheetName() {
        return sheetName;
    }

    public void setSheetName(String sheetName) {
        this.sheetName = sheetName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getTableHead() {
        return tableHead;
    }

    public void setTableHead(String[] tableHead) {
        this.tableHead = tableHead;
    }

    public List getDataSource() {
        return dataSource;
    }

    public void setDataSource(List dataSource) {
        this.dataSource = dataSource;
    }

    public boolean getWithSerial() {
        return withSerial;
    }

    public void setWithSerial(boolean withSerial) {
        this.withSerial = withSerial;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }
}
