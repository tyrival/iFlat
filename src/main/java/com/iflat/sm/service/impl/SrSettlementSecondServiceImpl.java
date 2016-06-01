package com.iflat.sm.service.impl;

import com.iflat.base.entity.ExcelReader;
import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.code.bean.Team;
import com.iflat.report.bean.bi.Project;
import com.iflat.sm.bean.SrSettlement;
import com.iflat.sm.bean.SrSettlementBalance;
import com.iflat.sm.bean.SrSettlementDetlSecond;
import com.iflat.sm.bean.SrSettlementSecond;
import com.iflat.sm.service.SrSettlementDetlSecondService;
import com.iflat.sm.service.SrSettlementSecondService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.ExcelUtil;
import com.iflat.util.Session;
import com.iflat.util.StringUtil;
import org.apache.commons.collections.map.HashedMap;

import java.io.File;
import java.util.*;

/**
 * Created by tyriv on 2016/4/15.
 */
public class SrSettlementSecondServiceImpl extends BaseServiceSupport implements SrSettlementSecondService {

    private BaseService srSettlementBalanceService;
    private SrSettlementBalance srSettlementBalance;
    private SrSettlementDetlSecondService srSettlementDetlSecondService;
    private BaseService rptProjectService;

    private BaseService teamService;
    private SrSettlementSecond srSettlementSecond;
    private String srtype;
    private Map<String, Object> map;

    @Override
    protected void beforeSave() throws Exception {

        // 获取原始部门余额，看是否足以支付此次分配
        SrSettlementSecond srSettlementSecond = (SrSettlementSecond) this.saveObj;
        this.srSettlementBalance.setDeptName(srSettlementSecond.getDeptName());
        List<SrSettlementBalance> list
                = this.srSettlementBalanceService.list(this.srSettlementBalance);
        if (list == null || list.size() == 0) {
            throw new Exception("此部门的结余金额为0");
        }
        srSettlementBalance = list.get(0);

        // 根据id查询此单据，如果存在，则获取原始金额，与修改后的金额相减，差用于修改部门结余金额
        SrSettlementSecond orig = new SrSettlementSecond();
        orig.setId(((SrSettlementSecond) this.saveObj).getId());
        List<SrSettlementSecond> origList = this.list(orig);
        if (origList != null && origList.size() != 0) {
            orig = origList.get(0);
        }
        Double diff = ((SrSettlementSecond) this.saveObj).getSummaryAmount()
                - orig.getSummaryAmount();

        if (srSettlementBalance.getAmount() < diff) {
            throw new Exception("部门结余为" + this.srSettlementBalance.getAmount()
                    + "元，不足以支付此次金额为" + diff
                    + "元的分配，请重新调整。");
        }
        // 修改结余金额
        srSettlementBalance.setAdjustment(-diff);
        this.srSettlementBalanceService.save(srSettlementBalance);
    }

    @Override
    protected void afterDelete() throws Exception {

        SrSettlementSecond o = (SrSettlementSecond) this.deleteObj;

        SrSettlementDetlSecond param = new SrSettlementDetlSecond();
        param.setPid(o.getId());
        this.srSettlementDetlSecondService.delete(param);

        // 还原balance
        SrSettlementBalance balance = new SrSettlementBalance();
        balance.setDeptName(o.getDeptName());
        balance.setAdjustment(o.getSummaryAmount());
    }

    @Override
    protected void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.sm.bean.SrSettlementSecond");
        this.excelReader.setEndRow(2);
        super.getExcelReader().setProps(new String[]{"projNo", "team", "laborAmount", "consumableAmount", "performanceAmount", "materialAmount", "mgrScore", "progressScore", "qualityScore", "safetyScore", "fineAmount", "comment"});
    }
    
    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        SrSettlementSecond o = (SrSettlementSecond) list.get(0);
        o.setId(UUID.randomUUID().toString());
        o.setType(srtype);
        UserInfoVo user = Session.getUserInfo();
        o.setDeptName(user.getPorgName());
        o.setCreatorAcc(user.getAccount());
        o.setCreatorName(user.getUserName());
        o.setCreateTime(new Date());

        List newList = new ArrayList<>();
        newList.add(o);
        setImportList(newList);
    }

    @Override
    protected void importValidate() throws Exception {

        // 校验工号是否存在
        SrSettlementSecond o = (SrSettlementSecond) super.getImportList().get(0);

        if (StringUtil.isBlank(o.getProjNo())) {
            throw new Exception("导入失败，未填写工号。");
        }

        if (StringUtil.isBlank(o.getDeptName())) {
            throw new Exception("导入失败，未填写工程队名。");
        }

        // 验证结余金额
        Double balance = Double.valueOf(0);
        SrSettlementBalance srSettlementBalance = new SrSettlementBalance();
        srSettlementBalance.setDeptName(o.getDeptName());
        List list = srSettlementBalanceService.list(srSettlementBalance);
        if (list != null && list.size() != 0) {
            balance = ((SrSettlementBalance) list.get(0)).getAmount();
        }
        if (balance < o.getSummaryAmount()) {
            throw new Exception("结余金额为" + balance
                    + "，不足以进行总额为" + o.getSummaryAmount() + "的分配。");
        }

        Project project = new Project();
        project.setProjNo(o.getProjNo());
        project.setStatus("0");
        List<Project> projectList = this.rptProjectService.list(project);
        if (projectList == null) {
            project.setStatus(null);
            projectList = this.rptProjectService.list(project);
            if (projectList == null) {
                throw new Exception("工号不存在，请修改后重新导入。");
            } else {
                throw new Exception("工号已关闭，请联系相关人员。");
            }
        }
        if (projectList.size() > 1) {
            throw new Exception("有两个或两个以上" + project.getProjNo() + "工号，请联系工号维护人员。");
        }
        o.setProjName(projectList.get(0).getName());

        // 验证工程队名
        Team team = new Team();
        team.setDeptName(o.getDeptName());
        team.setTeamName(o.getTeam());
        List<Team> teams = teamService.list(team);
        if (teams == null || teams.size() <= 0) {
            throw new Exception("部门【" + o.getDeptName() + "】不存在【" + o.getTeam() + "】施工队");
        }
    }

    @Override
    protected void beforeImportData() throws Exception {
        /**
         * 导入明细信息
         */
        // 获取头信息id，作为明细的pid
        this.srSettlementSecond = (SrSettlementSecond) super.getImportList().get(0);
        String pid = this.srSettlementSecond.getId();

        ExcelReader reader = new ExcelReader();
        reader.setFilePath(this.excelReader.getFilePath());
        reader.setSheetName(this.excelReader.getSheetName());
        reader.setClassName("com.iflat.sm.bean.SrSettlementDetlSecond");
        reader.setStartRow(3);
        reader.setEndRow(0);
        reader.setEndColumn(0);
        reader.setProps(new String[]{"type", "content", "specs", "unit", "settleQty1", "settleQty2", "settleQty3", "settleQty4", "price", "settleAmount", "comment"});

        //读取excel
        List list = ExcelUtil.read(reader);
        for (int i = 0; i < list.size(); i++) {
            SrSettlementDetlSecond o = (SrSettlementDetlSecond) list.get(0);

            if (StringUtil.isBlank(o.getContent())) {
                throw new Exception("导入失败。第" + i + "行施工内容为空，请填写后重新导入。");
            }

            o.setId(UUID.randomUUID().toString());
            o.setPid(pid);
            UserInfoVo user = Session.getUserInfo();
            o.setCreatorAcc(user.getAccount());
            o.setCreatorName(user.getUserName());
            o.setCreateTime(new Date());
        }

        if(list.size() > 0) {
            executeMethod(list, "insertBatch");
        }
        getMap().put("detail", list);
    }

    @Override
    protected void afterImportData() throws Exception {
        // 导入后修改结余
        SrSettlementSecond o = (SrSettlementSecond) this.importList.get(0);
        SrSettlementBalance balance = new SrSettlementBalance();
        balance.setDeptName(o.getDeptName());
        balance.setAdjustment(-o.getSummaryAmount());
        this.srSettlementBalanceService.save(balance);
    }

    @Override
    public Map importExcel(File file, String fileName, String type) throws Exception {
        this.srtype = type;
        List list = this.importExcel(file, fileName);
        getMap().put("head", list);
        return this.map;
    }

    public BaseService getSrSettlementBalanceService() {
        return srSettlementBalanceService;
    }

    public void setSrSettlementBalanceService(BaseService srSettlementBalanceService) {
        this.srSettlementBalanceService = srSettlementBalanceService;
    }

    public SrSettlementBalance getSrSettlementBalance() {
        return srSettlementBalance;
    }

    public void setSrSettlementBalance(SrSettlementBalance srSettlementBalance) {
        this.srSettlementBalance = srSettlementBalance;
    }

    public SrSettlementDetlSecondService getSrSettlementDetlSecondService() {
        return srSettlementDetlSecondService;
    }

    public void setSrSettlementDetlSecondService(SrSettlementDetlSecondService srSettlementDetlSecondService) {
        this.srSettlementDetlSecondService = srSettlementDetlSecondService;
    }

    public BaseService getRptProjectService() {
        return rptProjectService;
    }

    public void setRptProjectService(BaseService rptProjectService) {
        this.rptProjectService = rptProjectService;
    }

    public BaseService getTeamService() {
        return teamService;
    }

    public void setTeamService(BaseService teamService) {
        this.teamService = teamService;
    }

    public String getSrtype() {
        return srtype;
    }

    public void setSrtype(String srtype) {
        this.srtype = srtype;
    }

    public SrSettlementSecond getSrSettlementSecond() {
        return srSettlementSecond;
    }

    public void setSrSettlementSecond(SrSettlementSecond srSettlementSecond) {
        this.srSettlementSecond = srSettlementSecond;
    }

    public Map<String, Object> getMap() {
        if (map == null) {
            map = new HashedMap();
        }
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }

}
