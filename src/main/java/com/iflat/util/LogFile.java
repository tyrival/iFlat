package com.iflat.util;

import com.opensymphony.xwork2.ActionContext;
import org.apache.struts2.ServletActionContext;

import javax.servlet.ServletContext;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class LogFile {

    public static void write(String logDocName, String log) throws Exception {

        String dirPath = getDir(logDocName);
        File filePath = new File(dirPath);
        creatDir(filePath);
        String fileName = generateFileName();
        File file = new File(dirPath + fileName);
        creatFile(file);
        addLog(file, log);
    }

    private static String getDir(String logDocName) throws Exception {
        String local = Application.getWebRootPath();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        Date date = new Date();
        String subPath = sdf.format(date);
        return local + logDocName + "/" + subPath + "/";
    }

    /**
     * 根据日志根路径和当天日期，生成日志文件名
     */
    private static String generateFileName() throws Exception {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        return "Log_" + sdf.format(date) + ".txt";
    }

    private static void creatDir(File filename) throws Exception {
        if (!filename.exists()) {
            filename.mkdirs();
        }
    }

    private static void creatFile(File filename) throws Exception {
        if (!filename.exists()) {
            filename.createNewFile();
        }
    }

    /**
     * 增加日志.
     */
    private static void addLog(File file, String newLog) throws Exception {
        String readLog = readLog(file);
        String writeLog = newLog + "\r\n" + "====================" + "\r\n" + readLog;
        OutputStreamWriter write = new OutputStreamWriter(new FileOutputStream(file), "utf-8");
        BufferedWriter writer = new BufferedWriter(write);
        writer.write(writeLog);
        writer.close();
    }

    /**
     * 读取文本文件.
     */
    private static String readLog(File file) throws Exception {
        String readStr = "";
        InputStreamReader reader = new InputStreamReader(new FileInputStream(file), "utf-8");
        BufferedReader bufferedReader = new BufferedReader(reader);
        String read;
        while ((read = bufferedReader.readLine()) != null) {
            readStr = readStr + read+ "\r\n";
        }
        return readStr;
    }

/*    *//**
     * 将文件中指定内容的第一行替换为其它内容.
     *
     * @param oldStr
     *            查找内容
     * @param replaceStr
     *            替换内容
     *//*
    public static void replaceLogByStr(String filename, String oldStr,String replaceStr) {
        String temp = "";
        try {
            File file = new File(filename);
            FileInputStream fis = new FileInputStream(file);
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);
            StringBuffer buf = new StringBuffer();

            // 保存该行前面的内容
            for (int j = 1; (temp = br.readLine()) != null
                    && !temp.equals(oldStr); j++) {
                buf = buf.append(temp);
                buf = buf.append(System.getProperty("line.separator"));
            }

            // 将内容插入
            buf = buf.append(replaceStr);

            // 保存该行后面的内容
            while ((temp = br.readLine()) != null) {
                buf = buf.append(System.getProperty("line.separator"));
                buf = buf.append(temp);
            }

            br.close();
            FileOutputStream fos = new FileOutputStream(file);
            PrintWriter pw = new PrintWriter(fos);
            pw.write(buf.toString().toCharArray());
            pw.flush();
            pw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/
}
