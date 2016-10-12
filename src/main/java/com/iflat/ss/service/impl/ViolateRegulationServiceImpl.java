package com.iflat.ss.service.impl;

import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.ss.bean.ViolateRegulation;
import com.iflat.util.Session;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2016/8/5.
 */
public class ViolateRegulationServiceImpl extends BaseServiceSupport {

    @Override
    public void setImportExcelReader() throws Exception {
        super.getExcelReader().setClassName("com.iflat.ss.bean.ViolateRegulation");
        super.getExcelReader().setProps(new String[]{"date", "time", "dept", "team", "groupName", "title", "personAcc", "personName", "age", "sex", "projNo", "projName", "area", "position", "riskLvl", "code", "content", "description", "measure", "feedback", "amount", "score", "busiDivision", "projMgr", "profMgr", "workMgr", "teamLeader", "posiMgr", "training", "trainingEff", "comment", "issuer"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for (int i = 0; i < list.size(); i++) {
            ViolateRegulation o = (ViolateRegulation) list.get(i);
            o.setId(UUID.randomUUID().toString());
            o.setCreatorAcc(Session.getUserInfo().getAccount());
            o.setCreatorName(Session.getUserInfo().getUserName());
            o.setCreatorDept(Session.getUserInfo().getPorgName());
            o.setCreateTime(new Date());
        }
    }
}
