package com.iflat.util.code;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * Created by tyriv on 2016/8/6.
 */
public class CodeUtil {

    private String className;

    public CodeUtil(String className) {
        this.className = className;
    }

    public static void generate(String className) {
        generate(className, null);
    }

    public static void generate(String className, String exclude) {

        CodeUtil main = new CodeUtil(className);

        String projectRootPath = main.getPath() + "\\";
        String javaRoot = projectRootPath + "src\\main\\java\\";
        String resourcesRoot = projectRootPath + "src\\main\\resources\\";
        String mybatisRoot = resourcesRoot + "mapper\\";
        String springRoot = resourcesRoot + "spring\\";
        String sqlRoot = resourcesRoot + "sqlscript\\";
        String extjsRoot = projectRootPath + "web\\app\\";

        boolean dao = true;
        boolean service = true;
        boolean action = true;
        boolean spring = true;
        boolean mybatis = true;
        boolean struts = true;
        boolean extmodel = true;
        boolean extstore = true;
        boolean extview = true;
        boolean mssql = true;

        if (exclude != null) {
            String[] array = exclude.split(",");
            for (int i = 0; i < array.length; i++) {
                String ex = array[i].toLowerCase();
                if ("dao".equals(ex)) {
                    dao = false;
                }
                if ("service".equals(ex)) {
                    service = false;
                }
                if ("action".equals(ex)) {
                    action = false;
                }
                if ("spring".equals(ex)) {
                    spring = false;
                }
                if ("mybatis".equals(ex) || "mapper".equals(ex)) {
                    mybatis = false;
                }
                if ("struts".equals(ex)) {
                    struts = false;
                }
                if ("mssql".equals(ex)) {
                    mssql = false;
                }
                if ("extmodel".equals(ex) || "model".equals(ex)) {
                    extmodel = false;
                }
                if ("extstore".equals(ex) || "store".equals(ex)) {
                    extstore = false;
                }
                if ("extview".equals(ex) || "view".equals(ex)) {
                    extview = false;
                }
            }
        }

        try {
            if (dao) {
                DaoCoding.generate(main.getClassName(), javaRoot);
            }

            if (service) {
                ServiceCoding.generate(main.getClassName(), javaRoot);
            }

            if (action) {
                // 生成或编辑Action
                ActionCoding.generate(main.getClassName(), javaRoot);
            }

            if (mybatis) {
                // 生成Mapper
                MybatisCoding.generate(main.getClassName(), mybatisRoot);
            }

            if (spring) {
                // 生成/修改spring
                SpringCoding.generate(main.getClassName(), springRoot);
            }

            if (struts) {
                // 修改struts.xml
                StrutsCoding.generate(main.getClassName(), resourcesRoot);
            }

            if (extmodel) {
                // 生成Ext Model
                ExtModelCoding.generate(main.getClassName(), extjsRoot);
            }

            if (extstore) {
                // 生成Ext Store
                ExtStoreCoding.generate(main.getClassName(), extjsRoot);
            }

            if (extview) {
                // 生成Ext Store
                ExtViewCoding.generate(main.getClassName(), extjsRoot);
            }

            if (mssql) {
                // 生成CREATE TABLE语句
                MsSqlCoding.generate(main.getClassName(), sqlRoot);
            }


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
