package com.iflat.util;

/**
 * Created by tyriv on 2016/3/12.
 */
public class StringHelper {

    public static String UpperCaseFirstChar(String str) {

        char[] cs = str.toCharArray();
        if (!Character.isUpperCase(str.charAt(0))) {
            cs[0] -= 32;
        }
        return String.valueOf(cs);
    }
}
