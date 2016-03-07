package com.iflat.qm.service.impl;

import com.iflat.qm.bean.QualityFine;
import com.iflat.system.service.impl.IflatServiceSupport;
import com.iflat.util.Session;
import org.springframework.oxm.ValidationFailureException;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2016/1/7.
 */
public class QualityFineServiceImpl extends IflatServiceSupport {

    @Override
    public void beforeInsert() throws Exception {
        ((QualityFine)this.getSaveObj()).setCreator(Session.getUserInfo().getAccount());
        ((QualityFine)this.getSaveObj()).setCreateTime(new Date());
    }

    @Override
    public void setImportExcelReader() throws Exception {
        super.getExcelReader().setClassName("com.iflat.sm.bean.QualityFine");
        super.getExcelReader().setProps(new String[]{"projNo","dept","team","group","person", "date", "profession", "description", "comment", "qc"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            QualityFine o = (QualityFine)list.get(i);
            o.setId(UUID.randomUUID().toString());
            o.setCreator(Session.getUserInfo().getAccount());
            o.setCreateTime(new Date());
        }
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            QualityFine o = (QualityFine)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空");
            }
        }
    }
}
