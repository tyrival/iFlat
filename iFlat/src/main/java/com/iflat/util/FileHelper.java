package com.iflat.util;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import java.io.File;
import java.util.Calendar;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/16.
 */
public class FileHelper {

    public static String delete(String filePath) throws Exception {
        File f = new File(Application.getWebRootPath() + filePath);
        if(f.exists()) {
            f.delete();
        }
        return filePath;
    }

    /**
     *
     * @param upload
     * @param fileName
     * @return
     * @throws Exception
     */
    public static String upload(File upload, String fileName) throws Exception {
        return upload(upload, fileName, "");
    }

    public static String upload(File upload, String fileName, String document) throws Exception {
        return upload(upload, UUID.randomUUID().toString() + "_" + fileName, document, "month");
    }

    public static String upload(File upload, String fileName, String document, String period) throws Exception {

        Calendar calendar = Calendar.getInstance();
        StringBuilder stringBuilder = new StringBuilder(document);
        if("year".equals(period.toLowerCase())) {
            stringBuilder.append(calendar.get(Calendar.YEAR)).append(".");
        } else if("day".equals(period.toLowerCase())) {
            stringBuilder.append(calendar.get(Calendar.YEAR))
                    .append("/")
                    .append(calendar.get(Calendar.MONTH) + 1)
                    .append("/")
                    .append(calendar.get(Calendar.DATE))
                    .append("/");
        } else {
            stringBuilder.append(calendar.get(Calendar.YEAR))
                    .append("/")
                    .append(calendar.get(Calendar.MONTH) + 1)
                    .append("/");
        }
        document = stringBuilder.toString();

        String root = ServletActionContext.getServletContext().getRealPath("/upfiles/" + document);
        File file = new File(root);
        if(!file.exists()) {
            file.mkdirs();
        }

        FileUtils.copyFile(upload, new File(file, fileName));
        return "/upfiles/" + document + fileName;
    }
}
