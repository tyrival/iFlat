package com.iflat.util.code;

import com.iflat.util.FileUtil;
import com.iflat.util.StringUtil;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;

/**
 * Created by tyriv on 2016/8/6.
 */
public class ExtModelCoding {

    public static void generate(String className, String extRootPath) {

        String temp = className.replace("com.iflat", "")
                .replace("bean.", "")
                .replace("entity.", "");
        String moduleName = temp.substring(0, temp.lastIndexOf("."));
        String shortClassName = temp.substring(temp.lastIndexOf(".") + 1, temp.length());
        String filePath = extRootPath + "model\\" + moduleName.replace(".", "\\") + "\\" + shortClassName + ".js";
        File file = new File(filePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

        String extClassName = "iFlat.model" + moduleName + "." + shortClassName;
        StringBuilder sb = new StringBuilder();
        sb = sb.append("Ext.define('").append(extClassName).append("', {\n")
                .append("    extend: 'Ext.data.Model',\n")
                .append("    fields: [\n");
        String lowerShortClassName = shortClassName.toLowerCase();
        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) { //遍历所有属性
                String name = field[j].getName(); //获取属性的名字
                //name = name.substring(0,1).toUpperCase()+name.substring(1); //将属性的首字符大写，方便构造get，set方法
                String type = field[j].getGenericType().toString(); //获取属性的类型
                String jstype = "";
                switch (type) {
                    case "class java.lang.String":
                        jstype = "string";
                        break;
                    case "String":
                        jstype = "string";
                        break;
                    case "class java.lang.Integer":
                        jstype = "number";
                        break;
                    case "int":
                        jstype = "number";
                        break;
                    case "class java.lang.Short":
                        jstype = "number";
                        break;
                    case "short":
                        jstype = "number";
                        break;
                    case "class java.lang.Double":
                        jstype = "number";
                        break;
                    case "double":
                        jstype = "number";
                        break;
                    case "class java.lang.Boolean":
                        jstype = "boolean";
                        break;
                    case "boolean":
                        jstype = "boolean";
                        break;
                    case "class java.util.Date":
                        jstype = "date";
                        break;
                }
                if (!StringUtil.isBlank(jstype)) {
                    sb.append("        {name: '").append(lowerShortClassName).append(".").append(name).append("', mapping: '").append(name).append("', type: '").append(jstype).append("'},\n");
                }
            }
            sb.append("    ]\n").append("});");

            FileUtil.write(filePath, sb.toString());

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
