package com.iflat.ss.entity;

import com.iflat.util.code.Main;

/**
 * Created by tyriv on 2016/8/9.
 */
public class VrCodeRiskLvl {

    public static void main(String[] args) {
        Main.generate("com.iflat.ss.entity.VrCodeRiskLvl");
    }
    private String riskLvl;

    public String getRiskLvl() {
        return riskLvl;
    }

    public void setRiskLvl(String riskLvl) {
        this.riskLvl = riskLvl;
    }
}
