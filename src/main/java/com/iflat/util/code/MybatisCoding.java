package com.iflat.util.code;

import com.iflat.util.FileUtil;
import com.iflat.util.StringUtil;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;

/**
 * Created by tyriv on 2016/8/6.
 */
public class MybatisCoding {

    public static void generate(String className, String mybatisRoot) {

        String temp = className.replace("com.iflat.", "")
                .replace("bean.", "")
                .replace("entity.", "");
        String packageName = temp.substring(0, temp.lastIndexOf("."));
        String moduleName[] = packageName.split(".");
        if (moduleName.length == 0) {
            moduleName = new String[]{packageName};
        }

        String shortClassName = temp.substring(temp.lastIndexOf(".") + 1, temp.length());
        String filePath = mybatisRoot + packageName.replace(".", "\\") + "\\" + shortClassName + "Mapper.xml";
        File file = new File(filePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

        String namespace = "";
        for (int i = 0; i < moduleName.length; i++) {
            namespace = namespace + StringUtil.upperCaseFirstChar(moduleName[i]) + ".";
        }
        namespace = namespace.substring(0, namespace.length() - 1);
        StringBuilder sb = new StringBuilder();
        sb = sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n")
                .append("<!DOCTYPE mapper\n")
                .append("        PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\"\n")
                .append("        \"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\n")
                .append("<mapper namespace=\"").append(namespace).append(".").append(shortClassName).append("\">\n")
                .append("\n");

        String tableName = namespace.replace(".", "") + shortClassName;
        sb.append(formatInsert(className, tableName))
                .append(formatInsertBatch(className, tableName))
                .append(formatUpdae(className, tableName))
                .append(formatUpdaeBatch(className, tableName))
                .append(formatDelete(className, tableName))
                .append(formatSelect(className, tableName))
                .append(formatResult(className, tableName))
                .append("</mapper>");
        FileUtil.write(filePath, sb.toString());
    }

    private static String formatInsert(String className, String tableName) {
        String insertPre = "<insert id=\"insert\" parameterType=\"" + className + "\">\n";
        String insertEnd = "</insert>\n\n";

        StringBuilder insertBody = new StringBuilder("    INSERT INTO ").append(tableName).append("\n")
                .append("    VALUES (");
        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) { //遍历所有属性
                String name = field[j].getName(); //获取属性的名字
                insertBody.append("#{").append(name).append("},");
            }
            insertBody = new StringBuilder(insertBody.substring(0, insertBody.length() - 1));
            insertBody.append(")").append("\n");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return insertPre + insertBody.toString() + insertEnd;
    }

    private static String formatInsertBatch(String className, String tableName) {

        String insertBatchPre = "<insert id=\"insertBatch\" parameterType=\"java.util.List\">\n";
        String insertBatchEnd = "</insert>\n\n";

        StringBuilder insertBatchBody = new StringBuilder("    INSERT INTO ").append(tableName).append("\n")
                .append("        <foreach collection=\"list\" item=\"item\" index=\"index\" separator=\"UNION ALL\">").append("\n")
                .append("            SELECT ");

        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) { //遍历所有属性
                String name = field[j].getName(); //获取属性的名字
                insertBatchBody.append("#{item.").append(name).append("},");
            }
            insertBatchBody = new StringBuilder(insertBatchBody.substring(0, insertBatchBody.length() - 1));
            insertBatchBody.append("\n")
                    .append("        </foreach>").append("\n");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return insertBatchPre + insertBatchBody.toString() + insertBatchEnd;
    }

    private static String formatUpdae(String className, String tableName) {

        String updatePre = "<update id=\"update\" parameterType=\"" + className + "\">\n";
        String updateEnd = "</update>\n\n";

        StringBuilder updateBody = new StringBuilder("    UPDATE ").append(tableName).append("\n")
                .append("    <set>").append("\n");
        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) { //遍历所有属性
                String name = field[j].getName(); //获取属性的名字
                updateBody.append("        <if test=\"").append(name).append("!=null\">").append(name).append("=#{").append(name).append("},</if>\n");
            }
            updateBody.append("    </set>").append("\n")
                    .append("    WHERE id=#{id}").append("\n");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return updatePre + updateBody.toString() + updateEnd;
    }

    private static String formatUpdaeBatch(String className, String tableName) {
        String updateBatchPre = "<update id=\"updateBatch\" parameterType=\"java.util.List\">\n";
        String updateBatchEnd = "</update>\n\n";

        StringBuilder updateBatchBody = new StringBuilder("    UPDATE ").append(tableName).append(" SET ");
        StringBuilder mid
                = new StringBuilder("    <foreach collection=\"list\" item=\"item\" index=\"index\" separator=\"UNION ALL\">\n")
                .append("        SELECT ");
        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) { //遍历所有属性
                String name = field[j].getName(); //获取属性的名字
                updateBatchBody.append(name).append("=a.").append(name).append(",");
                mid.append("#{item.").append(name).append("} as ").append(name).append(",");
            }
            updateBatchBody = new StringBuilder(updateBatchBody.substring(0, updateBatchBody.length() - 1));
            updateBatchBody.append("\n")
                    .append("    FROM (").append("\n");

            mid = new StringBuilder(mid.substring(0, mid.length() - 1));
            mid.append("\n")
                    .append("    </foreach>").append("\n");

            updateBatchBody.append(mid)
                    .append("    ) AS a\n")
                    .append("    WHERE ").append(tableName).append(".id=a.id\n");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return updateBatchPre + updateBatchBody.toString() + updateBatchEnd;
    }

    private static String formatDelete(String className, String tableName) {
        String deletePre = "<delete id=\"delete\" parameterType=\"String\">\n";
        String deleteEnd = "</delete>\n\n";

        StringBuilder deleteBody = new StringBuilder("    DELETE ").append(tableName).append("\n")
                .append("    WHERE id=#{id}").append("\n");
        return deletePre + deleteBody.toString() + deleteEnd;
    }

    private static String formatSelect(String className, String tableName) {
        String selectPre = "<select id=\"list\" parameterType=\"" + className + "\" resultMap=\"" + tableName+ "Result\">\n";
        String selectEnd = "</select>\n\n";

        StringBuilder selectBody = new StringBuilder("    SELECT ");
        StringBuilder mid = new StringBuilder("    <where>\n");
        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) { //遍历所有属性
                String name = field[j].getName(); //获取属性的名字
                selectBody.append(name).append(",");

                String type = field[j].getGenericType().toString();
                if ("class java.lang.String".equals(type)) {

                    // <if test="id!=null and !&quot;&quot;.equals(id.trim())">id=#{id}</if>
                    mid.append("        <if test=\"").append(name).append("!=null and !&quot;&quot;.equals(").append(name).append(".trim())\">AND ").append(name).append("=#{").append(name).append("}</if>\n");
                }/* else {

                    // <if test="id!=null">id=#{id}</if>
                    mid.append("        <if test=\"").append(name).append("!=null\">").append(name).append("=#{").append(name).append("}</if>\n");
                }*/
            }
            selectBody = new StringBuilder(selectBody.substring(0, selectBody.length() - 1));
            mid.append("    </where>").append("\n");
            selectBody.append("\n")
                    .append("    FROM ").append(tableName).append("\n")
                    .append(mid)
                    .append("    ORDER BY id").append("\n");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return selectPre + selectBody.toString() + selectEnd;
    }

    private static String formatResult(String className, String tableName) {
        String resultPre = "<resultMap type=\"" + className + "\" id=\"" + tableName + "Result\">\n";
        String resultEnd = "</resultMap>\n";
        StringBuilder resultBody = new StringBuilder();
        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) { //遍历所有属性
                String name = field[j].getName(); //获取属性的名字
                String type = field[j].getGenericType().toString(); //获取属性的类型
                String jdbcType = "";
                switch (type) {
                    case "class java.lang.String":
                        jdbcType = "VARCHAR";
                        break;
                    case "string":
                        jdbcType = "VARCHAR";
                        break;
                    case "class java.lang.Integer":
                        jdbcType = "INTEGER";
                        break;
                    case "int":
                        jdbcType = "INTEGER";
                        break;
                    case "class java.lang.Short":
                        jdbcType = "INTEGER";
                        break;
                    case "short":
                        jdbcType = "INTEGER";
                        break;
                    case "class java.lang.Double":
                        jdbcType = "DOUBLE";
                        break;
                    case "double":
                        jdbcType = "DOUBLE";
                        break;
                    case "class java.lang.Boolean":
                        jdbcType = "BIT";
                        break;
                    case "boolean":
                        jdbcType = "BIT";
                        break;
                    case "class java.util.Date":
                        jdbcType = "DATE";
                        break;
                }
                if (!StringUtil.isBlank(jdbcType)) {
                    // <result property="id" column="id" jdbcType="CHAR"/>
                    resultBody.append("    <result property=\"").append(name).append("\" column=\"").append(name).append("\" jdbcType=\"").append(jdbcType).append("\"/>\n");
                }
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return resultPre + resultBody.toString() + resultEnd;
    }
}
