package com.iflat.util;

import org.springframework.util.DigestUtils;

/**
 * Created by tyriv on 2016/9/12.
 */
public class MD5 {

    private static final String slate = "T^&HB^D*(JN QJKYD*(U89h34tro23h78asbg o3gm304";

    public static String generate(String str) {
        return DigestUtils.md5DigestAsHex(str.getBytes());
    }

    public static String generateWithSlate(String str) {
        str += slate;
        return DigestUtils.md5DigestAsHex(str.getBytes());
    }
}
