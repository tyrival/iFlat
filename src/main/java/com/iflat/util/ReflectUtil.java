package com.iflat.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Hashtable;
import java.util.regex.Pattern;

/**
 * Created by tyriv on 2015/11/18.
 */
public class ReflectUtil {
    private Class cls;
    /**
     * 传过来的对象
     */
    private Object obj;

    private String[] props;

    public String[] getProps() {
        return props;
    }

    /**
     * 存放get方法
     */
    private Hashtable<String, Method> getMethods = null;
    /**
     * 存放set方法
     */
    private Hashtable<String, Method> setMethods = null;

    /**
     * 定义构造方法 -- 一般来说是个pojo
     *
     * @param o 目标对象
     */
    public ReflectUtil(Object o) {
        obj = o;
        initMethods();
    }

    /**
     *
     * @desc 初始化
     */
    public void initMethods() {
        getMethods = new Hashtable<String, Method>();
        setMethods = new Hashtable<String, Method>();
        cls = obj.getClass();
        Field[] fields = cls.getDeclaredFields();
        props = new String[fields.length];
        for(int i = 0; i < fields.length; i++) {
            props[i] = fields[i].getName();
        }
        Method[] methods = cls.getMethods();
        // 定义正则表达式，从方法中过滤出getter / setter 函数.
        String gs = "get(\\w+)";
        Pattern getM = Pattern.compile(gs);
        String ss = "set(\\w+)";
        Pattern setM = Pattern.compile(ss);
        // 把方法中的"set" 或者 "get" 去掉
        String rapl = "$1";
        String param;
        for (int i = 0; i < methods.length; ++i) {
            Method m = methods[i];
            String methodName = m.getName();
            if (Pattern.matches(gs, methodName)) {
                param = getM.matcher(methodName).replaceAll(rapl).toLowerCase();
                getMethods.put(param, m);
            } else if (Pattern.matches(ss, methodName)) {
                param = setM.matcher(methodName).replaceAll(rapl).toLowerCase();
                setMethods.put(param, m);
            } else {
                // System.out.println(methodName + " 不是getter,setter方法！");
            }
        }
    }

    /**
     * 调用set方法
     */
    public boolean setMethodValue(String property, Object value) throws Exception {
        Method m = setMethods.get(property.toLowerCase());
        if (m != null) {
            try {
                // 调用目标类的setter函数
                m.invoke(obj, value);
                return true;
            } catch (Exception ex) {
                throw new Exception("对象的[" + property + "]属性的setter方法执行时报错。");
            }
        }
        throw new Exception("未查询到对象的[" + property + "]属性的setter方法。");
    }

    /**
     * 调用get方法
     */
    public Object getMethodValue(String property) throws Exception {
        Method m = getMethods.get(property.toLowerCase());
        if (m != null) {
            try {
                // 调用目标类的getter函数
                Object o = m.invoke(obj);
                return o;
            } catch (Exception ex) {
                throw new Exception("对象的[" + property + "]属性的getter方法执行时报错。");
            }
        }
        throw new Exception("未查询到对象的[" + property + "]属性的getter方法。");
    }
}
