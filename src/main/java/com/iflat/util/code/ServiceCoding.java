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
        String serviceInterface = className
                .replace(".bean.", ".service.")
                .replace(".entity.", ".service.")
                + "Service";
        String packageName = serviceClassName.substring(0, serviceClassName.lastIndexOf("."));
        String packageInterfaceName = serviceInterface.substring(0, serviceInterface.lastIndexOf("."));
        String shortClassName = serviceClassName.substring(serviceClassName.lastIndexOf(".") + 1, serviceClassName.length());
        String shortInterface = serviceInterface.substring(serviceInterface.lastIndexOf(".") + 1, serviceInterface.length());
        String serviceFilePath = javaRootPath + serviceClassName.replace(".", "\\") + ".java";
        String serviceInterfaceFilePath = javaRootPath + serviceInterface.replace(".", "\\") + ".java";
        File file = new File(serviceFilePath);
        File fileInterface = new File(serviceInterfaceFilePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
                fileInterface.createNewFile();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

        StringBuilder sb = new StringBuilder();
        sb = sb.append("package ").append(packageName).append(";\n")
                .append("\n")
                .append("import com.iflat.base.service.impl.BaseServiceSupport;").append("\n")
                .append("import ").append(serviceInterface).append(";").append("\n")
                .append("\n")
                .append("public class ").append(shortClassName).append(" extends BaseServiceSupport implements ").append(shortInterface).append(" {").append("\n")
                .append("}\n");

        StringBuilder sbInterface = new StringBuilder();
        sbInterface = sbInterface.append("package ").append(packageInterfaceName).append(";\n")
                .append("\n")
                .append("import com.iflat.base.service.BaseService;\n")
                .append("\n")
                .append("public interface ").append(shortInterface).append(" extends BaseService").append(" {").append("\n")
                .append("}\n");

        FileUtil.write(serviceFilePath, sb.toString());
        FileUtil.write(serviceInterfaceFilePath, sbInterface.toString());
    }
}
