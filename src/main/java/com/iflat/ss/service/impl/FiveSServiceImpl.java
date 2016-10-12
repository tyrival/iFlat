package com.iflat.ss.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.ss.bean.FiveS;
import com.iflat.ss.bean.SafetyFine;
import com.iflat.util.Session;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2016/8/5.
 */
public class FiveSServiceImpl extends BaseServiceSupport {

    @Override
    public void setImportExcelReader() throws Exception {
        super.getExcelReader().setClassName("com.iflat.ss.bean.FiveS");
        super.getExcelReader().setProps(new String[]{"date","time","funcDept","areaType","code","area", "otherArea", "projNo", "projName", "region", "belongDept", "regionPersonAcc", "regionPersonName", "fsType", "fsDescription", "description", "amount", "score", "dept","team","personName","personAcc","feedback","rectifyTime","comment", "issuer"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            FiveS o = (FiveS)list.get(i);
            o.setId(UUID.randomUUID().toString());
            o.setCreatorAcc(Session.getUserInfo().getAccount());
            o.setCreatorName(Session.getUserInfo().getUserName());
            o.setCreatorDept(Session.getUserInfo().getPorgName());
            o.setCreateTime(new Date());
        }
    }

}
