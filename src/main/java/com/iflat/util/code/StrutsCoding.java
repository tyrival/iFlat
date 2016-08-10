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
public class StrutsCoding {

    public static void generate(String className, String path) throws JDOMException, IOException {

        String suffix = className.replace("com.iflat.", "");
        suffix = suffix.substring(0, suffix.indexOf("."));
        String shortClassName = className.substring(className.lastIndexOf(".") + 1, className.length());
        String actionClassName = className.replace(".bean.", ".action.")
                .replace(".entity.", ".action.")
                .replace(shortClassName, StringUtil.upperCaseFirstChar(suffix) + "Action");

        String filePath = path + "struts.xml";
        File file = new File(filePath);

        //解析xml文件
        SAXBuilder builder = new SAXBuilder();
        Document parse = builder.build(file);
        Element root = parse.getRootElement();
        List<Element> list = root.getChildren("package");
        Element pack = list.get(1);

        List<Element> actionList = pack.getChildren("action");
        boolean exist = false;
        for (int i = 0; i < actionList.size(); i++) {
            Element o = actionList.get(i);
            String name = o.getAttribute("name").toString();
            if (name.equals(suffix + "_*")) {
                exist = true;
            }
        }

        if (!exist) {
            Element action = new Element("action");
            action.setAttribute("name", suffix + "_*");
            action.setAttribute("class", actionClassName);
            action.setAttribute("method", "{1}");
            pack.addContent(action);

            Element result = new Element("result");
            result.setAttribute("type", "json");
            result.setAttribute("name", "success");
            action.addContent(result);

            Element param1 = new Element("param");
            param1.setAttribute("name", "root");
            param1.setText("result");
            result.addContent(param1);

            Element param2 = new Element("param");
            param2.setAttribute("name", "excludeNullProperties");
            param2.setText("true");
            result.addContent(param2);

            XMLOutputter out = new XMLOutputter();
            Format fm = Format.getPrettyFormat();
            fm.setEncoding("UTF-8");
            out.setFormat(fm);
            out.output(parse, new FileOutputStream(filePath));
        }

    }
}
