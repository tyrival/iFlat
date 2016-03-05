package com.iflat.util;

import com.iflat.system.entity.ExcelReader;
import com.iflat.system.entity.ExcelTemplate;
import com.iflat.system.entity.ExcelWriter;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.reflection.ReflectionException;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.struts2.ServletActionContext;
import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.zip.DataFormatException;

/**
 * Created by tyriv on 2015/11/18.
 */
public class ExcelHelper {

    private final static String DEFAULT_DOCUMENT = "temp";
    private final static String DEFAULT_OUTPUT_PATH = "template/excel/";

    public static String write(ExcelWriter excelWriter) throws Exception {
        //创建工作簿
        HSSFWorkbook workbook = new HSSFWorkbook();
        //创建工作表sheet
        HSSFSheet sheet = workbook.createSheet(excelWriter.getSheetName());
        int rownum = 0;
        boolean withSerial = excelWriter.getWithSerial();
        int startColumn = withSerial ? 1 : 0;
        //创建第一行
        HSSFRow row = sheet.createRow(rownum);
        //创建标题
        HSSFCell cell = row.createCell(0);
        String title = excelWriter.getTitle();
        cell.setCellValue(title);
        String[] thead = null;
        List dataSource = excelWriter.getDataSource();
        if(dataSource != null) {
            GSReflectHelper gsReflectHelper = new GSReflectHelper(dataSource.get(0));
            thead = gsReflectHelper.getProps();
        }
        sheet.addMergedRegion(new CellRangeAddress(rownum, rownum, 0, thead.length + startColumn - 1));
        //设置字体
        HSSFCellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFFont font = workbook.createFont();
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        font.setFontHeightInPoints((short)12);
        cellStyle.setFont(font);
        cell.setCellStyle(cellStyle);
        rownum++;

        //插入表头
        HSSFRow theadRow = sheet.createRow(rownum);

        if(withSerial) {
            HSSFCell theadSerialCell = theadRow.createCell(0);
            theadSerialCell.setCellValue("序号");
        }
        for(int i = 0; i < thead.length; i++) {
            HSSFCell theadRowCell = theadRow.createCell(i + startColumn);
            theadRowCell.setCellValue(thead[i]);
        }
        rownum++;

        if(dataSource != null) {
            //追加数据
            for(int i = 0; i < dataSource.size(); i++) {
                GSReflectHelper gsReflectHelper = new GSReflectHelper(dataSource.get(i));
                HSSFRow tbodyRow = sheet.createRow(rownum);
                //序号
                if(withSerial) {
                    HSSFCell serialCell = tbodyRow.createCell(0);
                    serialCell.setCellValue(i + 1);
                }
                for(int j = 0; j < thead.length; j++) {
                    Object value = null;
                    HSSFCell tbodyRowCell = tbodyRow.createCell(j + startColumn);
                    try {
                        value = gsReflectHelper.getMethodValue(thead[j].toString());
                        if(value instanceof Date) {
                            tbodyRowCell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
                            HSSFCellStyle tbodyCellStyle = workbook.createCellStyle();
                            HSSFDataFormat format = workbook.createDataFormat();
                            tbodyCellStyle.setDataFormat(format.getFormat("yyyy-mm-dd hh:MM:ss"));
                            tbodyRowCell.setCellStyle(tbodyCellStyle);
                            tbodyRowCell.setCellValue((Date)value);
                        } else if(value instanceof Boolean) {
                            tbodyRowCell.setCellValue((Boolean)value ? "是" : "否");
                        } else {
                            tbodyRowCell.setCellValue(value.toString());
                        }
                    } catch (Exception e) {
                        //截获getMethodValue()抛出异常，不向外抛出，而是将错误信息输出到Excel，保持文件能正确输出
                        tbodyRowCell.setCellValue("输出此列出错，错误信息：" + e.getMessage());
                    }
                }
                rownum++;
            }
        }

        //创建文件
        String root = ServletActionContext.getServletContext().getRealPath("/");
        String path = excelWriter.getDocument();
        path = path == null || "".equals(path) ? DEFAULT_DOCUMENT : path;
        path = root + "/upfiles/" + path;
        File filePath = new File(path);
        if(!filePath.exists()) {
            filePath.mkdirs();
        }
        String fileName = UUID.randomUUID().toString() + ".xls";
        try {
            File file = new File(path, fileName);
            file.createNewFile();
            //将Excel内容储存
            FileOutputStream stream = FileUtils.openOutputStream(file);
            workbook.write(stream);
            stream.close();

        } catch (IOException e) {
            throw new IOException("保存Excel文件时错误。");
        }
        return filePath + "/" + fileName;
    }

    public static List read(ExcelReader excelReader) throws Exception {

        List result = new ArrayList<>();
        Class cls = Class.forName(excelReader.getClassName());

        File file = new File(ServletActionContext.getServletContext().getRealPath("/") + excelReader.getFilePath());

        //创建Excel，读取文件内容
        HSSFWorkbook workbook = new HSSFWorkbook(FileUtils.openInputStream(file));

        //获取工作表
        HSSFSheet sheet = workbook.getSheet(excelReader.getSheetName());
        if(sheet == null) {
            sheet = workbook.getSheetAt(0);
        }
        //获取起始行号和列号
        int startCol = excelReader.getStartColumn();
        int rowIndicate = excelReader.getStartRow();
        String[] props = excelReader.getProps();

        //如果没有传入属性数组，则通过读取excel第0行来获取属性数组
        if(props == null) {
            HSSFRow rowHead = sheet.getRow(rowIndicate);
            int col = rowHead.getLastCellNum();
            props = new String[col];
            for(int i = startCol; i < col; i++) {
                HSSFCell cell = rowHead.getCell(i);
                props[i] = cell.getStringCellValue();
            }
        }
        rowIndicate++;

        //获取最后一行行号
        int lastRowNum = sheet.getLastRowNum();
        for(int i = rowIndicate; i <= lastRowNum; i++) {
            HSSFRow row = sheet.getRow(i);

            //建立GSReflectHelper对象，通过传入属性名，执行其对应的setter方法
            Object obj = cls.newInstance();
            GSReflectHelper gsReflectHelper = new GSReflectHelper(obj);

            //获取最后一列列号
            int lastCellNum = row.getLastCellNum();
            for(int j = startCol; j < lastCellNum; j++) {
                HSSFCell cell = row.getCell(j);

                //cell为空则抛出异常
                if(cell == null) {
                    throw new DataFormatException("ExcelHelper错误：第" + (i + 1) + "行第" + (j + 1) + "列不可为空");
                }

                String propType = cls.getDeclaredField(props[j]).getType().toString();
                Object value = null;
                try {
                    switch(propType) {
                        case "class java.util.Date" :
                            value = cell.getDateCellValue();
                            break;
                        case "class java.lang.String":
                            value = cell.getStringCellValue();
                            break;
                        case "string":
                            value = cell.getStringCellValue();
                            break;
                        case "boolean":
                            value = cell.getBooleanCellValue();
                            break;
                        case "class java.lang.Double":
                            value = cell.getNumericCellValue();
                            break;
                        case "double":
                            value = cell.getNumericCellValue();
                            break;
                        case "class java.lang.Float":
                            value = cell.getNumericCellValue();
                            break;
                        case "float":
                            value = cell.getNumericCellValue();
                            break;
                        case "class java.lang.Integer":
                            value = cell.getNumericCellValue();
                            break;
                        case "int":
                            value = cell.getNumericCellValue();
                            break;
                        case "class java.lang.Byte":
                            value = cell.getErrorCellValue();
                            break;
                    }
                } catch (Exception e) {
                    throw new ReflectionException("第" + (i + 1) + "行第" + (j + 1) + "列数据类型错误");
                }
                gsReflectHelper.setMethodValue(props[j], value);
            }
            result.add(obj);
        }
        return result;
    }


    public static ExcelTemplate template(ExcelTemplate excelTemplate) throws Exception {
        //获取真实路径
        String rootPath = formatPath(ServletActionContext.getServletContext().getRealPath("/"));
        //获取自定义的相对路径
        String categoryPath = formatPath(excelTemplate.getPath());
        //获取文件名，如果不包含扩展名，则增加扩展名
        String fileName = excelTemplate.getName();
        fileName = fileName.endsWith(".xml") ? fileName : fileName + ".xml";
        //获取完整的相对路径
        String relativePath = Application.getContextParam("configRoot") + DEFAULT_OUTPUT_PATH + categoryPath + fileName;
        //获取完整绝对路径
        String path = rootPath + relativePath;

        //获取解析xml文件路径
        File file = new File(path);
        SAXBuilder builder = new SAXBuilder();
        //解析xml文件
        Document parse = builder.build(file);
        //创建Excel
        HSSFWorkbook wb = new HSSFWorkbook();
        //创建sheet
        HSSFSheet sheet = wb.createSheet("Sheet0");

        //获取xml文件跟节点
        Element root = parse.getRootElement();
        //获取模板名称
        String templateName = root.getAttribute("name").getValue();

        int rownum = 0;
        int column = 0;
        //设置列宽
        Element colgroup = root.getChild("colgroup");
        setColumnWidth(sheet,colgroup);

        //设置标题
        Element title = root.getChild("title");
        List<Element> trs = title.getChildren("tr");
        for (int i = 0; i < trs.size(); i++) {
            Element tr = trs.get(i);
            List<Element> tds = tr.getChildren("td");
            HSSFRow row = sheet.createRow(rownum);
            HSSFCellStyle cellStyle = wb.createCellStyle();
            cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            for(column = 0;column <tds.size();column ++){
                Element td = tds.get(column);
                HSSFCell cell = row.createCell(column);
                Attribute rowSpan = td.getAttribute("rowspan");
                Attribute colSpan = td.getAttribute("colspan");
                Attribute value = td.getAttribute("value");
                if(value !=null){
                    String val = value.getValue();
                    cell.setCellValue(val);
                    int rspan = rowSpan.getIntValue() - 1;
                    int cspan = colSpan.getIntValue() -1;

                    //设置字体
                    HSSFFont font = wb.createFont();
                    font.setFontName("仿宋_GB2312");
                    font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//字体加粗
                    //font.setFontHeight((short)12);
                    font.setFontHeightInPoints((short)12);
                    cellStyle.setFont(font);
                    cell.setCellStyle(cellStyle);
                    //合并单元格居中
                    sheet.addMergedRegion(new CellRangeAddress(rspan, rspan, 0, cspan));
                }
            }
            rownum ++;
        }
        //设置表头
        Element thead = root.getChild("thead");
        trs = thead.getChildren("tr");
        for (int i = 0; i < trs.size(); i++) {
            Element tr = trs.get(i);
            HSSFRow row = sheet.createRow(rownum);
            List<Element> ths = tr.getChildren("th");
            for(column = 0;column < ths.size();column++){
                Element th = ths.get(column);
                Attribute valueAttr = th.getAttribute("value");
                HSSFCell cell = row.createCell(column);
                if(valueAttr != null){
                    String value =valueAttr.getValue();
                    cell.setCellValue(value);
                }
            }
            rownum++;
        }

        //设置数据区域样式
        Element tbody = root.getChild("tbody");
        Element tr = tbody.getChild("tr");
        int repeat = tr.getAttribute("repeat").getIntValue();

        List<Element> tds = tr.getChildren("td");
        for (int i = 0; i < repeat; i++) {
            HSSFRow row = sheet.createRow(rownum);
            for(column =0 ;column < tds.size();column++){
                Element td = tds.get(column);
                HSSFCell cell = row.createCell(column);
                setType(wb,cell,td);
            }
            rownum++;
        }

        //生成Excel导入模板
        String outputFileName = templateName + ".xls";//fileName.replace(".xml", ".xls");
        File filePath = new File(rootPath + DEFAULT_OUTPUT_PATH + categoryPath);
        if(!filePath.exists()) {
            filePath.mkdirs();
        }
        String outputPath = rootPath + DEFAULT_OUTPUT_PATH + categoryPath + outputFileName;
        File tempFile = new File(outputPath);
        if(tempFile.exists()) {
            tempFile.delete();
        }
        tempFile.createNewFile();
        FileOutputStream stream = FileUtils.openOutputStream(tempFile);
        wb.write(stream);
        stream.close();
        excelTemplate.setSavePath("/" + DEFAULT_OUTPUT_PATH + categoryPath + outputFileName);
        excelTemplate.setFile(tempFile);
        return excelTemplate;
    }

    /**
     * 设置单元格样式
     * @param wb
     * @param cell
     * @param td
     */
    private static void setType(HSSFWorkbook wb, HSSFCell cell, Element td) {

        Attribute typeAttr = td.getAttribute("type");
        String type = typeAttr.getValue();
        HSSFDataFormat format = wb.createDataFormat();
        HSSFCellStyle cellStyle = wb.createCellStyle();

        if("NUMERIC".equalsIgnoreCase(type)){
            cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
            Attribute formatAttr = td.getAttribute("format");
            String formatValue = formatAttr.getValue();
            formatValue = StringUtils.isNotBlank(formatValue)? formatValue : "#,##0.00";
            cellStyle.setDataFormat(format.getFormat(formatValue));

        }else if("STRING".equalsIgnoreCase(type)){
            cell.setCellValue("");
            cell.setCellType(HSSFCell.CELL_TYPE_STRING);
            cellStyle.setDataFormat(format.getFormat("@"));

        }else if("DATE".equalsIgnoreCase(type)){
            cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
            cellStyle.setDataFormat(format.getFormat("yyyy-m-d"));

        }else if("ENUM".equalsIgnoreCase(type)){
            CellRangeAddressList regions =
                    new CellRangeAddressList(cell.getRowIndex(), cell.getRowIndex(),
                            cell.getColumnIndex(), cell.getColumnIndex());

            Attribute enumAttr = td.getAttribute("format");
            String enumValue = enumAttr.getValue();
            //加载下拉列表内容
            DVConstraint constraint =
                    DVConstraint.createExplicitListConstraint(enumValue.split(","));

            //数据有效性对象
            HSSFDataValidation dataValidation = new HSSFDataValidation(regions, constraint);
            wb.getSheetAt(0).addValidationData(dataValidation);
        }
        cell.setCellStyle(cellStyle);
    }

    /**
     * 设置列宽
     * @param sheet
     * @param colgroup
     */
    private static void setColumnWidth(HSSFSheet sheet, Element colgroup) {

        List<Element> cols = colgroup.getChildren("col");
        for (int i = 0; i < cols.size(); i++) {

            Element col = cols.get(i);
            Attribute width = col.getAttribute("width");
            String unit = width.getValue().replaceAll("[0-9,\\.]", "");
            String value = width.getValue().replaceAll(unit, "");

            int v=0;
            if(StringUtils.isBlank(unit) || "px".endsWith(unit)){
                v = Math.round(Float.parseFloat(value) * 37F);

            }else if ("em".endsWith(unit)){
                v = Math.round(Float.parseFloat(value) * 267.5F);
            }
            sheet.setColumnWidth(i, v);
        }
    }

    private static String formatPath(String path) {
        path = path.startsWith("/") ? path.substring(1, path.length()) : path;
        path = path.endsWith("/") ? path : path + "/";
        return path;
    }
}
