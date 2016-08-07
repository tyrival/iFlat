package com.iflat.util.code;

import com.iflat.util.StringUtil;
import org.jdom.*;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * Created by tyriv on 2016/8/6.
 */
public class SpringCoding {

    public static void generate(String className, String path) throws JDOMException, IOException {

        String suffix = className.replace("com.iflat.", "");
        suffix = suffix.substring(0, suffix.indexOf("."));
        String shortClassName = className.substring(className.lastIndexOf(".") + 1, className.length());
        String actionId = suffix + "Action";
        String beanId = StringUtil.lowerCaseFirstChar(shortClassName);
        String daoId = beanId + "Dao";
        String serviceId = beanId + "Service";
        String actionClassName = className.replace(".bean.", ".action.")
                .replace(".entity.", ".action.")
                .replace(shortClassName, StringUtil.upperCaseFirstChar(suffix) + "Action");
        String daoClassName = className.replace(".bean.", ".dao.impl.")
                .replace(".entity.", ".dao.impl.")
                + "DaoImpl";
        String serviceClassName = className.replace(".bean.", ".service.impl.")
                .replace(".entity.", ".service.impl.")
                + "ServiceImpl";

        String filePath = path + "applicationContext-" + suffix + ".xml";
        File file = new File(filePath);
        /*if (!file.exists()) {
            file.createNewFile();
           // FileUtil.write(filePath, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        }*/
        //解析xml文件
        SAXBuilder builder = new SAXBuilder();
        Document parse = null;
        Element root = null;
        if (file.exists()) {
            parse = builder.build(file);
            root = parse.getRootElement();
        } else {
            parse = new Document();
        }

        Namespace ns1 = Namespace.getNamespace("http://www.springframework.org/schema/beans");
        Namespace ns2 = Namespace.getNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance");
        //Namespace ns3 = Namespace.getNamespace("xsi:schemaLocation", "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd");

        //获取xml文件跟节点
        if (root == null) {
            root = new Element("beans");
            parse.setRootElement(root);
            root.setNamespace(ns1);
            root.addNamespaceDeclaration(ns2);
            root.setAttribute(new Attribute(
                    "schemaLocation",
                    "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd",
                    ns2));
            //root.setAttribute("xmlns", "http://www.springframework.org/schema/beans");
            //root.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
            //root.setAttribute("xsi:schemaLocation", "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd");

        }
        List<Element> beanList = root.getChildren();
        Element actionBean = null;
        boolean beanExist = false;
        boolean daoExist = false;
        boolean serviceExist = false;
        for (int i = 0; i < beanList.size(); i++) {

            Element ele = beanList.get(i);
            if (actionId.equals(ele.getAttributeValue("id"))) {
                actionBean = ele;
            }

            if (daoId.equals(ele.getAttributeValue("id"))) {
                daoExist = true;
            }

            if (serviceId.equals(ele.getAttributeValue("id"))) {
                serviceExist = true;
            }

            if (beanId.equals(ele.getAttributeValue("id"))) {
                beanExist = true;
            }
        }

        // 创建ActionBean
        if (actionBean == null) {
            actionBean = new Element("bean");
            actionBean.setAttribute("id", actionId);
            actionBean.setAttribute("class", actionClassName);
            actionBean.setAttribute("scope", "prototype");
            actionBean.setNamespace(ns1);
            root.addContent(actionBean);
        }

        // 为ActionBean增加Property（Bean和Service）
        Element serviceProp = new Element("property");
        serviceProp.setAttribute("name", serviceId);
        serviceProp.setAttribute("ref", serviceId);
        serviceProp.setNamespace(ns1);
        actionBean.addContent(serviceProp);

        Element beanProp = new Element("property");
        beanProp.setAttribute("name", beanId);
        beanProp.setAttribute("ref", beanId);
        beanProp.setNamespace(ns1);
        actionBean.addContent(beanProp);

        if (!beanExist) {
            Element ele = new Element("bean");
            ele.setAttribute("id", beanId);
            ele.setAttribute("class", className);
            ele.setAttribute("scope", "prototype");
            ele.setNamespace(ns1);
            root.addContent(ele);
        }
        if (!daoExist) {
            Element ele = new Element("bean");
            ele.setAttribute("id", daoId);
            ele.setAttribute("class", daoClassName);
            ele.setNamespace(ns1);
            root.addContent(ele);
        }
        if (!serviceExist) {
            Element ele = new Element("bean");
            ele.setAttribute("id", serviceId);
            ele.setAttribute("class", serviceClassName);
            ele.setNamespace(ns1);
            root.addContent(ele);
        }

        XMLOutputter out = new XMLOutputter();
        Format fm = Format.getPrettyFormat();
        fm.setEncoding("UTF-8");
        out.setFormat(fm);
        out.output(parse, new FileOutputStream(filePath));
    }
}
