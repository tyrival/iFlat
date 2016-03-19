package com.iflat.util;

import com.iflat.report.entity.Balance;
import com.iflat.report.entity.BalanceQty;
import com.iflat.report.entity.Pivot;

import java.util.*;

/**
 * Created by tyriv on 2015/12/3.
 */
public class ReportUtil {

    public static List convertPivot(List list) throws Exception {

        if(list == null) {
            throw new Exception("未查询到数据。");
        }

        List result = new ArrayList<>();
        for(int i = 0; i < list.size(); i++) {

            //建立反射对象
            Object object = list.get(i);
            ReflectUtil reflectHelper = new ReflectUtil(object);

            //获取配置文件及按序获取keylist
            PropertiesUtil prop = getPropSequence(object);

            if(prop.get("top") == null || prop.get("left") == null || prop.get("leftSub") == null || prop.get("value") == null) {
                throw new Exception("ReportHelper：配置文件错误，键值不完整。");
            }

            //获取top轴对应的属性数组，并遍历
            String[] arrTop = prop.get("top").toString().split(",");
            String[] arrValue = prop.get("value").toString().split(",");
            for(int j = 0; j < arrTop.length; j++) {

                Pivot pivot = new Pivot();
                //设定纵轴属性的值
                String left = prop.get("left").toString();
                pivot.setLeft(reflectHelper.getMethodValue(left).toString());
                String leftSub = prop.get("leftSub").toString();
                pivot.setLeftSub(reflectHelper.getMethodValue(leftSub).toString());
                //设定横轴
                String value = arrValue[j];
                pivot.setTop(value);
                //设定值
                String top = arrTop[j];
                pivot.setValue((Double) reflectHelper.getMethodValue(top));
                result.add(pivot);
            }
        }
        return result;
    }

    public static List convertBalance(List list) throws Exception {

        Map map = getObjMap(list);
        PropertiesUtil prop = getPropSequence(list.get(0));
        return putValueIntoBalance(prop, map);
    }

    public static List convertBalanceQty(List list) throws Exception {

        Map map = getObjMap(list);
        PropertiesUtil prop = getPropSequence(list.get(0));
        return putValueIntoBalanceQty(prop, map);
    }

    private static Map getObjMap(List list) throws Exception {
        if(list == null) {
            throw new Exception("未查询到数据。");
        }
        //遍历list中各个对象及其属性分别置入map，key分别为报价、目标、实际，value为fieldMap
        Map map = new HashMap<>();
        for(int i = 0; i < list.size(); i++) {
            Object object = list.get(i);
            ReflectUtil reflectHelper = new ReflectUtil(object);

            Object type = reflectHelper.getMethodValue("type");
            if(type == null || "".equals(type.toString())) {
                throw new Exception("com.iflat.util.ReportHelper.convertBalance：未找到对象的type属性");
            }
            String key = type.toString();

            map.put(key, getPropMap(reflectHelper));
        }
        return map;
    }

    private static Map getPropMap(ReflectUtil reflectHelper) throws Exception {
        //通过反射获取对象的各个属性，并放入fieldMap中
        Map fieldMap = new HashMap<>();

        Object type = reflectHelper.getMethodValue("type");
        if(type == null || "".equals(type.toString())) {
            throw new Exception("com.iflat.util.ReportHelper.convertBalance：未找到对象的type属性");
        }
        String[] props = reflectHelper.getProps();
        for(int j = 0; j < props.length; j++) {
            String k = props[j];
            Object v = reflectHelper.getMethodValue(k);
            fieldMap.put(k, v);
        }
        return fieldMap;
    }

    private static PropertiesUtil getPropSequence(Object object) throws Exception {
        //获取webroot绝对路径
        String configPath = Application.getWebRootPath() + Application.getContextParam("configRoot");
        //获取对象类对应的配置文件名
        String propFileName = object.getClass().getName();
        propFileName = propFileName.substring(propFileName.lastIndexOf(".") + 1, propFileName.length());
        String filePath = configPath + "report/" + propFileName + ".properties";

        //读取配置文件，构造器中传入绝对路径，并获取有序keyList
        PropertiesUtil prop = new PropertiesUtil(filePath);
        return prop;
    }

    private static List putValueIntoBalance(PropertiesUtil prop, Map map) throws Exception {

        List keyList = prop.getKeyList();
        //有序遍历keyList，取出各个map中的值，存入List<Balance>
        List<Balance> balanceList = new ArrayList<>();

        for(int i = 0; i < keyList.size(); i++) {

            String k = keyList.get(i).toString();
            Balance balance = new Balance();
            balance.setName(prop.get(k).toString());

            Map map1 = (Map) map.get("报价");
            Map map2 = (Map) map.get("目标");
            Map map3 = (Map) map.get("实际");

            balance.setEstimate((Double)map1.get(k));
            balance.setTarget((Double)map2.get(k));
            balance.setActual((Double)map3.get(k));
            balanceList.add(balance);
        }
        return balanceList;
    }

    private static List putValueIntoBalanceQty(PropertiesUtil prop, Map map) throws Exception {

        List keyList = prop.getKeyList();
        //有序遍历keyList，取出各个map中的值，存入List<Balance>
        List<BalanceQty> balanceList = new ArrayList<>();

        for(int i = 0; i < keyList.size(); i++) {

            String k = keyList.get(i).toString();
            BalanceQty balance = new BalanceQty();
            balance.setName(prop.get(k).toString());

            Map map1 = (Map) map.get("报价");
            if (map1 == null) {
                map1 = (Map) map.get("设计");
            }
            Map map2 = (Map) map.get("目标");
            if (map2 == null) {
                map2 = (Map) map.get("订货");
            }
            Map map3 = (Map) map.get("实际");

            balance.setEstimate((Double)map1.get(k));
            balance.setPurchase((Double)map2.get(k));
            balance.setActual((Double)map3.get(k));
            balanceList.add(balance);
        }
        return balanceList;
    }
}
