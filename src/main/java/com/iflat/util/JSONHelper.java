package com.iflat.util;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import java.util.*;

/**
 * Created by tyriv on 2015/10/10.
 */
public class JSONHelper {

    public static List<?> jsonToList(String jsonString, String className) throws Exception {

        List<Object> list = new ArrayList<Object>();
        try {
            JSONArray jsonArray = JSONArray.fromObject(jsonString);
            for(int i = 0; i < jsonArray.size(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                Object object = JSONObject.toBean(jsonObject, Class.forName(className));
                list.add(object);
            }
        } catch (JSONException e) {
            JSONObject jsonObject = JSONObject.fromObject(jsonString);
            Object object = JSONObject.toBean(jsonObject, Class.forName(className));
            list.add(object);
        }
        return list;
    }
}
