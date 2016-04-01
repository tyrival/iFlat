package com.iflat.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by tyriv on 2016/3/12.
 */
public class StringUtil {

    public static String removeBlank(String str) {
        String dest = "";
        if (str!=null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }
        return dest;
    }
    public static String upperCaseFirstChar(String str) {

        char[] cs = str.toCharArray();
        if (!Character.isUpperCase(str.charAt(0))) {
            cs[0] -= 32;
        }
        return String.valueOf(cs);
    }

    public static String lowerCaseFirstChar(String str) {

        char[] cs = str.toCharArray();
        if (!Character.isLowerCase(str.charAt(0))) {
            cs[0] += 32;
        }
        return String.valueOf(cs);
    }

    public static boolean isBlank(String string) {
        return string == null || "".equals(string);
    }
}
