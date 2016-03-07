package com.iflat.bi.service.impl;

import com.iflat.bi.bean.ProjectInProcess;
import com.iflat.system.service.impl.IflatServiceSupport;
import org.springframework.oxm.ValidationFailureException;

import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/29.
 */
public class ProjectInProcessServiceImpl extends IflatServiceSupport {

    @Override
    public void setImportExcelReader() throws Exception {
        super.getExcelReader().setClassName("com.iflat.bi.bean.ProjectInProcess");
        super.getExcelReader().setProps(new String[]{"projNo","month","type","target","actual"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            ProjectInProcess o = (ProjectInProcess)list.get(i);
            o.setId(UUID.randomUUID().toString());
            o.setVersion(1);
        }
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            ProjectInProcess o = (ProjectInProcess)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空");
            }
        }
    }
}
