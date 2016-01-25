package com.iflat.bi.service.impl;

import com.iflat.bi.bean.ProjectCost;
import com.iflat.system.service.impl.IflatManagerSupport;
import org.springframework.oxm.ValidationFailureException;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/27.
 */
public class ProjectCostManagerImpl extends IflatManagerSupport {

    @Override
    public void setImportExcelReader() throws Exception {
        super.getExcelReader().setClassName("com.iflat.bi.bean.ProjectCost");
        super.getExcelReader().setProps(new String[]{"projNo","type","salesRevenue","raw", "device","foundry", "matCstAdj", "casualLabor", "salary", "maintenance", "power", "outSourcing", "manuCstAdj", "design", "survey", "salesFee", "purchaseAssCharge", "salesAssCharge", "colabouration", "craftEquipment", "seaTrial", "other", "warranty", "auxCstAdj", "reserve"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            ProjectCost o = (ProjectCost)list.get(i);
            o.setId(UUID.randomUUID().toString());
            o.setMonth(new Date());
            o.setVersion(1);
        }
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            ProjectCost o = (ProjectCost)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空");
            }
        }
    }
}