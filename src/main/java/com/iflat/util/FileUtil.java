package com.iflat.util;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import java.io.*;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Created by tyriv on 2015/11/16.
 */
public class FileUtil {

    /**
     * 读取文件内容
     *
     * @param filePath
     * @return
     */
    public static String read(String filePath) {
        BufferedReader br = null;
        String line = null;
        StringBuffer buf = new StringBuffer();

        try {
            // 根据文件路径创建缓冲输入流
            br = new BufferedReader(new FileReader(filePath));

            // 循环读取文件的每一行, 对需要修改的行进行修改, 放入缓冲对象中
            while ((line = br.readLine()) != null) {
                buf.append(line).append("\n");
                /*// 此处根据实际需要修改某些行的内容
                if (line.startsWith("a")) {
                    buf.append(line).append(" start with a");
                }
                else if (line.startsWith("b")) {
                    buf.append(line).append(" start with b");
                }
                // 如果不用修改, 则按原来的内容回写
                else {
                    buf.append(line);
                }
                buf.append(System.getProperty("line.separator"));*/
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    br = null;
                }
            }
        }

        return buf.toString();
    }

    /**
     * 将内容回写到文件中
     *
     * @param filePath
     * @param content
     */
    public static void write(String filePath, String content) {
        BufferedWriter bw = null;

        try {
            // 根据文件路径创建缓冲输出流
            bw = new BufferedWriter(new FileWriter(filePath));
            // 将内容写入文件中
            bw.write(content);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    bw = null;
                }
            }
        }
    }
    public void fileAppender(String fileName,String content) throws IOException{

        BufferedReader reader = new BufferedReader(new FileReader(fileName));
        String line = null;
        // 一行一行的读
        StringBuilder sb = new StringBuilder();
        sb.append(content);
        while ((line = reader.readLine()) != null) {
            sb.append(line);
            sb.append("\r\n");
        }
        reader.close();

        //写回去
        RandomAccessFile mm = new RandomAccessFile(fileName, "rw");
        mm.writeBytes(sb.toString());
        mm.close();
    }


    public static File inputStreamToFile(InputStream inputStream, String fileName) throws Exception {

        File file = new File(fileName);
        OutputStream outputStream = new FileOutputStream(file);
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        while ((bytesRead = inputStream.read(buffer, 0, 8192)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        outputStream.close();
        inputStream.close();
        return file;
    }

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
        return upload(upload, UUID.randomUUID().toString() + "-" + fileName, document, "month");
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
    public static String downloadBatch(List<String> downloadFileList)throws Exception{
        return downloadBatch(downloadFileList, "download" + UUID.randomUUID().toString());
    }

    public static String downloadBatch(List<String> downloadFileList, String zipFileName)throws Exception{

        String rootPath = Application.getWebRootPath();

        zipFileName = zipFileName + "[" + UUID.randomUUID().toString() + "].zip";
        File zipFile = new File(ServletActionContext.getServletContext().getRealPath("/download/") + zipFileName);
        if (!zipFile.exists()) {
            zipFile.createNewFile();
        }
        ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipFile));
        int temp = 0 ;

        FileInputStream input=null;
        for (int i = 0; i < downloadFileList.size(); i++) {
            try {
                File files = new File(rootPath + downloadFileList.get(i));
                input = new FileInputStream(files);
                zos.putNextEntry(new ZipEntry(files.getName()));//将文件加入到Entry中
                while ((temp = input.read()) != -1) { // 读取内容
                    zos.write(temp);    // 压缩输出
                }
            } catch (Exception e) {

            }
        }

        input.close();
        zos.close();
        return "/download/" + zipFileName;
    }
}
