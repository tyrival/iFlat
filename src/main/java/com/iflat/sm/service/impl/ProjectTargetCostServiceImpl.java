package com.iflat.sm.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.ProjectTargetCost;
import com.iflat.sm.bean.TargetCost;
import com.iflat.sm.entity.ProjectTargetCostVo;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import org.springframework.oxm.ValidationFailureException;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2016/5/25.
 */
public class ProjectTargetCostServiceImpl extends BaseServiceSupport {


    @Override
    protected void beforeUpdate() throws Exception {
        // 查询此分解项对应的目标成本的余额
        ProjectTargetCost projectTargetCost = (ProjectTargetCost) this.saveObj;

        // 对调整金额进行校验
        validateAdjustmentWithApplied(projectTargetCost);
    }

    /**
     * 根据已申请的金额校验调整金额，是否可以进行调整
     */
    private void validateAdjustmentWithApplied(ProjectTargetCost projectTargetCost) throws Exception {

        ProjectTargetCost orig = (ProjectTargetCost) this.list(projectTargetCost).get(0);
        Double adjust = orig.getAmount() - projectTargetCost.getAmount();
        ProjectTargetCostVo vo = getVo(projectTargetCost);
        Double remain = vo.getAmount() - vo.getDistribution();
        if (adjust < 0 && Math.abs(adjust) > remain) {
            throw new Exception("调整失败。目标成本减少" + Math.abs(adjust) + "后， 小于该目标成本分解后的总额" + remain);
        }
    }

    /**
     * 获取已申请的金额
     */
    private ProjectTargetCostVo getVo(ProjectTargetCost projectTargetCost) throws Exception {

        ProjectTargetCostVo projectTargetCostVo = new ProjectTargetCostVo();
        projectTargetCostVo.setProjNo(projectTargetCost.getProjNo());
        projectTargetCostVo = (ProjectTargetCostVo) this.list(projectTargetCostVo).get(0);
        return projectTargetCostVo;
    }

    @Override
    protected void beforeDelete() throws Exception {
        ProjectTargetCost projectTargetCost = (ProjectTargetCost) this.deleteObj;

        ProjectTargetCostVo vo = getVo(projectTargetCost);
        Double remain = vo.getAmount() - vo.getDistribution();
        if (remain < projectTargetCost.getAmount()) {
            throw new Exception("此目标成本已被分解，无法删除。");
        }
    }

    @Override
    public void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.sm.bean.ProjectTargetCost");
        String[] props = new String[]{"projNo", "projName", "amount", "comment"};;
        super.getExcelReader().setProps(props);
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            ProjectTargetCost o = (ProjectTargetCost)list.get(i);
            o.setId(UUID.randomUUID().toString());
            UserInfoVo userInfoVo = Session.getUserInfo();
            o.setCreatorAcc(userInfoVo.getAccount());
            o.setCreatorName(userInfoVo.getUserName());
            o.setCreateTime(new Date());
        }
    }

    @Override
    public void importValidate() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            ProjectTargetCost o = (ProjectTargetCost)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空");
            }
        }
    }

}