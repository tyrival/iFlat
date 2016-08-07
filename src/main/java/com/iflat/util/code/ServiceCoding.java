package com.iflat.util.code;

import com.iflat.util.FileUtil;

import java.io.File;
import java.io.IOException;

/**
 * Created by tyriv on 2016/8/6.
 */
public class ServiceCoding {
    public static void generate(String className, String javaRootPath) {

        String serviceClassName = className
                .replace(".bean.", ".service.impl.")
                .replace(".entity.", ".service.impl.")
                + "ServiceImpl";
        String packageName = serviceClassName.substring(0, serviceClassName.lastIndexOf("."));
        String shortClassName = serviceClassName.substring(serviceClassName.lastIndexOf(".") + 1, serviceClassName.length());
        String serviceFilePath = javaRootPath + serviceClassName.replace(".", "\\") + ".java";
        File file = new File(serviceFilePath);
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
                .append("import com.iflat.base.service.impl.BaseServiceSupport;\n")
                .append("\n")
                .append("public class ").append(shortClassName).append(" extends BaseServiceSupport {\n")
                .append("}\n");

        FileUtil.write(serviceFilePath, sb.toString());
    }
}
