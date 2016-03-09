package com.iflat.bi.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.service.BaseService;
import com.iflat.bi.bean.*;
import com.iflat.bi.entity.ProjectInProcessInfo;
import com.iflat.bi.entity.ProjectInfo;
import com.iflat.base.entity.ExcelTemplate;
import com.iflat.util.ExcelHelper;

import java.io.File;

public class BiAction extends BaseAction {

    private BaseService additionalBillService;
    private BaseService contractService;
    private BaseService deptCstCtrlService;
    private BaseService majorDevCstService;
    private BaseService majorMatCstService;
    private BaseService majorMatQtyService;
    private BaseService projectService;
    private BaseService projectCostService;
    private BaseService projectCstCtrlService;
    private BaseService projectInProcessService;
    private BaseService projectManHourService;
    private BaseService projectScheduleService;
    private BaseService projectInfoService;
    private BaseService projectInProcessInfoService;

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
        this.result.setList(this.projectInProcessInfoService.list(this.projectInProcessInfo));
        return SUCCESS;
    }

    /* ProjectInfo */
    public String listProjectInfo() throws Exception {
        this.result.setList(this.projectInfoService.list(this.projectInfo));
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
        this.result.setList(this.deptCstCtrlService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listDeptCstCtrl() throws Exception {
        this.result.setList(this.deptCstCtrlService.list(this.deptCstCtrl));
        return SUCCESS;
    }

    public String saveDeptCstCtrl() throws Exception {
        this.result.setObject(this.deptCstCtrlService.save(this.deptCstCtrl));
        return SUCCESS;
    }

    public String deleteDeptCstCtrl() throws Exception {
        this.result.setObject(this.deptCstCtrlService.delete(this.deptCstCtrl));
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
        this.result.setList(this.projectInProcessService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listProjectInProcess() throws Exception {
        this.result.setList(this.projectInProcessService.list(this.projectInProcess));
        return SUCCESS;
    }

    public String saveProjectInProcess() throws Exception {
        this.result.setObject(this.projectInProcessService.save(this.projectInProcess));
        return SUCCESS;
    }

    public String deleteProjectInProcess() throws Exception {
        this.result.setObject(this.projectInProcessService.delete(this.projectInProcess));
        return SUCCESS;
    }

    /* ProjectSchedule */
    public String listProjectSchedule() throws Exception {
        this.result.setList(this.projectScheduleService.list(this.projectSchedule));
        return SUCCESS;
    }

    public String saveProjectSchedule() throws Exception {
        this.result.setObject(this.projectScheduleService.save(this.projectSchedule));
        return SUCCESS;
    }

    public String deleteProjectSchedule() throws Exception {
        this.result.setObject(this.projectScheduleService.delete(this.projectSchedule));
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
        this.result.setList(this.projectCstCtrlService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listProjectCstCtrl() throws Exception {
        this.result.setList(this.projectCstCtrlService.list(this.projectCstCtrl));
        return SUCCESS;
    }

    public String saveProjectCstCtrl() throws Exception {
        this.result.setObject(this.projectCstCtrlService.save(this.projectCstCtrl));
        return SUCCESS;
    }

    public String deleteProjectCstCtrl() throws Exception {
        this.result.setObject(this.projectCstCtrlService.delete(this.projectCstCtrl));
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
        this.result.setList(this.additionalBillService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listAdditionalBill() throws Exception {
        this.result.setList(this.additionalBillService.list(this.additionalBill));
        return SUCCESS;
    }

    public String saveAdditionalBill() throws Exception {
        this.result.setObject(this.additionalBillService.save(this.additionalBill));
        return SUCCESS;
    }

    public String deleteAdditionalBill() throws Exception {
        this.result.setObject(this.additionalBillService.delete(this.additionalBill));
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
        this.result.setList(this.majorMatQtyService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listMajorMatQty() throws Exception {
        this.result.setList(this.majorMatQtyService.list(this.majorMatQty));
        return SUCCESS;
    }

    public String saveMajorMatQty() throws Exception {
        this.result.setObject(this.majorMatQtyService.save(this.majorMatQty));
        return SUCCESS;
    }

    public String deleteMajorMatQty() throws Exception {
        this.result.setObject(this.majorMatQtyService.delete(this.majorMatQty));
        return SUCCESS;
    }

    /* MajorMatCst */
    public String generateMajorMatCst() throws Exception {
        this.result.setObject(this.majorMatCstService.generate(this.majorMatCst));
        return SUCCESS;
    }

    public String templateMajorMatCst() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "MajorMatCst");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importMajorMatCst() throws Exception {
        this.result.setList(this.majorMatCstService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listMajorMatCst() throws Exception {
        this.result.setList(this.majorMatCstService.list(this.majorMatCst));
        return SUCCESS;
    }

    public String saveMajorMatCst() throws Exception {
        this.result.setObject(this.majorMatCstService.save(this.majorMatCst));
        return SUCCESS;
    }

    public String deleteMajorMatCst() throws Exception {
        this.result.setObject(this.majorMatCstService.delete(this.majorMatCst));
        return SUCCESS;
    }

    /* MajorDevCst */
    public String generateMajorDevCst() throws Exception {
        this.result.setObject(this.majorDevCstService.generate(this.majorDevCst));
        return SUCCESS;
    }

    public String templateMajorDevCst() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "MajorDevCst");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importMajorDevCst() throws Exception {
        this.result.setList(this.majorDevCstService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listMajorDevCst() throws Exception {
        this.result.setList(this.majorDevCstService.list(this.majorDevCst));
        return SUCCESS;
    }

    public String saveMajorDevCst() throws Exception {
        this.result.setObject(this.majorDevCstService.save(this.majorDevCst));
        return SUCCESS;
    }

    public String deleteMajorDevCst() throws Exception {
        this.result.setObject(this.majorDevCstService.delete(this.majorDevCst));
        return SUCCESS;
    }

    /* ProjectCost */
    public String generateProjectCost() throws Exception {
        this.result.setObject(this.projectCostService.generate(this.projectCost));
        return SUCCESS;
    }

    public String templateProjectCost() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("bi", "ProjectCost");
        excelTemplate = ExcelHelper.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importProjectCost() throws Exception {
        this.result.setList(this.projectCostService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String listProjectCost() throws Exception {
        this.result.setList(this.projectCostService.list(this.projectCost));
        return SUCCESS;
    }

    public String saveProjectCost() throws Exception {
        this.result.setObject(this.projectCostService.save(this.projectCost));
        return SUCCESS;
    }

    public String deleteProjectCost() throws Exception {
        this.result.setObject(this.projectCostService.delete(this.projectCost));
        return SUCCESS;
    }

    /* Contract */
    public String listContract() throws Exception {
        this.result.setList(this.contractService.list(this.contract));
        return SUCCESS;
    }

    public String saveContract() throws Exception {
        this.result.setObject(this.contractService.save(this.contract));
        return SUCCESS;
    }

    public String deleteContract() throws Exception {
        this.result.setObject(this.contractService.delete(this.contract));
        return SUCCESS;
    }

    /* Project */
    public String listProject() throws Exception {
        this.result.setList(this.projectService.list(this.project));
        return SUCCESS;
    }

    public String saveProject() throws Exception {
        this.result.setObject(this.projectService.save(this.project));
        return SUCCESS;
    }

    public String deleteProject() throws Exception {
        this.result.setObject(this.projectService.delete(this.project));
        return SUCCESS;
    }

    public BaseService getAdditionalBillService() {
        return additionalBillService;
    }

    public void setAdditionalBillService(BaseService additionalBillService) {
        this.additionalBillService = additionalBillService;
    }

    public BaseService getProjectCostService() {
        return projectCostService;
    }

    public void setProjectCostService(BaseService projectCostService) {
        this.projectCostService = projectCostService;
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

    public BaseService getContractService() {
        return contractService;
    }

    public void setContractService(BaseService contractService) {
        this.contractService = contractService;
    }

    public BaseService getDeptCstCtrlService() {
        return deptCstCtrlService;
    }

    public void setDeptCstCtrlService(BaseService deptCstCtrlService) {
        this.deptCstCtrlService = deptCstCtrlService;
    }

    public BaseService getMajorDevCstService() {
        return majorDevCstService;
    }

    public void setMajorDevCstService(BaseService majorDevCstService) {
        this.majorDevCstService = majorDevCstService;
    }

    public BaseService getMajorMatCstService() {
        return majorMatCstService;
    }

    public void setMajorMatCstService(BaseService majorMatCstService) {
        this.majorMatCstService = majorMatCstService;
    }

    public BaseService getMajorMatQtyService() {
        return majorMatQtyService;
    }

    public void setMajorMatQtyService(BaseService majorMatQtyService) {
        this.majorMatQtyService = majorMatQtyService;
    }

    public BaseService getProjectService() {
        return projectService;
    }

    public void setProjectService(BaseService projectService) {
        this.projectService = projectService;
    }

    public BaseService getProjectCstCtrlService() {
        return projectCstCtrlService;
    }

    public void setProjectCstCtrlService(BaseService projectCstCtrlService) {
        this.projectCstCtrlService = projectCstCtrlService;
    }

    public BaseService getProjectInProcessService() {
        return projectInProcessService;
    }

    public void setProjectInProcessService(BaseService projectInProcessService) {
        this.projectInProcessService = projectInProcessService;
    }

    public BaseService getProjectManHourService() {
        return projectManHourService;
    }

    public void setProjectManHourService(BaseService projectManHourService) {
        this.projectManHourService = projectManHourService;
    }

    public BaseService getProjectScheduleService() {
        return projectScheduleService;
    }

    public void setProjectScheduleService(BaseService projectScheduleService) {
        this.projectScheduleService = projectScheduleService;
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

    public BaseService getProjectInfoService() {
        return projectInfoService;
    }

    public void setProjectInfoService(BaseService projectInfoService) {
        this.projectInfoService = projectInfoService;
    }

    public ProjectInfo getProjectInfo() {
        return projectInfo;
    }

    public void setProjectInfo(ProjectInfo projectInfo) {
        this.projectInfo = projectInfo;
    }

    public BaseService getProjectInProcessInfoService() {
        return projectInProcessInfoService;
    }

    public void setProjectInProcessInfoService(BaseService projectInProcessInfoService) {
        this.projectInProcessInfoService = projectInProcessInfoService;
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
