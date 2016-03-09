package com.iflat.bi.service.impl;

import com.iflat.bi.bean.ProjectCstCtrl;
import com.iflat.base.service.impl.BaseServiceSupport;
import org.springframework.oxm.ValidationFailureException;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/29.
 */
public class ProjectCstCtrlServiceImpl extends BaseServiceSupport {

    @Override
    public void setImportExcelReader() throws Exception {
        super.getExcelReader().setClassName("com.iflat.bi.bean.ProjectCstCtrl");
        super.getExcelReader().setProps(new String[]{"projNo","dept","type","target","actual", "comment"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            ProjectCstCtrl o = (ProjectCstCtrl)list.get(i);
            o.setId(UUID.randomUUID().toString());
            o.setMonth(new Date());
            o.setVersion(1);
        }
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            ProjectCstCtrl o = (ProjectCstCtrl)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空");
            }
        }
    }
}