package com.iflat.util.code;

import com.iflat.util.FileUtil;
import com.iflat.util.StringUtil;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;

/**
 * Created by tyriv on 2016/8/6.
 */
public class MsSqlCoding {

    public static void generate(String className, String path) throws ClassNotFoundException {

        String temp = className.replace("com.iflat.", "")
                .replace("bean.", "")
                .replace("entity.", "");
        String[] arr = temp.split("\\.");
        String tableName = "";
        for (int i = 0; i < arr.length; i++) {
            tableName = tableName + StringUtil.upperCaseFirstChar(arr[i]);
        }

        path = path + "mssql\\";
        String fileName = temp.replace(".", "-") + ".sql";
        String filePath = path + fileName;
        File file = new File(filePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

        StringBuilder sb = new StringBuilder("CREATE TABLE ").append(tableName).append("\n")
                .append("(").append("\n");

        Field[] field = Class.forName(className).getDeclaredFields();
        for (int j = 0; j < field.length; j++) { //遍历所有属性
            String name = field[j].getName(); //获取属性的名字
            String type = field[j].getGenericType().toString(); //获取属性的类型
            String sqlType = "";
            switch (type) {
                case "class java.lang.String":
                    sqlType = "VARCHAR(100)";
                    break;
                case "String":
                    sqlType = "VARCHAR(100)";
                    break;
                case "class java.lang.Integer":
                    sqlType = "INT";
                    break;
                case "int":
                    sqlType = "INT";
                    break;
                case "class java.lang.Short":
                    sqlType = "INT";
                    break;
                case "short":
                    sqlType = "INT";
                    break;
                case "class java.lang.Double":
                    sqlType = "DECIMAL(18, 2)";
                    break;
                case "double":
                    sqlType = "DECIMAL(18, 2)";
                    break;
                case "class java.lang.Boolean":
                    sqlType = "BIT";
                    break;
                case "boolean":
                    sqlType = "BIT";
                    break;
                case "class java.util.Date":
                    sqlType = "DATETIME";
                    break;
            }
            if ("id".equals(name)) {
                sqlType = "CHAR(36)";
            }
            if (!StringUtil.isBlank(sqlType)) {
                sb.append("    ").append(name).append(" ").append(sqlType).append(",").append("\n");
            }
        }
        sb.append(")");

        FileUtil.write(filePath, sb.toString());


    }
}
