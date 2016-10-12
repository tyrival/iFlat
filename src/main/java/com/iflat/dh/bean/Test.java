package com.iflat.dh.bean;

import com.iflat.util.code.CodeUtil;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/6.
 */
public class Test {
    public static void main(String[] args) {
        CodeUtil.generate("com.iflat.dh.bean.Test", "struts");
    }
    private String a;
    private int b;
    private double c;
    private boolean d;
    private Date e;
}
