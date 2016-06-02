package com.iflat.sm.entity;

import com.iflat.util.StringUtil;
import org.apache.commons.lang3.ArrayUtils;

/**
 * Created by tyriv on 2016/6/2.
 */
public class Workshop {

    private final static String[] ARRAY = new String[]{"造船事业部", "造船加工车间", "造船船体车间", "造船安装车间", "修船事业部", "修船坞修车间", "修船冷作车间", "修船舾装车间", "修船机电修理车间", "钢结构事业部"};

    public static boolean isWorkshop(String deptName) {
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
