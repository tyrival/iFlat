package com.iflat.hr.eneity;

import com.iflat.util.StringUtil;
import org.apache.commons.lang3.ArrayUtils;

/**
 * Created by tyriv on 2016/6/2.
 */
public class CreditType {

    private final static String[] ARRAY = new String[]{"成本","安全","质量","工艺","精度","纪律","设备能源","后勤管理","培训出勤","其他"};

    public static boolean isCreditType(String type) {
        if (StringUtil.isBlank(type)) {
            return false;
        }
        if (!ArrayUtils.contains(ARRAY, type)) {
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
