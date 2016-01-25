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
import com.iflat.report.service.ReportManager;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatManager;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2015/11/12.
 */
public class ReportAction extends ActionSupport implements ResultAware {

    private Result result;
    private Parameter parameter;
    /* bi */
    private ReportManager rptProjectCostManager;
    private ReportManager rptMajorDevCstManager;
    private ReportManager rptMajorMatCstManager;
    private ReportManager rptMajorMatQtyManager;
    private ReportManager rptAdditionalBillManager;
    private ReportManager rptProjectCstCtrlManager;
    private ReportManager rptProjectInProcessInfoManager;
    private ReportManager rptDeptCstCtrlManager;
    private IflatManager rptProjectManager;
    private Project rptProject;
    /* cst.sb */
    private ReportManager detailOfMiscWo;
    private ReportManager estimateOfProject;
    private IflatManager rptSbProjectCostManager;
    private SbProjectCost sbProjectCost;
    private IflatManager rptSbProjectCostCmpsManager;
    private SbProjectCostCmps sbProjectCostCmps;
    private IflatManager rptSbProjectCostNodeManager;
    private SbProjectCostNode sbProjectCostNode;
    /* cst.nm */
    private IflatManager rptNmProjectCostManager;
    private NmProjectCost nmProjectCost;
    private IflatManager rptNmProjectCostCmpsManager;
    private NmProjectCostCmps nmProjectCostCmps;
    private IflatManager rptNmProjectCostNodeManager;
    private NmProjectCostNode nmProjectCostNode;
    /* cst.sr */
    private IflatManager rptSrProjectCostManager;
    private SrProjectCost srProjectCost;
    private IflatManager rptSrProjectCostCmpsManager;
    private SrProjectCostCmps srProjectCostCmps;
    private IflatManager rptSrProjectCostNodeManager;
    private SrProjectCostNode srProjectCostNode;
    /* mm */
    private IflatManager rptMmMatQuatoManager;
    private MatQuato matQuato;
    private IflatManager rptMmPaintMRPManager;
    private PaintMRP paintMRP;
    /* wip */
    private IflatManager rptWipManhourWoStatusManager;
    private WoStatus woStatus;

    /* bi */
    public String listProject() throws Exception {
        this.result.setList(this.rptProjectManager.list(this.rptProject));
        return SUCCESS;
    }

    public String listDeptCstCtrl() throws Exception {
        this.result.setList(this.rptDeptCstCtrlManager.query(this.parameter));
        return SUCCESS;
    }

    public String listProjectInProcess() throws Exception {
        this.result.setList(this.rptProjectInProcessInfoManager.query(this.parameter));
        return SUCCESS;
    }

    public String listProjectCstCtrl() throws Exception {
        this.result.setList(this.rptProjectCstCtrlManager.query(this.parameter));
        return SUCCESS;
    }

    public String listBalanceOfProjectCost() throws Exception {
        this.result.setList(this.rptProjectCostManager.query(this.parameter));
        return SUCCESS;
    }

    public String listProjectCost() throws Exception {
        this.result.setList(this.rptProjectCostManager.queryList(this.parameter));
        return SUCCESS;
    }

    public String listMajorDevCstBalance() throws Exception {
        this.result.setList(this.rptMajorDevCstManager.query(this.parameter));
        return SUCCESS;
    }

    public String listMajorMatCstBalance() throws Exception {
        this.result.setList(this.rptMajorMatCstManager.query(this.parameter));
        return SUCCESS;
    }

    public String listMajorMatQtyBalance() throws Exception {
        this.result.setList(this.rptMajorMatQtyManager.query(this.parameter));
        return SUCCESS;
    }

    public String listAdditionalBill() throws Exception {
        this.result.setList(this.rptAdditionalBillManager.query(this.parameter));
        return SUCCESS;
    }

    /* cst.sb */
    public String listSbProjectCostCmps() throws Exception {
        this.result.setList(this.rptSbProjectCostCmpsManager.list(this.sbProjectCostCmps));
        return SUCCESS;
    }

    public String listSbProjectCost() throws Exception {
        this.result.setList(this.rptSbProjectCostManager.list(this.sbProjectCost));
        return SUCCESS;
    }

    public String listSbProjectCostNode() throws Exception {
        this.result.setList(this.rptSbProjectCostNodeManager.list(this.sbProjectCostNode));
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
        this.result.setList(this.rptNmProjectCostCmpsManager.list(this.nmProjectCostCmps));
        return SUCCESS;
    }

    public String listNmProjectCost() throws Exception {
        this.result.setList(this.rptNmProjectCostManager.list(this.nmProjectCost));
        return SUCCESS;
    }

    public String listNmProjectCostNode() throws Exception {
        this.result.setList(this.rptNmProjectCostNodeManager.list(this.nmProjectCostNode));
        return SUCCESS;
    }

    /* cst.sr */
    public String listSrProjectCostCmps() throws Exception {
        this.result.setList(this.rptSrProjectCostCmpsManager.list(this.srProjectCostCmps));
        return SUCCESS;
    }

    public String listSrProjectCost() throws Exception {
        this.result.setList(this.rptSrProjectCostManager.list(this.srProjectCost));
        return SUCCESS;
    }

    public String listSrProjectCostNode() throws Exception {
        this.result.setList(this.rptSrProjectCostNodeManager.list(this.srProjectCostNode));
        return SUCCESS;
    }

    /* mm */
    public String listMatQuato() throws Exception {
        this.result.setList(this.rptMmMatQuatoManager.list(this.matQuato));
        return SUCCESS;
    }

    public String listPaintMRP() throws Exception {
        this.result.setList(this.rptMmPaintMRPManager.list(this.paintMRP));
        return SUCCESS;
    }

    /* wip */
    public String listWoStatus() throws Exception {
        this.result.setList(this.rptWipManhourWoStatusManager.list(this.woStatus));
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

    public ReportManager getDetailOfMiscWo() {
        return detailOfMiscWo;
    }

    public void setDetailOfMiscWo(ReportManager detailOfMiscWo) {
        this.detailOfMiscWo = detailOfMiscWo;
    }

    public ReportManager getEstimateOfProject() {
        return estimateOfProject;
    }

    public void setEstimateOfProject(ReportManager estimateOfProject) {
        this.estimateOfProject = estimateOfProject;
    }

    public ReportManager getRptProjectCostManager() {
        return rptProjectCostManager;
    }

    public void setRptProjectCostManager(ReportManager rptProjectCostManager) {
        this.rptProjectCostManager = rptProjectCostManager;
    }

    public ReportManager getRptMajorDevCstManager() {
        return rptMajorDevCstManager;
    }

    public void setRptMajorDevCstManager(ReportManager rptMajorDevCstManager) {
        this.rptMajorDevCstManager = rptMajorDevCstManager;
    }

    public ReportManager getRptMajorMatCstManager() {
        return rptMajorMatCstManager;
    }

    public void setRptMajorMatCstManager(ReportManager rptMajorMatCstManager) {
        this.rptMajorMatCstManager = rptMajorMatCstManager;
    }

    public ReportManager getRptMajorMatQtyManager() {
        return rptMajorMatQtyManager;
    }

    public void setRptMajorMatQtyManager(ReportManager rptMajorMatQtyManager) {
        this.rptMajorMatQtyManager = rptMajorMatQtyManager;
    }

    public ReportManager getRptAdditionalBillManager() {
        return rptAdditionalBillManager;
    }

    public void setRptAdditionalBillManager(ReportManager rptAdditionalBillManager) {
        this.rptAdditionalBillManager = rptAdditionalBillManager;
    }

    public ReportManager getRptProjectCstCtrlManager() {
        return rptProjectCstCtrlManager;
    }

    public void setRptProjectCstCtrlManager(ReportManager rptProjectCstCtrlManager) {
        this.rptProjectCstCtrlManager = rptProjectCstCtrlManager;
    }

    public ReportManager getRptProjectInProcessInfoManager() {
        return rptProjectInProcessInfoManager;
    }

    public void setRptProjectInProcessInfoManager(ReportManager rptProjectInProcessInfoManager) {
        this.rptProjectInProcessInfoManager = rptProjectInProcessInfoManager;
    }

    public ReportManager getRptDeptCstCtrlManager() {
        return rptDeptCstCtrlManager;
    }

    public void setRptDeptCstCtrlManager(ReportManager rptDeptCstCtrlManager) {
        this.rptDeptCstCtrlManager = rptDeptCstCtrlManager;
    }

    public IflatManager getRptMmMatQuatoManager() {
        return rptMmMatQuatoManager;
    }

    public void setRptMmMatQuatoManager(IflatManager rptMmMatQuatoManager) {
        this.rptMmMatQuatoManager = rptMmMatQuatoManager;
    }

    public MatQuato getMatQuato() {
        return matQuato;
    }

    public void setMatQuato(MatQuato matQuato) {
        this.matQuato = matQuato;
    }

    public IflatManager getRptProjectManager() {
        return rptProjectManager;
    }

    public void setRptProjectManager(IflatManager rptProjectManager) {
        this.rptProjectManager = rptProjectManager;
    }

    public Project getRptProject() {
        return rptProject;
    }

    public void setRptProject(Project rptProject) {
        this.rptProject = rptProject;
    }

    public IflatManager getRptSbProjectCostManager() {
        return rptSbProjectCostManager;
    }

    public void setRptSbProjectCostManager(IflatManager rptSbProjectCostManager) {
        this.rptSbProjectCostManager = rptSbProjectCostManager;
    }

    public SbProjectCost getSbProjectCost() {
        return sbProjectCost;
    }

    public void setSbProjectCost(SbProjectCost sbProjectCost) {
        this.sbProjectCost = sbProjectCost;
    }

    public IflatManager getRptSbProjectCostNodeManager() {
        return rptSbProjectCostNodeManager;
    }

    public void setRptSbProjectCostNodeManager(IflatManager rptSbProjectCostNodeManager) {
        this.rptSbProjectCostNodeManager = rptSbProjectCostNodeManager;
    }

    public SbProjectCostNode getSbProjectCostNode() {
        return sbProjectCostNode;
    }

    public void setSbProjectCostNode(SbProjectCostNode sbProjectCostNode) {
        this.sbProjectCostNode = sbProjectCostNode;
    }

    public IflatManager getRptSbProjectCostCmpsManager() {
        return rptSbProjectCostCmpsManager;
    }

    public void setRptSbProjectCostCmpsManager(IflatManager rptSbProjectCostCmpsManager) {
        this.rptSbProjectCostCmpsManager = rptSbProjectCostCmpsManager;
    }

    public SbProjectCostCmps getSbProjectCostCmps() {
        return sbProjectCostCmps;
    }

    public void setSbProjectCostCmps(SbProjectCostCmps sbProjectCostCmps) {
        this.sbProjectCostCmps = sbProjectCostCmps;
    }

    public IflatManager getRptWipManhourWoStatusManager() {
        return rptWipManhourWoStatusManager;
    }

    public void setRptWipManhourWoStatusManager(IflatManager rptWipManhourWoStatusManager) {
        this.rptWipManhourWoStatusManager = rptWipManhourWoStatusManager;
    }

    public WoStatus getWoStatus() {
        return woStatus;
    }

    public void setWoStatus(WoStatus woStatus) {
        this.woStatus = woStatus;
    }

    public IflatManager getRptNmProjectCostManager() {
        return rptNmProjectCostManager;
    }

    public void setRptNmProjectCostManager(IflatManager rptNmProjectCostManager) {
        this.rptNmProjectCostManager = rptNmProjectCostManager;
    }

    public NmProjectCost getNmProjectCost() {
        return nmProjectCost;
    }

    public void setNmProjectCost(NmProjectCost nmProjectCost) {
        this.nmProjectCost = nmProjectCost;
    }

    public IflatManager getRptNmProjectCostCmpsManager() {
        return rptNmProjectCostCmpsManager;
    }

    public void setRptNmProjectCostCmpsManager(IflatManager rptNmProjectCostCmpsManager) {
        this.rptNmProjectCostCmpsManager = rptNmProjectCostCmpsManager;
    }

    public NmProjectCostCmps getNmProjectCostCmps() {
        return nmProjectCostCmps;
    }

    public void setNmProjectCostCmps(NmProjectCostCmps nmProjectCostCmps) {
        this.nmProjectCostCmps = nmProjectCostCmps;
    }

    public IflatManager getRptNmProjectCostNodeManager() {
        return rptNmProjectCostNodeManager;
    }

    public void setRptNmProjectCostNodeManager(IflatManager rptNmProjectCostNodeManager) {
        this.rptNmProjectCostNodeManager = rptNmProjectCostNodeManager;
    }

    public NmProjectCostNode getNmProjectCostNode() {
        return nmProjectCostNode;
    }

    public void setNmProjectCostNode(NmProjectCostNode nmProjectCostNode) {
        this.nmProjectCostNode = nmProjectCostNode;
    }

    public IflatManager getRptSrProjectCostManager() {
        return rptSrProjectCostManager;
    }

    public void setRptSrProjectCostManager(IflatManager rptSrProjectCostManager) {
        this.rptSrProjectCostManager = rptSrProjectCostManager;
    }

    public SrProjectCost getSrProjectCost() {
        return srProjectCost;
    }

    public void setSrProjectCost(SrProjectCost srProjectCost) {
        this.srProjectCost = srProjectCost;
    }

    public IflatManager getRptSrProjectCostCmpsManager() {
        return rptSrProjectCostCmpsManager;
    }

    public void setRptSrProjectCostCmpsManager(IflatManager rptSrProjectCostCmpsManager) {
        this.rptSrProjectCostCmpsManager = rptSrProjectCostCmpsManager;
    }

    public SrProjectCostCmps getSrProjectCostCmps() {
        return srProjectCostCmps;
    }

    public void setSrProjectCostCmps(SrProjectCostCmps srProjectCostCmps) {
        this.srProjectCostCmps = srProjectCostCmps;
    }

    public IflatManager getRptSrProjectCostNodeManager() {
        return rptSrProjectCostNodeManager;
    }

    public void setRptSrProjectCostNodeManager(IflatManager rptSrProjectCostNodeManager) {
        this.rptSrProjectCostNodeManager = rptSrProjectCostNodeManager;
    }

    public SrProjectCostNode getSrProjectCostNode() {
        return srProjectCostNode;
    }

    public void setSrProjectCostNode(SrProjectCostNode srProjectCostNode) {
        this.srProjectCostNode = srProjectCostNode;
    }

    public IflatManager getRptMmPaintMRPManager() {
        return rptMmPaintMRPManager;
    }

    public void setRptMmPaintMRPManager(IflatManager rptMmPaintMRPManager) {
        this.rptMmPaintMRPManager = rptMmPaintMRPManager;
    }

    public PaintMRP getPaintMRP() {
        return paintMRP;
    }

    public void setPaintMRP(PaintMRP paintMRP) {
        this.paintMRP = paintMRP;
    }
}
