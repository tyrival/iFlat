package com.iflat.base.entity;

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
    private int endRow;
    private int endColumn;

    public ExcelReader() {
    }

    public ExcelReader(String className, String filePath) {
        this.className = className;
        this.filePath = filePath;
        this.startColumn = 1;
        this.startRow = 1;
        this.endColumn = 0;
        this.endRow = 0;
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

    public int getEndRow() {
        return endRow;
    }

    public void setEndRow(int endRow) {
        this.endRow = endRow;
    }

    public int getEndColumn() {
        return endColumn;
    }

    public void setEndColumn(int endColumn) {
        this.endColumn = endColumn;
    }
}
