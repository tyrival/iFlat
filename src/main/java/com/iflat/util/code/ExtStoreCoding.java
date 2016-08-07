package com.iflat.util.code;

import com.iflat.util.FileUtil;

import java.io.File;
import java.io.IOException;

/**
 * Created by tyriv on 2016/8/6.
 */
public class ExtStoreCoding {
    public static void generate(String className, String extRootPath) {

        String temp = className.replace("com.iflat", "")
                .replace("bean.", "")
                .replace("entity.", "");
        String packageName = temp.substring(1, temp.lastIndexOf("."));
        String moduleName = packageName.substring(packageName.lastIndexOf(".") + 1, packageName.length());
        String shortClassName = temp.substring(temp.lastIndexOf(".") + 1, temp.length());
        String filePath = extRootPath + "store\\" + packageName.replace(".", "\\") + "\\" + shortClassName + ".js";
        File file = new File(filePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

        String extClassName = "iFlat.store" + packageName + "." + shortClassName;
        StringBuilder sb = new StringBuilder();
        sb = sb.append("Ext.define('").append(extClassName).append("', {\n")
                .append("\n")
                .append("    autoLoad: true,\n")
                .append("    model: 'iFlat.model.").append(packageName).append(".").append(shortClassName).append("',\n")
                .append("\n")
                .append("    pageSize: 0,\n")
                .append("    proxy: {\n")
                .append("        type: 'ajax',\n")
                .append("        url: '").append(moduleName).append("_list").append(shortClassName).append(".action',\n")
                .append("        reader: {\n")
                .append("            type: 'json',\n")
                .append("            rootProperty: 'list',\n")
                .append("        },\n")
                .append("    },\n")
                .append("});");

        FileUtil.write(filePath, sb.toString());

        // 分页store
        String filePathPage = extRootPath + "store\\" + packageName.replace(".", "\\") + "\\" + shortClassName + "Page.js";
        File filePage = new File(filePathPage);
        if (!filePage.exists()) {
            try {
                filePage.createNewFile();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        String extClassNamePage = "iFlat.store" + packageName + "." + shortClassName + "Page";
        StringBuilder sbPage = new StringBuilder();
        sbPage = sbPage.append("Ext.define('").append(extClassNamePage).append("', {\n")
                .append("\n")
                .append("    autoLoad: true,\n")
                .append("    model: 'iFlat.model.").append(packageName).append(".").append(shortClassName).append("',\n")
                .append("\n")
                .append("    pageSize: 20,\n")
                .append("    proxy: {\n")
                .append("        enablePaging: true,\n")
                .append("        type: 'ajax',\n")
                .append("        url: '").append(moduleName).append("_listPage").append(shortClassName).append(".action',\n")
                .append("        reader: {\n")
                .append("            type: 'json',\n")
                .append("            rootProperty: 'object.list',\n")
                .append("            totalProperty: 'object.total'\n")
                .append("        },\n")
                .append("    },\n")
                .append("});");

        FileUtil.write(filePathPage, sbPage.toString());
    }
}
