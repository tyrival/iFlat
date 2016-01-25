package com.iflat.bi.service.impl;

import com.iflat.bi.bean.MajorMatCst;
import com.iflat.system.service.impl.IflatManagerSupport;
import org.springframework.oxm.ValidationFailureException;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/29.
 */
public class MajorMatCstManagerImpl extends IflatManagerSupport {

    @Override
    public void setImportExcelReader() throws Exception {
        super.getExcelReader().setClassName("com.iflat.bi.bean.MajorMatCst");
        super.getExcelReader().setProps(new String[]{"projNo","type","steel","pipes","weldingMat","paint","cable","oil"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            MajorMatCst o = (MajorMatCst)list.get(i);
            o.setId(UUID.randomUUID().toString());
            o.setMonth(new Date());
            o.setVersion(1);
        }
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            MajorMatCst o = (MajorMatCst)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空");
            }
        }
    }
}
