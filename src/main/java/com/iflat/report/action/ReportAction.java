package com.iflat.report.action;

import com.iflat.report.bean.bi.Project;
import com.iflat.report.bean.cst.nm.NmProjectCost;
import com.iflat.report.bean.cst.nm.NmProjectCostCmps;
import com.iflat.report.bean.cst.nm.NmProjectCostNode;
import com.iflat.report.bean.cst.sb.SbProjectCost;
import com.iflat.report.bean.cst.sb.SbProjectCostCmps;
import com.iflat.report.bean.cst.sb.SbProjectCostNode;
import com.iflat.report.bean.cst.sr.SrProjectCost;
import com.iflat.report.bean.cst.sr.SrProjectCostCmps;
import com.iflat.report.bean.cst.sr.SrProjectCostNode;
import com.iflat.report.bean.mm.MatQuato;
import com.iflat.report.bean.mm.PaintMRP;
import com.iflat.report.bean.wip.manhour.WoStatus;
import com.iflat.report.entity.Parameter;
import com.iflat.report.service.ReportService;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatService;
import com.opensymphony.xwork2.ActionSupport;

import java.util.List;

/**
 * Created by tyriv on 2015/11/12.
 */
public class ReportAction extends ActionSupport implements ResultAware {

    private Result result;
    private Parameter parameter;
    /* bi */
    private ReportService rptProjectCostService;
    private ReportService rptMajorDevCstService;
    private ReportService rptMajorMatCstService;
    private ReportService rptMajorMatQtyService;
    private ReportService rptAdditionalBillService;
    private ReportService rptProjectCstCtrlService;
    private ReportService rptProjectInProcessInfoService;
    private ReportService rptDeptCstCtrlService;
    private IflatService rptProjectService;
    private Project rptProject;
    private IflatService rptCostItemService;
    private List costItemList;
    /* cst.sb */
    private ReportService detailOfMiscWo;
    private ReportService estimateOfProject;
    private IflatService rptSbProjectCostService;
    private SbProjectCost sbProjectCost;
    private IflatService rptSbProjectCostCmpsService;
    private SbProjectCostCmps sbProjectCostCmps;
    private IflatService rptSbProjectCostNodeService;
    private SbProjectCostNode sbProjectCostNode;
    /* cst.nm */
    private IflatService rptNmProjectCostService;
    private NmProjectCost nmProjectCost;
    private IflatService rptNmProjectCostCmpsService;
    private NmProjectCostCmps nmProjectCostCmps;
    private IflatService rptNmProjectCostNodeService;
    private NmProjectCostNode nmProjectCostNode;
    /* cst.sr */
    private IflatService rptSrProjectCostService;
    private SrProjectCost srProjectCost;
    private IflatService rptSrProjectCostCmpsService;
    private SrProjectCostCmps srProjectCostCmps;
    private IflatService rptSrProjectCostNodeService;
    private SrProjectCostNode srProjectCostNode;
    /* mm */
    private IflatService rptMmMatQuatoService;
    private MatQuato matQuato;
    private IflatService rptMmPaintMRPService;
    private PaintMRP paintMRP;
    /* wip */
    private IflatService rptWipManhourWoStatusService;
    private WoStatus woStatus;

    /* bi */
    public String listProject() throws Exception {
        this.result.setList(this.rptProjectService.list(this.rptProject));
        return SUCCESS;
    }

    public String listDeptCstCtrl() throws Exception {
        this.result.setList(this.rptDeptCstCtrlService.query(this.parameter));
        return SUCCESS;
    }

    public String listProjectInProcess() throws Exception {
        this.result.setList(this.rptProjectInProcessInfoService.query(this.parameter));
        return SUCCESS;
    }

    public String listProjectCstCtrl() throws Exception {
        this.result.setList(this.rptProjectCstCtrlService.query(this.parameter));
        return SUCCESS;
    }

    public String listBalanceOfProjectCost() throws Exception {
        this.result.setList(this.rptProjectCostService.query(this.parameter));
        return SUCCESS;
    }

    public String listProjectCost() throws Exception {
        this.result.setList(this.rptProjectCostService.queryList(this.parameter));
        return SUCCESS;
    }

    public String listMajorDevCstBalance() throws Exception {
        this.result.setList(this.rptMajorDevCstService.query(this.parameter));
        return SUCCESS;
    }

    public String listMajorMatCstBalance() throws Exception {
        this.result.setList(this.rptMajorMatCstService.query(this.parameter));
        return SUCCESS;
    }

    public String listMajorMatQtyBalance() throws Exception {
        this.result.setList(this.rptMajorMatQtyService.query(this.parameter));
        return SUCCESS;
    }

    public String listAdditionalBill() throws Exception {
        this.result.setList(this.rptAdditionalBillService.query(this.parameter));
        return SUCCESS;
    }

    public String listBatchCostItem() throws Exception {
        this.result.setList(this.rptCostItemService.listBatch(this.costItemList));
        return SUCCESS;
    }

    /* cst.sb */
    public String listSbProjectCostCmps() throws Exception {
        this.result.setList(this.rptSbProjectCostCmpsService.list(this.sbProjectCostCmps));
        return SUCCESS;
    }

    public String listSbProjectCost() throws Exception {
        this.result.setList(this.rptSbProjectCostService.list(this.sbProjectCost));
        return SUCCESS;
    }

    public String listSbProjectCostNode() throws Exception {
        this.result.setList(this.rptSbProjectCostNodeService.list(this.sbProjectCostNode));
        return SUCCESS;
    }

    public String estimateOfProjectBar() throws Exception {
        this.result.setList(this.estimateOfProject.queryBar(this.parameter));
        return SUCCESS;
    }
    public String estimateOfProjectPie() throws Exception {
        this.result.setList(this.estimateOfProject.queryPie(this.parameter));
        return SUCCESS;
    }

    /* cst.nm */
    public String listNmProjectCostCmps() throws Exception {
        this.result.setList(this.rptNmProjectCostCmpsService.list(this.nmProjectCostCmps));
        return SUCCESS;
    }

    public String listNmProjectCost() throws Exception {
        this.result.setList(this.rptNmProjectCostService.list(this.nmProjectCost));
        return SUCCESS;
    }

    public String listNmProjectCostNode() throws Exception {
        this.result.setList(this.rptNmProjectCostNodeService.list(this.nmProjectCostNode));
        return SUCCESS;
    }

    /* cst.sr */
    public String listSrProjectCostCmps() throws Exception {
        this.result.setList(this.rptSrProjectCostCmpsService.list(this.srProjectCostCmps));
        return SUCCESS;
    }

    public String listSrProjectCost() throws Exception {
        this.result.setList(this.rptSrProjectCostService.list(this.srProjectCost));
        return SUCCESS;
    }

    public String listSrProjectCostNode() throws Exception {
        this.result.setList(this.rptSrProjectCostNodeService.list(this.srProjectCostNode));
        return SUCCESS;
    }

    /* mm */
    public String listMatQuato() throws Exception {
        this.result.setList(this.rptMmMatQuatoService.list(this.matQuato));
        return SUCCESS;
    }

    public String listPaintMRP() throws Exception {
        this.result.setList(this.rptMmPaintMRPService.list(this.paintMRP));
        return SUCCESS;
    }

    /* wip */
    public String listWoStatus() throws Exception {
        this.result.setList(this.rptWipManhourWoStatusService.list(this.woStatus));
        return SUCCESS;
    }

    public String detailOfMiscWo() throws Exception {
        this.result.setList(this.detailOfMiscWo.queryList(this.parameter));
        return SUCCESS;
    }

    public Result getResult() {
        return result;
    }

    @Override
    public void setResult(Result result) {
        this.result = result;
    }

    public Parameter getParameter() {
        return parameter;
    }

    public void setParameter(Parameter parameter) {
        this.parameter = parameter;
    }

    public ReportService getDetailOfMiscWo() {
        return detailOfMiscWo;
    }

    public void setDetailOfMiscWo(ReportService detailOfMiscWo) {
        this.detailOfMiscWo = detailOfMiscWo;
    }

    public ReportService getEstimateOfProject() {
        return estimateOfProject;
    }

    public void setEstimateOfProject(ReportService estimateOfProject) {
        this.estimateOfProject = estimateOfProject;
    }

    public ReportService getRptProjectCostService() {
        return rptProjectCostService;
    }

    public void setRptProjectCostService(ReportService rptProjectCostService) {
        this.rptProjectCostService = rptProjectCostService;
    }

    public ReportService getRptMajorDevCstService() {
        return rptMajorDevCstService;
    }

    public void setRptMajorDevCstService(ReportService rptMajorDevCstService) {
        this.rptMajorDevCstService = rptMajorDevCstService;
    }

    public ReportService getRptMajorMatCstService() {
        return rptMajorMatCstService;
    }

    public void setRptMajorMatCstService(ReportService rptMajorMatCstService) {
        this.rptMajorMatCstService = rptMajorMatCstService;
    }

    public ReportService getRptMajorMatQtyService() {
        return rptMajorMatQtyService;
    }

    public void setRptMajorMatQtyService(ReportService rptMajorMatQtyService) {
        this.rptMajorMatQtyService = rptMajorMatQtyService;
    }

    public ReportService getRptAdditionalBillService() {
        return rptAdditionalBillService;
    }

    public void setRptAdditionalBillService(ReportService rptAdditionalBillService) {
        this.rptAdditionalBillService = rptAdditionalBillService;
    }

    public ReportService getRptProjectCstCtrlService() {
        return rptProjectCstCtrlService;
    }

    public void setRptProjectCstCtrlService(ReportService rptProjectCstCtrlService) {
        this.rptProjectCstCtrlService = rptProjectCstCtrlService;
    }

    public ReportService getRptProjectInProcessInfoService() {
        return rptProjectInProcessInfoService;
    }

    public void setRptProjectInProcessInfoService(ReportService rptProjectInProcessInfoService) {
        this.rptProjectInProcessInfoService = rptProjectInProcessInfoService;
    }

    public ReportService getRptDeptCstCtrlService() {
        return rptDeptCstCtrlService;
    }

    public void setRptDeptCstCtrlService(ReportService rptDeptCstCtrlService) {
        this.rptDeptCstCtrlService = rptDeptCstCtrlService;
    }

    public IflatService getRptMmMatQuatoService() {
        return rptMmMatQuatoService;
    }

    public void setRptMmMatQuatoService(IflatService rptMmMatQuatoService) {
        this.rptMmMatQuatoService = rptMmMatQuatoService;
    }

    public MatQuato getMatQuato() {
        return matQuato;
    }

    public void setMatQuato(MatQuato matQuato) {
        this.matQuato = matQuato;
    }

    public IflatService getRptProjectService() {
        return rptProjectService;
    }

    public void setRptProjectService(IflatService rptProjectService) {
        this.rptProjectService = rptProjectService;
    }

    public Project getRptProject() {
        return rptProject;
    }

    public void setRptProject(Project rptProject) {
        this.rptProject = rptProject;
    }

    public IflatService getRptSbProjectCostService() {
        return rptSbProjectCostService;
    }

    public void setRptSbProjectCostService(IflatService rptSbProjectCostService) {
        this.rptSbProjectCostService = rptSbProjectCostService;
    }

    public SbProjectCost getSbProjectCost() {
        return sbProjectCost;
    }

    public void setSbProjectCost(SbProjectCost sbProjectCost) {
        this.sbProjectCost = sbProjectCost;
    }

    public IflatService getRptSbProjectCostNodeService() {
        return rptSbProjectCostNodeService;
    }

    public void setRptSbProjectCostNodeService(IflatService rptSbProjectCostNodeService) {
        this.rptSbProjectCostNodeService = rptSbProjectCostNodeService;
    }

    public SbProjectCostNode getSbProjectCostNode() {
        return sbProjectCostNode;
    }

    public void setSbProjectCostNode(SbProjectCostNode sbProjectCostNode) {
        this.sbProjectCostNode = sbProjectCostNode;
    }

    public IflatService getRptSbProjectCostCmpsService() {
        return rptSbProjectCostCmpsService;
    }

    public void setRptSbProjectCostCmpsService(IflatService rptSbProjectCostCmpsService) {
        this.rptSbProjectCostCmpsService = rptSbProjectCostCmpsService;
    }

    public SbProjectCostCmps getSbProjectCostCmps() {
        return sbProjectCostCmps;
    }

    public void setSbProjectCostCmps(SbProjectCostCmps sbProjectCostCmps) {
        this.sbProjectCostCmps = sbProjectCostCmps;
    }

    public IflatService getRptWipManhourWoStatusService() {
        return rptWipManhourWoStatusService;
    }

    public void setRptWipManhourWoStatusService(IflatService rptWipManhourWoStatusService) {
        this.rptWipManhourWoStatusService = rptWipManhourWoStatusService;
    }

    public WoStatus getWoStatus() {
        return woStatus;
    }

    public void setWoStatus(WoStatus woStatus) {
        this.woStatus = woStatus;
    }

    public IflatService getRptNmProjectCostService() {
        return rptNmProjectCostService;
    }

    public void setRptNmProjectCostService(IflatService rptNmProjectCostService) {
        this.rptNmProjectCostService = rptNmProjectCostService;
    }

    public NmProjectCost getNmProjectCost() {
        return nmProjectCost;
    }

    public void setNmProjectCost(NmProjectCost nmProjectCost) {
        this.nmProjectCost = nmProjectCost;
    }

    public IflatService getRptNmProjectCostCmpsService() {
        return rptNmProjectCostCmpsService;
    }

    public void setRptNmProjectCostCmpsService(IflatService rptNmProjectCostCmpsService) {
        this.rptNmProjectCostCmpsService = rptNmProjectCostCmpsService;
    }

    public NmProjectCostCmps getNmProjectCostCmps() {
        return nmProjectCostCmps;
    }

    public void setNmProjectCostCmps(NmProjectCostCmps nmProjectCostCmps) {
        this.nmProjectCostCmps = nmProjectCostCmps;
    }

    public IflatService getRptNmProjectCostNodeService() {
        return rptNmProjectCostNodeService;
    }

    public void setRptNmProjectCostNodeService(IflatService rptNmProjectCostNodeService) {
        this.rptNmProjectCostNodeService = rptNmProjectCostNodeService;
    }

    public NmProjectCostNode getNmProjectCostNode() {
        return nmProjectCostNode;
    }

    public void setNmProjectCostNode(NmProjectCostNode nmProjectCostNode) {
        this.nmProjectCostNode = nmProjectCostNode;
    }

    public IflatService getRptSrProjectCostService() {
        return rptSrProjectCostService;
    }

    public void setRptSrProjectCostService(IflatService rptSrProjectCostService) {
        this.rptSrProjectCostService = rptSrProjectCostService;
    }

    public SrProjectCost getSrProjectCost() {
        return srProjectCost;
    }

    public void setSrProjectCost(SrProjectCost srProjectCost) {
        this.srProjectCost = srProjectCost;
    }

    public IflatService getRptSrProjectCostCmpsService() {
        return rptSrProjectCostCmpsService;
    }

    public void setRptSrProjectCostCmpsService(IflatService rptSrProjectCostCmpsService) {
        this.rptSrProjectCostCmpsService = rptSrProjectCostCmpsService;
    }

    public SrProjectCostCmps getSrProjectCostCmps() {
        return srProjectCostCmps;
    }

    public void setSrProjectCostCmps(SrProjectCostCmps srProjectCostCmps) {
        this.srProjectCostCmps = srProjectCostCmps;
    }

    public IflatService getRptSrProjectCostNodeService() {
        return rptSrProjectCostNodeService;
    }

    public void setRptSrProjectCostNodeService(IflatService rptSrProjectCostNodeService) {
        this.rptSrProjectCostNodeService = rptSrProjectCostNodeService;
    }

    public SrProjectCostNode getSrProjectCostNode() {
        return srProjectCostNode;
    }

    public void setSrProjectCostNode(SrProjectCostNode srProjectCostNode) {
        this.srProjectCostNode = srProjectCostNode;
    }

    public IflatService getRptMmPaintMRPService() {
        return rptMmPaintMRPService;
    }

    public void setRptMmPaintMRPService(IflatService rptMmPaintMRPService) {
        this.rptMmPaintMRPService = rptMmPaintMRPService;
    }

    public PaintMRP getPaintMRP() {
        return paintMRP;
    }

    public void setPaintMRP(PaintMRP paintMRP) {
        this.paintMRP = paintMRP;
    }

    public IflatService getRptCostItemService() {
        return rptCostItemService;
    }

    public void setRptCostItemService(IflatService rptCostItemService) {
        this.rptCostItemService = rptCostItemService;
    }

    public List getCostItemList() {
        return costItemList;
    }

    public void setCostItemList(List costItemList) {
        this.costItemList = costItemList;
    }
}
