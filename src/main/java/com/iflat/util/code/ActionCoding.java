package com.iflat.util.code;

import com.iflat.util.FileUtil;
import com.iflat.util.StringUtil;

import java.io.File;
import java.io.IOException;

/**
 * Created by tyriv on 2016/8/6.
 */
public class ActionCoding {

    public static void generate(String className, String path) throws IOException {
        String temp = className.replace(".bean.", ".action.")
                .replace(".entity.", ".action.");
        String packageName = temp.substring(0, temp.lastIndexOf("."));

        String t = temp.replace("com.iflat.", "");
        String moduleName = t.substring(0, t.indexOf("."));
        String shortClassName = temp.substring(temp.lastIndexOf(".") + 1, temp.length());
        String variableName = StringUtil.lowerCaseFirstChar(shortClassName);
        String actionClassName = StringUtil.upperCaseFirstChar(moduleName) + "Action";
        String actionFilePath = path + temp.replace(shortClassName, StringUtil.upperCaseFirstChar(moduleName) + "Action").replace(".", "\\") + ".java";

        File file = new File(actionFilePath);
        if (!file.exists()) {
            file.createNewFile();
        }

        String orig = FileUtil.read(actionFilePath);
        StringBuilder content = new StringBuilder();
        if (orig == null || "".equals(orig)) {
            content.append("package ").append(packageName).append(";").append("\n")
                    .append("\n")
                    .append("import com.iflat.base.action.impl.BaseAction;").append("\n")
                    .append("import com.iflat.base.entity.Page;").append("\n")
                    .append("import com.iflat.base.service.BaseService;").append("\n")
                    .append("import com.opensymphony.xwork2.ModelDriven;").append("\n")
                    .append("\n")
                    .append("import java.io.File;").append("\n")
                    .append("\n")
                    .append("public class ").append(actionClassName).append(" extends BaseAction implements ModelDriven<Page> {").append("\n")
                    .append("\n")
                    .append("    protected Page page;").append("\n")
                    .append("    private File upload;").append("\n").append("\n")
                    .append("    private String uploadFileName;").append("\n").append("\n")
                    .append("    public Page getPage() { return page; }").append("\n").append("\n")
                    .append("    public void setPage(Page page) { this.page = page; }").append("\n").append("\n")
                    .append("    public File getUpload() { return upload; }").append("\n").append("\n")
                    .append("    public void setUpload(File upload) { this.upload = upload; }").append("\n").append("\n")
                    .append("    public String getUploadFileName() { return uploadFileName; }").append("\n").append("\n")
                    .append("    public void setUploadFileName(String uploadFileName) { this.uploadFileName = uploadFileName; }").append("\n").append("\n")
                    .append("    @Override").append("\n")
                    .append("    public Page getModel() {").append("\n")
                    .append("        if(page == null){").append("\n")
                    .append("            page = new Page();").append("\n")
                    .append("        }").append("\n")
                    .append("        return page;").append("\n")
                    .append("    }").append("\n")
                    .append("}");
            
            orig = content.toString();
        }

        String head = orig.substring(0, orig.indexOf("import"));
        String body = orig.replace(head, "");
        body = body.substring(0, body.length() - 1);
        
        StringBuilder sbHead = new StringBuilder(head);
        StringBuilder sbBody = new StringBuilder(body);
        /* import */
        sbHead.append("import ").append(className).append(";").append("\n");

        /* 变量 Service getter setter*/
        sbBody.append("\n")
                .append("    private BaseService ").append(variableName).append("Service;").append("\n")
                .append("    private ").append(shortClassName).append(" ").append(variableName).append(";").append("\n")
                .append("\n")
                .append("    public BaseService get").append(shortClassName).append("Service() { return ").append(variableName).append("Service; }").append("\n")
                .append("\n")
                .append("    public void set").append(shortClassName).append("Service(BaseService ").append(variableName).append("Service) { this.").append(variableName).append("Service = ").append(variableName).append("Service; }")
                .append("\n")
                .append("    public ").append(shortClassName).append(" get").append(shortClassName).append("() { return ").append(variableName).append("; }")
                .append("\n")
                .append("    public void set").append(shortClassName).append("(").append(shortClassName).append(" ").append(variableName).append(") { this.").append(variableName).append(" = ").append(variableName).append("; }").append("\n")
                .append("\n");
        
        /* save */
        sbBody.append("    public String save").append(shortClassName).append("() throws Exception {").append("\n")
                .append("        this.result.setObject(this.").append(variableName).append("Service.save(this.").append(variableName).append("));").append("\n")
                .append("        return SUCCESS;").append("\n")
                .append("    }").append("\n")
                .append("\n");
        
        /* delete */
        sbBody.append("    public String delete").append(shortClassName).append("() throws Exception {").append("\n")
                .append("        this.result.setObject(this.").append(variableName).append("Service.delete(this.").append(variableName).append("));").append("\n")
                .append("        return SUCCESS;").append("\n")
                .append("    }").append("\n")
                .append("\n");

        /* list */
        sbBody.append("    public String list").append(shortClassName).append("() throws Exception {").append("\n")
                .append("        this.result.setList(this.").append(variableName).append("Service.list(this.").append(variableName).append("));").append("\n")
                .append("        return SUCCESS;").append("\n")
                .append("    }").append("\n")
                .append("\n");
        
        /* listPage */
        sbBody.append("    public String listPage").append(shortClassName).append("() throws Exception {").append("\n")
                .append("        this.result.setObject(this.").append(variableName).append("Service.listPage(this.").append(variableName).append(", this.page));").append("\n")
                .append("        return SUCCESS;").append("\n")
                .append("    }").append("\n")
                .append("\n");
        
        /* upload */
        sbBody.append("    public String upload").append(shortClassName).append("() throws Exception {").append("\n")
                .append("        this.result.setObject(this.").append(variableName).append("Service.uploadFile(upload, uploadFileName));").append("\n")
                .append("        return SUCCESS;").append("\n")
                .append("    }").append("\n")
                .append("\n");

        sbBody.append("}");

        String finalContent = sbHead.append(sbBody).toString();
        FileUtil.write(actionFilePath, finalContent);
                
    }
}
