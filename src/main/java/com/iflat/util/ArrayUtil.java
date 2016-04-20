package com.iflat.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by tyriv on 2016/4/20.
 */
public class ArrayUtil {

    public static List mapToList(Map map) {

        List list = new ArrayList();
        map.values().forEach(list::add);
        return list;
    }
}
