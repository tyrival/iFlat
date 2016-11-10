package com.iflat.ss.action;

import com.iflat.ss.entity.PhDetailType;
import com.iflat.ss.service.PhDetailTypeService;
import com.iflat.base.entity.ExcelTemplate;
import com.iflat.ss.entity.VrCodeRiskLvl;
import com.iflat.ss.entity.PhCodeType;
import com.iflat.ss.entity.FsAreaDept;
import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.ss.bean.*;
import com.iflat.ss.entity.SafetyFineVo;
import com.iflat.util.ExcelUtil;
import com.iflat.util.FileUtil;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

public class SsAction extends BaseAction implements ModelDriven<Page> {
    private BaseService safetyFineService;
    private BaseService safetyFineVoService;
    private SafetyFine safetyFine;
    private SafetyFineVo safetyFineVo;
    private Page page;
    private File upload;
    private String uploadFileName;
    private String filePath;
    private Accident accident;
    private BaseService accidentService;
    private AccParty accParty;
    private BaseService accPartyService;
    private FiveS fiveS;
    private BaseService fiveSService;
    private FsArea fsArea;
    private BaseService fsAreaService;
    private FsCode fsCode;
    private BaseService fsCodeService;
    private PhCode phCode;
    private BaseService phCodeService;
    private PotentialHazard potentialHazard;
    private BaseService potentialHazardService;
    private ViolateRegulation violateRegulation;
    private BaseService violateRegulationService;
    private VrCode vrCode;
    private BaseService vrCodeService;

    public String templatePotentialHazard() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("ss", "PotentialHazard");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String templateViolateRegulation() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("ss", "ViolateRegulation");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String templateFiveS() throws Exception {
        ExcelTemplate excelTemplate = new ExcelTemplate("ss", "FiveS");
        excelTemplate = ExcelUtil.template(excelTemplate);
        this.result.setObject(excelTemplate.getSavePath());
        return SUCCESS;
    }

    public String importPotentialHazard() throws Exception {
        this.result.setList(this.potentialHazardService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String importViolateRegulation() throws Exception {
        this.result.setList(this.violateRegulationService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }

    public String importFiveS() throws Exception {
        this.result.setList(this.fiveSService.importExcel(this.upload, this.uploadFileName));
        return SUCCESS;
    }


    /* VrCode */
    public String saveVrCode() throws Exception {
        this.result.setObject(this.vrCodeService.save(this.vrCode));
        return SUCCESS;
    }

    public String deleteVrCode() throws Exception {
        this.result.setObject(this.vrCodeService.delete(this.vrCode));
        return SUCCESS;
    }

    public String listVrCode() throws Exception {
        this.result.setList(this.vrCodeService.list(this.vrCode));
        return SUCCESS;
    }

    public String listPageVrCode() throws Exception {
        this.result.setObject(this.vrCodeService.listPage(this.vrCode, this.page));
        return SUCCESS;
    }

    public String uploadVrCode() throws Exception {
        this.result.setObject(this.vrCodeService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* ViolateRegulation */

    public String saveViolateRegulation() throws Exception {
        this.result.setObject(this.violateRegulationService.save(this.violateRegulation));
        return SUCCESS;
    }

    public String deleteViolateRegulation() throws Exception {
        this.result.setObject(this.violateRegulationService.delete(this.violateRegulation));
        return SUCCESS;
    }

    public String listViolateRegulation() throws Exception {
        this.result.setList(this.violateRegulationService.list(this.violateRegulation));
        return SUCCESS;
    }

    public String listPageViolateRegulation() throws Exception {
        this.result.setObject(this.violateRegulationService.listPage(this.violateRegulation, this.page));
        return SUCCESS;
    }

    public String uploadViolateRegulation() throws Exception {
        this.result.setObject(this.violateRegulationService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String savePotentialHazard() throws Exception {
        this.result.setObject(this.potentialHazardService.save(this.potentialHazard));
        return SUCCESS;
    }

    public String deletePotentialHazard() throws Exception {
        this.result.setObject(this.potentialHazardService.delete(this.potentialHazard));
        return SUCCESS;
    }

    public String listPotentialHazard() throws Exception {
        this.result.setList(this.potentialHazardService.list(this.potentialHazard));
        return SUCCESS;
    }

    public String listPagePotentialHazard() throws Exception {
        this.result.setObject(this.potentialHazardService.listPage(this.potentialHazard, this.page));
        return SUCCESS;
    }

    public String uploadPotentialHazard() throws Exception {
        this.result.setObject(this.potentialHazardService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* PhCode */

    public String savePhCode() throws Exception {
        this.result.setObject(this.phCodeService.save(this.phCode));
        return SUCCESS;
    }

    public String deletePhCode() throws Exception {
        this.result.setObject(this.phCodeService.delete(this.phCode));
        return SUCCESS;
    }

    public String listPhCode() throws Exception {
        this.result.setList(this.phCodeService.list(this.phCode));
        return SUCCESS;
    }

    public String listPagePhCode() throws Exception {
        this.result.setObject(this.phCodeService.listPage(this.phCode, this.page));
        return SUCCESS;
    }

    public String uploadPhCode() throws Exception {
        this.result.setObject(this.phCodeService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* FsCode */

    public String saveFsCode() throws Exception {
        this.result.setObject(this.fsCodeService.save(this.fsCode));
        return SUCCESS;
    }

    public String deleteFsCode() throws Exception {
        this.result.setObject(this.fsCodeService.delete(this.fsCode));
        return SUCCESS;
    }

    public String listFsCode() throws Exception {
        this.result.setList(this.fsCodeService.list(this.fsCode));
        return SUCCESS;
    }

    public String listPageFsCode() throws Exception {
        this.result.setObject(this.fsCodeService.listPage(this.fsCode, this.page));
        return SUCCESS;
    }

    public String uploadFsCode() throws Exception {
        this.result.setObject(this.fsCodeService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* FsArea */

    public String saveFsArea() throws Exception {
        this.result.setObject(this.fsAreaService.save(this.fsArea));
        return SUCCESS;
    }

    public String deleteFsArea() throws Exception {
        this.result.setObject(this.fsAreaService.delete(this.fsArea));
        return SUCCESS;
    }

    public String listFsArea() throws Exception {
        this.result.setList(this.fsAreaService.list(this.fsArea));
        return SUCCESS;
    }

    public String listPageFsArea() throws Exception {
        this.result.setObject(this.fsAreaService.listPage(this.fsArea, this.page));
        return SUCCESS;
    }

    public String uploadFsArea() throws Exception {
        this.result.setObject(this.fsAreaService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* FiveS */

    public String saveFiveS() throws Exception {
        this.result.setObject(this.fiveSService.save(this.fiveS));
        return SUCCESS;
    }

    public String deleteFiveS() throws Exception {
        this.result.setObject(this.fiveSService.delete(this.fiveS));
        return SUCCESS;
    }

    public String listFiveS() throws Exception {
        this.result.setList(this.fiveSService.list(this.fiveS));
        return SUCCESS;
    }

    public String listPageFiveS() throws Exception {
        this.result.setObject(this.fiveSService.listPage(this.fiveS, this.page));
        return SUCCESS;
    }

    public String uploadFiveS() throws Exception {
        this.result.setObject(this.fiveSService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* AccParty */

    public String saveAccParty() throws Exception {
        this.result.setObject(this.accPartyService.save(this.accParty));
        return SUCCESS;
    }

    public String deleteAccParty() throws Exception {
        this.result.setObject(this.accPartyService.delete(this.accParty));
        return SUCCESS;
    }

    public String listAccParty() throws Exception {
        this.result.setList(this.accPartyService.list(this.accParty));
        return SUCCESS;
    }

    public String listPageAccParty() throws Exception {
        this.result.setObject(this.accPartyService.listPage(this.accParty, this.page));
        return SUCCESS;
    }

    public String uploadAccParty() throws Exception {
        this.result.setObject(this.accPartyService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* Accident */

    public String saveAccident() throws Exception {
        this.result.setObject(this.accidentService.save(this.accident));
        return SUCCESS;
    }

    public String deleteAccident() throws Exception {
        AccParty ap = new AccParty();
        ap.setAccId(this.accident.getId());
        this.accPartyService.delete(ap);
        this.result.setObject(this.accidentService.delete(this.accident));
        return SUCCESS;
    }

    public String listAccident() throws Exception {
        this.result.setList(this.accidentService.list(this.accident));
        return SUCCESS;
    }

    public String listPageAccident() throws Exception {
        this.result.setObject(this.accidentService.listPage(this.accident, this.page));
        return SUCCESS;
    }

    public String uploadAccident() throws Exception {
        this.result.setObject(this.accidentService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* SafetyFine */

    public String saveSafetyFine() throws Exception {
        this.result.setObject(this.safetyFineService.save(this.safetyFine));
        return SUCCESS;
    }

    public String deleteSafetyFine() throws Exception {
        this.result.setObject(this.safetyFineService.delete(this.safetyFine));
        return SUCCESS;
    }

    public String listSafetyFine() throws Exception {
        this.result.setList(this.safetyFineService.list(this.safetyFine));
        return SUCCESS;
    }

    public String listSafetyFineVo() throws Exception {
        this.result.setList(this.safetyFineVoService.list(this.safetyFineVo));
        return SUCCESS;
    }

    public String listPageSafetyFineVo() throws Exception {
        this.result.setObject(this.safetyFineVoService.listPage(this.safetyFineVo, this.page));
        return SUCCESS;
    }

    public String uploadSafetyFine() throws Exception {
        this.result.setObject(this.safetyFineService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String deleteFile() throws Exception {
        this.result.setObject(FileUtil.delete(this.filePath));
        return SUCCESS;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public BaseService getSafetyFineService() {
        return safetyFineService;
    }

    public void setSafetyFineService(BaseService safetyFineService) {
        this.safetyFineService = safetyFineService;
    }

    public SafetyFine getSafetyFine() {
        return safetyFine;
    }

    public void setSafetyFine(SafetyFine safetyFine) {
        this.safetyFine = safetyFine;
    }

    public BaseService getSafetyFineVoService() {
        return safetyFineVoService;
    }

    public void setSafetyFineVoService(BaseService safetyFineVoService) {
        this.safetyFineVoService = safetyFineVoService;
    }

    public SafetyFineVo getSafetyFineVo() {
        return safetyFineVo;
    }

    public void setSafetyFineVo(SafetyFineVo safetyFineVo) {
        this.safetyFineVo = safetyFineVo;
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

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Accident getAccident() {
        return accident;
    }

    public void setAccident(Accident accident) {
        this.accident = accident;
    }

    public BaseService getAccidentService() {
        return accidentService;
    }

    public void setAccidentService(BaseService accidentService) {
        this.accidentService = accidentService;
    }

    public AccParty getAccParty() {
        return accParty;
    }

    public void setAccParty(AccParty accParty) {
        this.accParty = accParty;
    }

    public BaseService getAccPartyService() {
        return accPartyService;
    }

    public void setAccPartyService(BaseService accPartyService) {
        this.accPartyService = accPartyService;
    }

    public FiveS getFiveS() {
        return fiveS;
    }

    public void setFiveS(FiveS fiveS) {
        this.fiveS = fiveS;
    }

    public BaseService getFiveSService() {
        return fiveSService;
    }

    public void setFiveSService(BaseService fiveSService) {
        this.fiveSService = fiveSService;
    }

    public FsArea getFsArea() {
        return fsArea;
    }

    public void setFsArea(FsArea fsArea) {
        this.fsArea = fsArea;
    }

    public BaseService getFsAreaService() {
        return fsAreaService;
    }

    public void setFsAreaService(BaseService fsAreaService) {
        this.fsAreaService = fsAreaService;
    }

    public FsCode getFsCode() {
        return fsCode;
    }

    public void setFsCode(FsCode fsCode) {
        this.fsCode = fsCode;
    }

    public BaseService getFsCodeService() {
        return fsCodeService;
    }

    public void setFsCodeService(BaseService fsCodeService) {
        this.fsCodeService = fsCodeService;
    }

    public PhCode getPhCode() {
        return phCode;
    }

    public void setPhCode(PhCode phCode) {
        this.phCode = phCode;
    }

    public BaseService getPhCodeService() {
        return phCodeService;
    }

    public void setPhCodeService(BaseService phCodeService) {
        this.phCodeService = phCodeService;
    }

    public PotentialHazard getPotentialHazard() {
        return potentialHazard;
    }

    public void setPotentialHazard(PotentialHazard potentialHazard) {
        this.potentialHazard = potentialHazard;
    }

    public BaseService getPotentialHazardService() {
        return potentialHazardService;
    }

    public void setPotentialHazardService(BaseService potentialHazardService) {
        this.potentialHazardService = potentialHazardService;
    }

    public ViolateRegulation getViolateRegulation() {
        return violateRegulation;
    }

    public void setViolateRegulation(ViolateRegulation violateRegulation) {
        this.violateRegulation = violateRegulation;
    }

    public BaseService getViolateRegulationService() {
        return violateRegulationService;
    }

    public void setViolateRegulationService(BaseService violateRegulationService) {
        this.violateRegulationService = violateRegulationService;
    }

    public VrCode getVrCode() {
        return vrCode;
    }

    public void setVrCode(VrCode vrCode) {
        this.vrCode = vrCode;
    }

    public BaseService getVrCodeService() {
        return vrCodeService;
    }

    public void setVrCodeService(BaseService vrCodeService) {
        this.vrCodeService = vrCodeService;
    }

    @Override
    public Page getModel() {
        if (page == null) {
            page = new Page();
        }
        return page;
    }

    private BaseService fsAreaDeptService;
    private FsAreaDept fsAreaDept;

    public BaseService getFsAreaDeptService() {
        return fsAreaDeptService;
    }

    public void setFsAreaDeptService(BaseService fsAreaDeptService) {
        this.fsAreaDeptService = fsAreaDeptService;
    }

    public FsAreaDept getFsAreaDept() {
        return fsAreaDept;
    }

    public void setFsAreaDept(FsAreaDept fsAreaDept) {
        this.fsAreaDept = fsAreaDept;
    }

    public String saveFsAreaDept() throws Exception {
        this.result.setObject(this.fsAreaDeptService.save(this.fsAreaDept));
        return SUCCESS;
    }

    public String deleteFsAreaDept() throws Exception {
        this.result.setObject(this.fsAreaDeptService.delete(this.fsAreaDept));
        return SUCCESS;
    }

    public String listFsAreaDept() throws Exception {
        this.result.setList(this.fsAreaDeptService.list(this.fsAreaDept));
        return SUCCESS;
    }

    public String listPageFsAreaDept() throws Exception {
        this.result.setObject(this.fsAreaDeptService.listPage(this.fsAreaDept, this.page));
        return SUCCESS;
    }

    public String uploadFsAreaDept() throws Exception {
        this.result.setObject(this.fsAreaDeptService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService phCodeTypeService;
    private PhCodeType phCodeType;

    public BaseService getPhCodeTypeService() {
        return phCodeTypeService;
    }

    public void setPhCodeTypeService(BaseService phCodeTypeService) {
        this.phCodeTypeService = phCodeTypeService;
    }

    public PhCodeType getPhCodeType() {
        return phCodeType;
    }

    public void setPhCodeType(PhCodeType phCodeType) {
        this.phCodeType = phCodeType;
    }

    public String savePhCodeType() throws Exception {
        this.result.setObject(this.phCodeTypeService.save(this.phCodeType));
        return SUCCESS;
    }

    public String deletePhCodeType() throws Exception {
        this.result.setObject(this.phCodeTypeService.delete(this.phCodeType));
        return SUCCESS;
    }

    public String listPhCodeType() throws Exception {
        this.result.setList(this.phCodeTypeService.list(this.phCodeType));
        return SUCCESS;
    }

    public String listPagePhCodeType() throws Exception {
        this.result.setObject(this.phCodeTypeService.listPage(this.phCodeType, this.page));
        return SUCCESS;
    }

    public String uploadPhCodeType() throws Exception {
        this.result.setObject(this.phCodeTypeService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    private BaseService vrCodeRiskLvlService;
    private VrCodeRiskLvl vrCodeRiskLvl;

    public BaseService getVrCodeRiskLvlService() {
        return vrCodeRiskLvlService;
    }

    public void setVrCodeRiskLvlService(BaseService vrCodeRiskLvlService) {
        this.vrCodeRiskLvlService = vrCodeRiskLvlService;
    }

    public VrCodeRiskLvl getVrCodeRiskLvl() {
        return vrCodeRiskLvl;
    }

    public void setVrCodeRiskLvl(VrCodeRiskLvl vrCodeRiskLvl) {
        this.vrCodeRiskLvl = vrCodeRiskLvl;
    }

    public String saveVrCodeRiskLvl() throws Exception {
        this.result.setObject(this.vrCodeRiskLvlService.save(this.vrCodeRiskLvl));
        return SUCCESS;
    }

    public String deleteVrCodeRiskLvl() throws Exception {
        this.result.setObject(this.vrCodeRiskLvlService.delete(this.vrCodeRiskLvl));
        return SUCCESS;
    }

    public String listVrCodeRiskLvl() throws Exception {
        this.result.setList(this.vrCodeRiskLvlService.list(this.vrCodeRiskLvl));
        return SUCCESS;
    }

    public String listPageVrCodeRiskLvl() throws Exception {
        this.result.setObject(this.vrCodeRiskLvlService.listPage(this.vrCodeRiskLvl, this.page));
        return SUCCESS;
    }

    public String uploadVrCodeRiskLvl() throws Exception {
        this.result.setObject(this.vrCodeRiskLvlService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }


    private PhDetailTypeService phDetailTypeService;
    private PhDetailType phDetailType;

    public PhDetailTypeService getPhDetailTypeService() { return phDetailTypeService; }

    public void setPhDetailTypeService(PhDetailTypeService phDetailTypeService) { this.phDetailTypeService = phDetailTypeService; }
    public PhDetailType getPhDetailType() { return phDetailType; }
    public void setPhDetailType(PhDetailType phDetailType) { this.phDetailType = phDetailType; }

    public String savePhDetailType() throws Exception {
        this.result.setObject(this.phDetailTypeService.save(this.phDetailType));
        return SUCCESS;
    }

    public String deletePhDetailType() throws Exception {
        this.result.setObject(this.phDetailTypeService.delete(this.phDetailType));
        return SUCCESS;
    }

    public String listPhDetailType() throws Exception {
        this.result.setList(this.phDetailTypeService.list(this.phDetailType));
        return SUCCESS;
    }

    public String listPagePhDetailType() throws Exception {
        this.result.setObject(this.phDetailTypeService.listPage(this.phDetailType, this.page));
        return SUCCESS;
    }

    public String uploadPhDetailType() throws Exception {
        this.result.setObject(this.phDetailTypeService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

}