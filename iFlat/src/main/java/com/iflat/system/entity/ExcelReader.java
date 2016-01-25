package com.iflat.system.entity;

/**
 * Created by tyriv on 2015/11/18.
 */
public class ExcelReader {

    private String className;
    private String filePath;
    private String sheetName;
    private String[] props;
    private int startRow;
    private int startColumn;

    public ExcelReader() {
    }

    public ExcelReader(String className, String filePath) {
        this.className = className;
        this.filePath = filePath;
        this.startColumn = 1;
        this.startRow = 1;
    }

    public String getSheetName() {
        return sheetName;
    }

    public void setSheetName(String sheetName) {
        this.sheetName = sheetName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String[] getProps() {
        return props;
    }

    public void setProps(String[] props) {
        this.props = props;
    }

    public int getStartRow() {
        return startRow;
    }

    public void setStartRow(int startRow) {
        this.startRow = startRow;
    }

    public int getStartColumn() {
        return startColumn;
    }

    public void setStartColumn(int startColumn) {
        this.startColumn = startColumn;
    }
}
