package com.iflat.hr.service.impl;

import com.iflat.base.service.BaseService;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.code.bean.Employee;
import com.iflat.hr.bean.Credit;
import com.iflat.hr.eneity.CreditType;
import com.iflat.hr.eneity.Department;
import com.iflat.report.bean.bi.Project;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import org.springframework.oxm.ValidationFailureException;

import java.util.*;

/**
 * Created by tyriv on 2016/6/21.
 */
public class CreditServiceImpl extends BaseServiceSupport {

    private BaseService rptProjectService;
    private BaseService employeeService;

    @Override
    protected void beforeInsert() throws Exception {
        Credit fine = (Credit) this.saveObj;
        fine.setCreatorDept(Session.getUserInfo().getPorgName());
    }


    @Override
    public void setImportExcelReader() throws Exception {

        super.getExcelReader().setClassName("com.iflat.hr.bean.Credit");
        String[] props = new String[]{"date", "type", "projNo", "dept", "personAcc", "personName", "description", "feedback", "amount", "score", "comment", "manager", "area", "areaMgr", "groupMgr", "projMgr", "profMgr", "workMgr"};
        super.getExcelReader().setProps(props);
    }

    @Override
    public void setImportProps() throws Exception {
        List list = super.getImportList();
        for(int i = 0; i < list.size(); i++) {
            Credit o = (Credit)list.get(i);
            o.setId(UUID.randomUUID().toString());
            UserInfoVo userInfoVo = Session.getUserInfo();
            o.setCreatorAcc(userInfoVo.getAccount());
            o.setCreatorName(userInfoVo.getUserName());
            o.setCreatorDept(userInfoVo.getPorgName());
            o.setCreateTime(new Date());
        }
    }

    @Override
    public void importValidate() throws Exception {

        List list = super.getImportList();

        for(int i = 0; i < list.size(); i++) {
            Credit o = (Credit)list.get(i);

            if(!Department.isDepartment(o.getDept())) {
                throw new ValidationFailureException("第" + (i + 1) + "行部门填写错误，只可为：" + Department.getString());
            }

            if(!CreditType.isCreditType(o.getType())) {
                throw new ValidationFailureException("第" + (i + 1) + "行类型填写错误，只可为：" + CreditType.getString());
            }

            String projNo = o.getProjNo();
            if (projNo != null && !"".equals(projNo)) {
                Project project = new Project();
                project.setProjNo(projNo);
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
            }

            Employee emp = new Employee();
            emp.setAccount(o.getPersonAcc());
            emp.setName(o.getPersonName());
            List<Employee> empList = this.employeeService.list(emp);
            if (empList == null || empList.size() == 0) {
                throw new Exception("第" + (i + 1) + "行数据错误，公司内不存在工号为" + o.getPersonAcc() + "，姓名为" + o.getPersonName() + "的员工，请修改后重新导入。");
            }
            o.setTeam(empList.get(0).getTeamName());
            o.setGroup(empList.get(0).getGroupName());
        }

    }

    public BaseService getRptProjectService() {
        return rptProjectService;
    }

    public void setRptProjectService(BaseService rptProjectService) {
        this.rptProjectService = rptProjectService;
    }

    public BaseService getEmployeeService() {
        return employeeService;
    }

    public void setEmployeeService(BaseService employeeService) {
        this.employeeService = employeeService;
    }
}
