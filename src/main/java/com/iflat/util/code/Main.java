package com.iflat.util.code;

import java.io.File;
import java.io.IOException;

/**
 * Created by tyriv on 2016/8/6.
 */
public class Main {

    private String className;

    public Main(String className) {
        this.className = className;
    }

    public static void generate(String className) {

        Main main = new Main(className);

        String projectRootPath = main.getPath() + "\\";
        String javaRoot = projectRootPath + "src\\main\\java\\";
        String resourcesRoot = projectRootPath + "src\\main\\resources\\";
        String mybatisRoot = resourcesRoot + "mapper\\";
        String springRoot = resourcesRoot + "spring\\";
        String sqlRoot = resourcesRoot + "sqlscript\\";
        String extjsRoot = projectRootPath + "web\\app\\";

        try {
            // 生成Dao
            DaoCoding.generate(main.getClassName(), javaRoot);

            // 生成Service
            ServiceCoding.generate(main.getClassName(), javaRoot);

            // 生成或编辑Action
            ActionCoding.generate(main.getClassName(), javaRoot);

            // 生成Mapper
            MybatisCoding.generate(main.getClassName(), mybatisRoot);

            // 生成/修改spring
            SpringCoding.generate(main.getClassName(), springRoot);

            // 修改struts.xml
            StrutsCoding.generate(main.getClassName(), resourcesRoot);

            // 生成Ext Model
            ExtModelCoding.generate(main.getClassName(), extjsRoot);

            // 生成Ext Store
            ExtStoreCoding.generate(main.getClassName(), extjsRoot);

            // 生成CREATE TABLE语句
            MsSqlCoding.generate(main.getClassName(), sqlRoot);


        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    public String getPath() {
        File directory = new File("");
        String path = null;
        try {
            path = directory.getCanonicalPath();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path;
    }

    public String getClassName() {
        return className;
    }
}
