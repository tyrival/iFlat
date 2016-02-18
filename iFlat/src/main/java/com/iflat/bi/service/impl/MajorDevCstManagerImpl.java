package com.iflat.bi.service.impl;

import com.iflat.bi.bean.MajorDevCst;
import com.iflat.bi.entity.ProjectInfo;
import com.iflat.system.service.IflatManager;
import com.iflat.system.service.impl.IflatManagerSupport;
import org.springframework.oxm.ValidationFailureException;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/29.
 */
public class MajorDevCstManagerImpl extends IflatManagerSupport {

    private IflatManager iflatManager;

    @Override
    public Object generate(Object o) throws Exception {

        MajorDevCst majorDevCst = (MajorDevCst) o;

        ProjectInfo projectInfo = new ProjectInfo();
        projectInfo.setAnalyseDate(majorDevCst.getMonth());
        List<ProjectInfo> list = this.iflatManager.list(projectInfo);

        if (list != null) {

            for (int i = 0; i < list.size(); i++) {
                ProjectInfo info = list.get(i);

                MajorDevCst cost = new MajorDevCst();
                cost.setProjNo(info.getProjNo());
                cost.setMonth(majorDevCst.getMonth());

                this.executeMethod(cost, "generate");
            }
        }
        return o;
    }
    @Override
    public void setImportExcelReader() throws Exception {
        super.getExcelReader().setClassName("com.iflat.bi.bean.MajorDevCst");
        super.getExcelReader().setProps(new String[]{"projNo","type","mainEngine","genset","steeringGear","ballastWaterTrtmt","hatchCoverSys","distributionSys","navigationSys","boiler","windlass","crane"});
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            MajorDevCst o = (MajorDevCst)list.get(i);
            o.setId(UUID.randomUUID().toString());
            o.setMonth(new Date());
            o.setVersion(1);
        }
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            MajorDevCst o = (MajorDevCst)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空");
            }
        }
    }

    public IflatManager getIflatManager() {
        return iflatManager;
    }

    public void setIflatManager(IflatManager iflatManager) {
        this.iflatManager = iflatManager;
    }
}
