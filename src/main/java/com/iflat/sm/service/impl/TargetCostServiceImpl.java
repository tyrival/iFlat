package com.iflat.sm.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.entity.ProjectTargetCostVo;
import com.iflat.sm.bean.TargetCost;
import com.iflat.sm.entity.SbSettlementVo;
import com.iflat.sm.entity.ScSettlementVo;
import com.iflat.sm.service.BaseSettlementService;
import com.iflat.sm.service.SbSettlementVoService;
import com.iflat.sm.service.ScSettlementVoService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.ReflectUtil;
import com.iflat.util.Session;
import org.springframework.oxm.ValidationFailureException;

import java.util.*;

/**
 * Created by tyriv on 2016/3/23.
 */
public class TargetCostServiceImpl extends BaseServiceSupport {

    private BaseService projectTargetCostVoService;
    private SbSettlementVoService sbSettlementVoService;
    private ScSettlementVoService scSettlementVoService;

    @Override
    protected void beforeInsert() throws Exception {
        // 查询此分解项对应的目标成本的余额
        TargetCost targetCost = (TargetCost) this.saveObj;

        Double add = targetCost.getAmount();
        Double remain = getRemainAmount(targetCost);
        // 余额与当前新增项目的比较
        if (add > remain) {
            throw new Exception("新增失败。新增项目的金额为"+ add +"，超过该工程目标成本余额" + remain);
        }
    }

    @Override
    protected void beforeUpdate() throws Exception {
        // 查询此分解项对应的目标成本的余额
        TargetCost targetCost = (TargetCost) this.saveObj;

        Double adjust = getAdjustAmount(targetCost);
        ProjectTargetCostVo projectTargetCostVo = getProjectTargetCostVo(targetCost);
        Double remain = projectTargetCostVo.getAmount() - projectTargetCostVo.getDistribution();
        // 余额与当前新增项目的比较
        if (adjust > remain) {
            throw new Exception("调整失败。目标成本调整额度为" + adjust + "， 超过了该工程目标成本的余额"  + remain +"，请重新调整。");
        }

        // 对调整金额进行校验
        validateAdjustmentWithApplied(projectTargetCostVo.getType(), targetCost, adjust);
    }

    /**
     * 根据已申请的金额校验调整金额，是否可以进行调整
     * @param type 目标成本类型，造船/钢结构
     * @param targetCost 目标成本分解项目
     * @param adjust 调整额度
     * @throws Exception
     */
    private void validateAdjustmentWithApplied(String type, TargetCost targetCost, Double adjust) throws Exception {

        // 当调整为减金额时，判断此科目已经提交过的申请总额是否仍然小于修改后的金额，小于的话才可以修改科目余额
        Double apply = getAppliedAmount(type, targetCost);
        if (adjust < 0 && targetCost.getAmount() < apply) {
            throw new Exception("调整失败。目标成本调整为" + targetCost.getAmount() + "， 小于该科目已有的结算申请的总额" + apply);
        }
    }

    /**
     * 获取已申请的金额
     * @param type
     * @param targetCost
     * @return
     * @throws Exception
     */
    private Double getAppliedAmount(String type, TargetCost targetCost) throws Exception {

        BaseSettlementService baseSettlementService = null;
        Object param = null;

        switch (type) {
            case "造船":
                baseSettlementService = sbSettlementVoService;
                param = new SbSettlementVo();
                break;
            case "钢结构":
                baseSettlementService = scSettlementVoService;
                param = new ScSettlementVo();
                break;
        }

        ReflectUtil reflectUtil = new ReflectUtil(param);
        reflectUtil.setMethodValue("projNo", targetCost.getProjNo());
        reflectUtil.setMethodValue("accountDetl", targetCost.getCostAccount());

        return baseSettlementService.getAmountSummary(reflectUtil.getObject());
    }

    @Override
    protected void beforeDelete() throws Exception {
        TargetCost targetCost = (TargetCost) this.deleteObj;

        ProjectTargetCostVo projectTargetCostVo = new ProjectTargetCostVo();
        projectTargetCostVo.setProjNo(targetCost.getProjNo());
        List<TargetCost> list = projectTargetCostVoService.list(targetCost);
        String type = "";
        if (list != null && list.size() > 0) {
            type = list.get(0).getType();
        }

        Double apply = getAppliedAmount(type, targetCost);
        if (apply > 0) {
            throw new Exception("该科目已有结算申请，无法删除。");
        }
    }

    /**
     * 获取目标成本部门余额
     * @param targetCost
     * @return
     * @throws Exception
     */
    private Double getRemainAmount(TargetCost targetCost) throws Exception {
        ProjectTargetCostVo projectTargetCostVo = getProjectTargetCostVo(targetCost);
        Double amount = projectTargetCostVo.getAmount();
        Double distribution = projectTargetCostVo.getDistribution();
        return amount - distribution;
    }

    private ProjectTargetCostVo getProjectTargetCostVo(TargetCost targetCost) throws Exception {
        ProjectTargetCostVo projectTargetCostVo = new ProjectTargetCostVo();
        projectTargetCostVo.setProjNo(targetCost.getProjNo());
        List<ProjectTargetCostVo> list
                = (List<ProjectTargetCostVo>) projectTargetCostVoService
                .list(projectTargetCostVo);
        if (list != null && list.size() > 0) {
            projectTargetCostVo = list.get(0);
        }
        return projectTargetCostVo;
    }

    /**
     * 获取目标成本分解项的调整金额
     * @param targetCost
     * @return
     * @throws Exception
     */
    private Double getAdjustAmount(TargetCost targetCost) throws Exception {
        TargetCost orig = (TargetCost) this.list(targetCost).get(0);
        return targetCost.getAmount() - orig.getAmount();
    }

    @Override
    public void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.sm.bean.TargetCost");
        String[] props = new String[]{"projNo", "projName", "costAccount", "costAccountName", "amount"};;
        super.getExcelReader().setProps(props);
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            TargetCost o = (TargetCost)list.get(i);
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
        Map<String, Double> map = new HashMap<>();

        for(int i = 0; i < list.size(); i++) {
            TargetCost o = (TargetCost)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空，请修改后重新导入");
            }
            if(o.getCostAccount() == null || o.getCostAccount() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "成本科目代码为空，请修改后重新导入");
            }

            Double amount = map.get(o.getProjNo());
            if (amount == null) {
                amount = Double.valueOf(0);
            }
            map.put(o.getProjNo(), amount + o.getAmount());
        }

        for (Map.Entry<String, Double> entry : map.entrySet()) {

            ProjectTargetCostVo projectTargetCostVo = new ProjectTargetCostVo();
            projectTargetCostVo.setProjNo(entry.getKey());
            List<ProjectTargetCostVo> voList = projectTargetCostVoService.list(projectTargetCostVo);

            if (voList == null || voList.size() <= 0) {
                throw new NullPointerException("未找到工号" + entry.getKey() + "的总目标工费，请联系相关人员维护后重新导入");
            }

            projectTargetCostVo = voList.get(0);
            Double remain = projectTargetCostVo.getAmount() - projectTargetCostVo.getDistribution();

            if (remain < entry.getValue()) {
                throw new Exception("工程" + entry.getKey() + "上导入的工费总额为" + entry.getValue() + "，超过该工程未分配的目标工费余额" + remain + "。请修改后重新导入。");
            }
        }
    }

    public void setProjectTargetCostVoService(BaseService projectTargetCostVoService) {
        this.projectTargetCostVoService = projectTargetCostVoService;
    }
    public void setSbSettlementVoService(SbSettlementVoService sbSettlementVoService) {
        this.sbSettlementVoService = sbSettlementVoService;
    }

    public void setScSettlementVoService(ScSettlementVoService scSettlementVoService) {
        this.scSettlementVoService = scSettlementVoService;
    }
}
