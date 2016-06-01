package com.iflat.sm.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.sm.bean.TargetCost;
import com.iflat.sm.bean.TargetCostSplit;
import com.iflat.sm.entity.SbSettlementVo;
import com.iflat.sm.entity.ScSettlementVo;
import com.iflat.sm.entity.TargetCostVo;
import com.iflat.sm.service.BaseSettlementService;
import com.iflat.sm.service.SbSettlementVoService;
import com.iflat.sm.service.ScSettlementVoService;
import com.iflat.sm.service.TargetCostSplitService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.ReflectUtil;
import com.iflat.util.Session;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.oxm.ValidationFailureException;

import java.util.*;

/**
 * Created by tyriv on 2016/3/23.
 */
public class TargetCostSplitServiceImpl extends BaseServiceSupport implements TargetCostSplitService {

    private BaseService targetCostVoService;
    private SbSettlementVoService sbSettlementVoService;
    private ScSettlementVoService scSettlementVoService;

    @Override
    protected void beforeInsert() throws Exception {
        // 查询此分解项对应的目标成本的余额
        TargetCostSplit targetCostSplit = (TargetCostSplit) this.saveObj;

        Double add = targetCostSplit.getAmount();
        Double remain = getRemainAmount(targetCostSplit);
        // 余额与当前新增项目的比较
        if (add > remain) {
            throw new Exception("新增失败。新增项目的金额为"+ add +"，超过该目标成本科目的余额" + remain);
        }
    }

    @Override
    protected void beforeUpdate() throws Exception {
        // 查询此分解项对应的目标成本的余额
        TargetCostSplit targetCostSplit = (TargetCostSplit) this.saveObj;

        Double adjust = getAdjustAmount(targetCostSplit);
        TargetCostVo targetCostVo = getTargetCost(targetCostSplit);
        Double remain = targetCostVo.getAmount() - targetCostVo.getDistribution();
        // 余额与当前新增项目的比较
        if (adjust > remain) {
            throw new Exception("调整失败。目标成本调整额度为" + adjust + "， 超过了该科目的余额"  + remain +"，请重新调整。");
        }

        // 对调整金额进行校验
        validateAdjustmentWithApplied(targetCostVo.getType(), targetCostSplit, adjust);
    }

    /**
     * 根据已申请的金额校验调整金额，是否可以进行调整
     * @param type 目标成本类型，造船/钢结构
     * @param targetCostSplit 目标成本分解项目
     * @param adjust 调整额度
     * @throws Exception
     */
    private void validateAdjustmentWithApplied(String type, TargetCostSplit targetCostSplit, Double adjust) throws Exception {

        // 当调整为减金额时，判断此科目已经提交过的申请总额是否仍然小于修改后的金额，小于的话才可以修改科目余额
        Double apply = getAppliedAmount(type, targetCostSplit);
        if (adjust < 0 && targetCostSplit.getAmount() < apply) {
            throw new Exception("调整失败。目标成本调整为" + targetCostSplit.getAmount() + "， 小于该科目已有的结算申请的总额" + apply);
        }
    }

    /**
     * 获取已申请的金额
     * @param type
     * @param targetCostSplit
     * @return
     * @throws Exception
     */
    private Double getAppliedAmount(String type, TargetCostSplit targetCostSplit) throws Exception {

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
        reflectUtil.setMethodValue("projNo", targetCostSplit.getProjNo());
        reflectUtil.setMethodValue("accountDetl", targetCostSplit.getCostAccount());

        return baseSettlementService.getAmountSummary(reflectUtil.getObject());
    }

    @Override
    protected void beforeDelete() throws Exception {
        TargetCostSplit targetCostSplit = (TargetCostSplit) this.deleteObj;

        TargetCostVo targetCostVo = new TargetCostVo();
        targetCostVo.setProjNo(targetCostSplit.getProjNo());
        targetCostVo.setCostAccount(targetCostSplit.getCostAccount());
        List<TargetCost> list = targetCostVoService.list(targetCostVo);
        String type = "";
        if (list != null && list.size() > 0) {
            type = list.get(0).getType();
        }

        Double apply = getAppliedAmount(type, targetCostSplit);
        if (apply > 0) {
            throw new Exception("该科目已有结算申请，无法删除。");
        }
    }

    /**
     * 获取目标成本科目余额
     * @param targetCostSplit
     * @return
     * @throws Exception
     */
    private Double getRemainAmount(TargetCostSplit targetCostSplit) throws Exception {
        TargetCostVo targetCostVo = getTargetCost(targetCostSplit);
        Double amount = targetCostVo.getAmount();
        Double distribution = targetCostVo.getDistribution();
        return amount - distribution;
    }

    private TargetCostVo getTargetCost(TargetCostSplit targetCostSplit) throws Exception {
        TargetCostVo targetCostVo = new TargetCostVo();
        targetCostVo.setProjNo(targetCostSplit.getProjNo());
        targetCostVo.setCostAccount(targetCostSplit.getCostAccount());
        List<TargetCostVo> list = (List<TargetCostVo>) targetCostVoService.list(targetCostVo);
        if (list != null && list.size() > 0) {
            targetCostVo = list.get(0);
        }
        return targetCostVo;
    }

    @Override
    public void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.sm.bean.TargetCostSplit");
        String[] props = new String[]{"projNo", "projName", "deptName", "costAccount", "costAccountName", "amount", "comment"};;
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
        Map<String, Map> map = new HashMap<>();

        for(int i = 0; i < list.size(); i++) {
            TargetCostSplit o = (TargetCostSplit)list.get(i);
            if(o.getProjNo() == null || o.getProjNo() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行工号为空，请修改后重新导入");
            }
            if(o.getDeptName() == null || o.getDeptName() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "行部门为空，请修改后重新导入");
            }
            if(o.getCostAccount() == null || o.getCostAccount() == "") {
                throw new ValidationFailureException("第" + (i + 1) + "成本科目代码为空，请修改后重新导入");
            }

            // 判断部门名称是否符合规范
            String[] arr = new String[]{"造船事业部", "造船加工车间", "造船船体车间", "造船安装车间", "修船事业部", "修船坞修车间", "修船冷作车间", "修船舾装车间", "修船机电修理车间", "钢结构事业部"};
            if (!ArrayUtils.contains(arr, o.getDeptName())) {
                throw new ValidationFailureException("第" + (i + 1) + "行部门名称错误，请修改后重新导入");
            }

            Map<String, Double> m = map.get(o.getProjNo());
            Double amount = null;
            if (m != null) {
                amount =  m.get(o.getCostAccount());
            } else {
                m = new HashMap<>();
                map.put(o.getProjNo(), m);
            }

            if (amount == null) {
                amount = Double.valueOf(0);
            }
            m.put(o.getCostAccount(), amount + o.getAmount());
        }

        for (Map.Entry<String, Map> entry : map.entrySet()) {
            Map<String, Double> m = entry.getValue();
            for (Map.Entry<String, Double> en : m.entrySet()) {
                TargetCostVo vo = new TargetCostVo();
                vo.setProjNo(entry.getKey());
                vo.setCostAccount(en.getKey());
                List<TargetCostVo> l = this.targetCostVoService.list(vo);

                if (l == null || l.size() <= 0) {
                    throw new NullPointerException("未找到工程" + entry.getKey() + "中，成本科目为" + en.getKey() + "的目标成本公费，请联系相关人员维护相关数据后，重新导入。");
                }

                vo = l.get(0);
                Double remain = vo.getAmount() - vo.getDistribution();

                if (remain < en.getValue()) {
                    throw new Exception("工程" + entry.getKey() + "的成本科目" + en.getKey() + "上，导入的工费总额为" + en.getValue() + "，超过该工程该科目中未分配的工费余额" + remain + "。请修改后重新导入。");
                }
            }
        }
    }
    /**
     * 获取目标成本分解项的调整金额
     * @param targetCostSplit
     * @return
     * @throws Exception
     */
    private Double getAdjustAmount(TargetCostSplit targetCostSplit) throws Exception {
        TargetCostSplit orig = (TargetCostSplit) this.list(targetCostSplit).get(0);
        return targetCostSplit.getAmount() - orig.getAmount();
    }

    public void setTargetCostVoService(BaseService targetCostVoService) {
        this.targetCostVoService = targetCostVoService;
    }

    public void setSbSettlementVoService(SbSettlementVoService sbSettlementVoService) {
        this.sbSettlementVoService = sbSettlementVoService;
    }

    public void setScSettlementVoService(ScSettlementVoService scSettlementVoService) {
        this.scSettlementVoService = scSettlementVoService;
    }
}
