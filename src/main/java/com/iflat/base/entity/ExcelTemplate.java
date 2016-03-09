package com.iflat.base.entity;

import java.io.File;

/**
 * Created by tyriv on 2015/11/18.
 */
public class ExcelTemplate {
    private String name;
    private String path;
    private String savePath;
    private File file;

    public ExcelTemplate() {
        this.path = "";
    }

    public ExcelTemplate(String path, String name) {
        this.path = path;
        this.name = name;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public String getSavePath() {
        return savePath;
    }

    public void setSavePath(String savePath) {
        this.savePath = savePath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
