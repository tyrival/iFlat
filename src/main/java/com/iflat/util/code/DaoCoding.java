package com.iflat.util.code;

import com.iflat.util.FileUtil;

import java.io.File;
import java.io.IOException;

/**
 * Created by tyriv on 2016/8/6.
 */
public class DaoCoding {

    public static void generate(String className, String javaRootPath) {

        String daoClassName = className
                .replace(".bean.", ".dao.impl.")
                .replace(".entity.", ".dao.impl.")
                + "DaoImpl";
        String packageName = daoClassName.substring(0, daoClassName.lastIndexOf("."));
        String shortClassName = daoClassName.substring(daoClassName.lastIndexOf(".") + 1, daoClassName.length());
        String daoFilePath = javaRootPath + daoClassName.replace(".", "\\") + ".java";
        File file = new File(daoFilePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

        StringBuilder sb = new StringBuilder();
        sb = sb.append("package ").append(packageName).append(";\n")
                .append("\n")
                .append("import com.iflat.base.dao.impl.BaseDaoSupport;\n")
                .append("\n")
                .append("public class ").append(shortClassName).append(" extends BaseDaoSupport {\n")
                .append("}\n");

        FileUtil.write(daoFilePath, sb.toString());
    }
}
