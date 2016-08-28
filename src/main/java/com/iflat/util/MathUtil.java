package com.iflat.util;

import java.text.DecimalFormat;

/**
 * Created by tyriv on 2016/8/26.
 */
public class MathUtil {

    public static double round(double num, int deci) {
        String f = "#.";
        for (int i = 0; i < deci; i++) {
            f += "#";
        }
        DecimalFormat df = new DecimalFormat(f);
        return Double.parseDouble(df.format(num));

    }
}
