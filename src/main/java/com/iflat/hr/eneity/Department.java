package com.iflat.hr.eneity;

import com.iflat.util.StringUtil;
import org.apache.commons.lang3.ArrayUtils;

/**
 * Created by tyriv on 2016/6/2.
 */
public class Department {

    private final static String[] ARRAY = new String[]{"扬州分公司搭载部","扬州分公司涂装部","扬州分公司制造部","扬州分公司总装部","扬州分公司综合管理部","扬州分公司人力资源部","扬州分公司财务部","扬州分公司生产运行部","扬州分公司技术质量部","扬州分公司生产保障部","扬州分公司安保部","扬州分公司物资部"};

    public static boolean isDepartment(String deptName) {
        if (StringUtil.isBlank(deptName)) {
            return false;
        }
        if (!ArrayUtils.contains(ARRAY, deptName)) {
            return false;
        }
        return true;
    }

    public static String getString() {
        String res = "";
        for (String s : ARRAY) {
            res += s + ", ";
        }
        res.substring(0, res.length() - 1);
        return res;
    }
}
