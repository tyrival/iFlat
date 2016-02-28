package com.iflat.bi.action;

import com.iflat.bi.bean.*;
import com.iflat.bi.entity.ProjectInProcessInfo;
import com.iflat.bi.entity.ProjectInfo;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.ExcelTemplate;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatManager;
import com.iflat.util.ExcelHelper;
import com.opensymphony.xwork2.ActionSupport;

import java.io.File;

public class BiAction extends ActionSupport implements ResultAware {

    private Result result;

    private IflatManager additionalBillManager;
    private IflatManager contractManager;
    private IflatManager deptCstCtrlManager;
    private IflatManager majorDevCstManager;
    private IflatManager majorMatCstManager;
    private IflatManager majorMatQtyManager;
    private IflatManager projectManager;
    private IflatManager projectCostManager;
    private IflatManager projectCstCtrlManager;
    private IflatManager projectInProcessManager;
    private IflatManager projectManHourManager;
    private IflatManager projectScheduleManager;
    private IflatManager projectInfoManager;
    private IflatManager projectInProcessInfoManager;

    private AdditionalBill additionalBill;
    private Contract contract;
    private DeptCstCtrl deptCstCtrl;
    private MajorDevCst majorDevCst;
    private MajorMatCst majorMatCst;
    private MajorMatQty majorMatQty;
    private Project project;
    private ProjectCost projectCost;
    private ProjectCstCtrl projectCstCtrl;
    private ProjectInProcess projectInProcess;
    private ProjectManHour projectManHour;
    private ProjectSchedule projectSchedule;
    private ProjectInfo projectInfo;
    private ProjectInProcessInfo projectInProcessInfo;

    private File upload;
    private String uploadFileName;

    /* ProjectInProcessInfo */
    public String listProjectInProcessInfo() throws Exception {
        this.result.setList(this.projectInProcessInfoManager.list(this.projectInProcessInfo));
        return SUCCESS;
    }

    /* ProjectInfo */
    public String listProjectInfo() throws Exception {
        this.result.setList(this.projectInfoManager.list(this.projectInfo));
        return SUCCESS;
    }

    /* DeptCstCtrl */
    public String templateDeptCstCtrl() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "DeptCstCtrl");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importDeptCstCtrl() throws Exception {
        this.result.setList(this.deptCstCtrlManager.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listDeptCstCtrl() throws Exception {
        this.result.setList(this.deptCstCtrlManager.list(this.deptCstCtrl));
        return SUCCESS;
    }

    public String saveDeptCstCtrl() throws Exception {
        this.result.setObject(this.deptCstCtrlManager.save(this.deptCstCtrl));
        return SUCCESS;
    }

    public String deleteDeptCstCtrl() throws Exception {
        this.result.setObject(this.deptCstCtrlManager.delete(this.deptCstCtrl));
        return SUCCESS;
    }

    /* ProjectInProcess */
    public String templateProjectInProcess() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "ProjectInProcess");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importProjectInProcess() throws Exception {
        this.result.setList(this.projectInProcessManager.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listProjectInProcess() throws Exception {
        this.result.setList(this.projectInProcessManager.list(this.projectInProcess));
        return SUCCESS;
    }

    public String saveProjectInProcess() throws Exception {
        this.result.setObject(this.projectInProcessManager.save(this.projectInProcess));
        return SUCCESS;
    }

    public String deleteProjectInProcess() throws Exception {
        this.result.setObject(this.projectInProcessManager.delete(this.projectInProcess));
        return SUCCESS;
    }

    /* ProjectSchedule */
    public String listProjectSchedule() throws Exception {
        this.result.setList(this.projectScheduleManager.list(this.projectSchedule));
        return SUCCESS;
    }

    public String saveProjectSchedule() throws Exception {
        this.result.setObject(this.projectScheduleManager.save(this.projectSchedule));
        return SUCCESS;
    }

    public String deleteProjectSchedule() throws Exception {
        this.result.setObject(this.projectScheduleManager.delete(this.projectSchedule));
        return SUCCESS;
    }

    /* ProjectCstCtrl */
    public String templateProjectCstCtrl() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "ProjectCstCtrl");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importProjectCstCtrl() throws Exception {
        this.result.setList(this.projectCstCtrlManager.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listProjectCstCtrl() throws Exception {
        this.result.setList(this.projectCstCtrlManager.list(this.projectCstCtrl));
        return SUCCESS;
    }

    public String saveProjectCstCtrl() throws Exception {
        this.result.setObject(this.projectCstCtrlManager.save(this.projectCstCtrl));
        return SUCCESS;
    }

    public String deleteProjectCstCtrl() throws Exception {
        this.result.setObject(this.projectCstCtrlManager.delete(this.projectCstCtrl));
        return SUCCESS;
    }

    /* AdditionalBill */
    public String templateAdditionalBill() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "AdditionalBill");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importAdditionalBill() throws Exception {
        this.result.setList(this.additionalBillManager.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listAdditionalBill() throws Exception {
        this.result.setList(this.additionalBillManager.list(this.additionalBill));
        return SUCCESS;
    }

    public String saveAdditionalBill() throws Exception {
        this.result.setObject(this.additionalBillManager.save(this.additionalBill));
        return SUCCESS;
    }

    public String deleteAdditionalBill() throws Exception {
        this.result.setObject(this.additionalBillManager.delete(this.additionalBill));
        return SUCCESS;
    }

    /* MajorMatQty */
    public String templateMajorMatQty() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "MajorMatQty");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importMajorMatQty() throws Exception {
        this.result.setList(this.majorMatQtyManager.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listMajorMatQty() throws Exception {
        this.result.setList(this.majorMatQtyManager.list(this.majorMatQty));
        return SUCCESS;
    }

    public String saveMajorMatQty() throws Exception {
        this.result.setObject(this.majorMatQtyManager.save(this.majorMatQty));
        return SUCCESS;
    }

    public String deleteMajorMatQty() throws Exception {
        this.result.setObject(this.majorMatQtyManager.delete(this.majorMatQty));
        return SUCCESS;
    }

    /* MajorMatCst */
    public String generateMajorMatCst() throws Exception {
        this.result.setObject(this.majorMatCstManager.generate(this.majorMatCst));
        return SUCCESS;
    }

    public String templateMajorMatCst() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "MajorMatCst");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importMajorMatCst() throws Exception {
        this.result.setList(this.majorMatCstManager.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listMajorMatCst() throws Exception {
        this.result.setList(this.majorMatCstManager.list(this.majorMatCst));
        return SUCCESS;
    }

    public String saveMajorMatCst() throws Exception {
        this.result.setObject(this.majorMatCstManager.save(this.majorMatCst));
        return SUCCESS;
    }

    public String deleteMajorMatCst() throws Exception {
        this.result.setObject(this.majorMatCstManager.delete(this.majorMatCst));
        return SUCCESS;
    }

    /* MajorDevCst */
    public String generateMajorDevCst() throws Exception {
        this.result.setObject(this.majorDevCstManager.generate(this.majorDevCst));
        return SUCCESS;
    }

    public String templateMajorDevCst() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "MajorDevCst");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importMajorDevCst() throws Exception {
        this.result.setList(this.majorDevCstManager.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listMajorDevCst() throws Exception {
        this.result.setList(this.majorDevCstManager.list(this.majorDevCst));
        return SUCCESS;
    }

    public String saveMajorDevCst() throws Exception {
        this.result.setObject(this.majorDevCstManager.save(this.majorDevCst));
        return SUCCESS;
    }

    public String deleteMajorDevCst() throws Exception {
        this.result.setObject(this.majorDevCstManager.delete(this.majorDevCst));
        return SUCCESS;
    }

    /* ProjectCost */
    public String generateProjectCost() throws Exception {
        this.result.setObject(this.projectCostManager.generate(this.projectCost));
        return SUCCESS;
    }

    public String templateProjectCost() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "ProjectCost");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importProjectCost() throws Exception {
        this.result.setList(this.projectCostManager.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listProjectCost() throws Exception {
        this.result.setList(this.projectCostManager.list(this.projectCost));
        return SUCCESS;
    }

    public String saveProjectCost() throws Exception {
        this.result.setObject(this.projectCostManager.save(this.projectCost));
        return SUCCESS;
    }

    public String deleteProjectCost() throws Exception {
        this.result.setObject(this.projectCostManager.delete(this.projectCost));
        return SUCCESS;
    }

    /* Contract */
    public String listContract() throws Exception {
        this.result.setList(this.contractManager.list(this.contract));
        return SUCCESS;
    }

    public String saveContract() throws Exception {
        this.result.setObject(this.contractManager.save(this.contract));
        return SUCCESS;
    }

    public String deleteContract() throws Exception {
        this.result.setObject(this.contractManager.delete(this.contract));
        return SUCCESS;
    }

    /* Project */
    public String listProject() throws Exception {
        this.result.setList(this.projectManager.list(this.project));
        return SUCCESS;
    }

    public String saveProject() throws Exception {
        this.result.setObject(this.projectManager.save(this.project));
        return SUCCESS;
    }

    public String deleteProject() throws Exception {
        this.result.setObject(this.projectManager.delete(this.project));
        return SUCCESS;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public IflatManager getAdditionalBillManager() {
        return additionalBillManager;
    }

    public void setAdditionalBillManager(IflatManager additionalBillManager) {
        this.additionalBillManager = additionalBillManager;
    }

    public IflatManager getProjectCostManager() {
        return projectCostManager;
    }

    public void setProjectCostManager(IflatManager projectCostManager) {
        this.projectCostManager = projectCostManager;
    }

    public ProjectCost getProjectCost() {
        return projectCost;
    }

    public void setProjectCost(ProjectCost projectCost) {
        this.projectCost = projectCost;
    }

    public AdditionalBill getAdditionalBill() {
        return additionalBill;
    }

    public void setAdditionalBill(AdditionalBill additionalBill) {
        this.additionalBill = additionalBill;
    }

    public IflatManager getContractManager() {
        return contractManager;
    }

    public void setContractManager(IflatManager contractManager) {
        this.contractManager = contractManager;
    }

    public IflatManager getDeptCstCtrlManager() {
        return deptCstCtrlManager;
    }

    public void setDeptCstCtrlManager(IflatManager deptCstCtrlManager) {
        this.deptCstCtrlManager = deptCstCtrlManager;
    }

    public IflatManager getMajorDevCstManager() {
        return majorDevCstManager;
    }

    public void setMajorDevCstManager(IflatManager majorDevCstManager) {
        this.majorDevCstManager = majorDevCstManager;
    }

    public IflatManager getMajorMatCstManager() {
        return majorMatCstManager;
    }

    public void setMajorMatCstManager(IflatManager majorMatCstManager) {
        this.majorMatCstManager = majorMatCstManager;
    }

    public IflatManager getMajorMatQtyManager() {
        return majorMatQtyManager;
    }

    public void setMajorMatQtyManager(IflatManager majorMatQtyManager) {
        this.majorMatQtyManager = majorMatQtyManager;
    }

    public IflatManager getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(IflatManager projectManager) {
        this.projectManager = projectManager;
    }

    public IflatManager getProjectCstCtrlManager() {
        return projectCstCtrlManager;
    }

    public void setProjectCstCtrlManager(IflatManager projectCstCtrlManager) {
        this.projectCstCtrlManager = projectCstCtrlManager;
    }

    public IflatManager getProjectInProcessManager() {
        return projectInProcessManager;
    }

    public void setProjectInProcessManager(IflatManager projectInProcessManager) {
        this.projectInProcessManager = projectInProcessManager;
    }

    public IflatManager getProjectManHourManager() {
        return projectManHourManager;
    }

    public void setProjectManHourManager(IflatManager projectManHourManager) {
        this.projectManHourManager = projectManHourManager;
    }

    public IflatManager getProjectScheduleManager() {
        return projectScheduleManager;
    }

    public void setProjectScheduleManager(IflatManager projectScheduleManager) {
        this.projectScheduleManager = projectScheduleManager;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public DeptCstCtrl getDeptCstCtrl() {
        return deptCstCtrl;
    }

    public void setDeptCstCtrl(DeptCstCtrl deptCstCtrl) {
        this.deptCstCtrl = deptCstCtrl;
    }

    public MajorDevCst getMajorDevCst() {
        return majorDevCst;
    }

    public void setMajorDevCst(MajorDevCst majorDevCst) {
        this.majorDevCst = majorDevCst;
    }

    public MajorMatCst getMajorMatCst() {
        return majorMatCst;
    }

    public void setMajorMatCst(MajorMatCst majorMatCst) {
        this.majorMatCst = majorMatCst;
    }

    public MajorMatQty getMajorMatQty() {
        return majorMatQty;
    }

    public void setMajorMatQty(MajorMatQty majorMatQty) {
        this.majorMatQty = majorMatQty;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public ProjectCstCtrl getProjectCstCtrl() {
        return projectCstCtrl;
    }

    public void setProjectCstCtrl(ProjectCstCtrl projectCstCtrl) {
        this.projectCstCtrl = projectCstCtrl;
    }

    public ProjectInProcess getProjectInProcess() {
        return projectInProcess;
    }

    public void setProjectInProcess(ProjectInProcess projectInProcess) {
        this.projectInProcess = projectInProcess;
    }

    public ProjectManHour getProjectManHour() {
        return projectManHour;
    }

    public void setProjectManHour(ProjectManHour projectManHour) {
        this.projectManHour = projectManHour;
    }

    public ProjectSchedule getProjectSchedule() {
        return projectSchedule;
    }

    public void setProjectSchedule(ProjectSchedule projectSchedule) {
        this.projectSchedule = projectSchedule;
    }

    public IflatManager getProjectInfoManager() {
        return projectInfoManager;
    }

    public void setProjectInfoManager(IflatManager projectInfoManager) {
        this.projectInfoManager = projectInfoManager;
    }

    public ProjectInfo getProjectInfo() {
        return projectInfo;
    }

    public void setProjectInfo(ProjectInfo projectInfo) {
        this.projectInfo = projectInfo;
    }

    public IflatManager getProjectInProcessInfoManager() {
        return projectInProcessInfoManager;
    }

    public void setProjectInProcessInfoManager(IflatManager projectInProcessInfoManager) {
        this.projectInProcessInfoManager = projectInProcessInfoManager;
    }

    public ProjectInProcessInfo getProjectInProcessInfo() {
        return projectInProcessInfo;
    }

    public void setProjectInProcessInfo(ProjectInProcessInfo projectInProcessInfo) {
        this.projectInProcessInfo = projectInProcessInfo;
    }

    public File getUpload() {
        return upload;
    }

    public void setUpload(File upload) {
        this.upload = upload;
    }

    public String getUploadFileName() {
        return uploadFileName;
    }

    public void setUploadFileName(String uploadFileName) {
        this.uploadFileName = uploadFileName;
    }
}
