package com.iflat.system.action.impl;

import com.iflat.system.action.ResultAware;
import com.iflat.system.bean.*;
import com.iflat.system.entity.*;
import com.iflat.system.service.*;
import com.iflat.util.FileHelper;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ActionSupport;

import java.io.File;
import java.util.UUID;

/**
 * Created by tyriv on 2015/9/6.
 */
public class SystemAction extends ActionSupport implements ResultAware {

    private final static String TREE = "tree";
    //结果集
    private Result result;
    //模块管理
    private Module module;
    private ModuleManager moduleManager;
    //组织管理
    private Organization organization;
    private OrganizationManager organizationManager;
    //用户管理
    private User user;
    private UserManager userManager;
    private String orgId;
    private PasswordChange passwordChange;
    //角色管理
    private Role role;
    private RoleManager roleManager;
    //用户角色关系
    private UserRole userRole;
    private UserRoleManager userRoleManager;
    private String itemselector;
    //权限管理
    private AuthModuleManager authModuleManager;
    private AuthModule authModule;
    private String authModuleVoList;
    private AuthDuplicateVo authDuplicateVo;
    private String authBatchList;
    //操作权限
    private AuthOperatingManager authOperatingManager;
    private AuthOperatingVo authOperatingVo;
    private String authOperatingVoList;
    //数据权限
    private AuthDataManager authDataManager;
    private AuthData authData;
    //数据字典
    private DataDictionaryManager dataDictionaryManager;
    private DataDictionary dataDictionary;
    //模块表/视图
    private TableViewManager tableViewManager;
    private TableView tableView;
    //模块操作
    private Operating operating;
    private OperatingManager operatingManager;
    //速记本
    private Memo memo;
    private MemoManager memoManager;
    //问题处理
    private Question question;
    private QuestionManager questionManager;
    /* 文件上传 */
    private File upload;
    private String uploadContentType;
    private String uploadFileName;

    /**
     * 问题处理
     */
    public String uploadAnsAttachment() throws Exception {

        this.result.setObject(FileHelper.upload(this.upload, this.uploadFileName, "question"));
        return SUCCESS;
    }

    public String uploadQuAttachment() throws Exception {

        this.result.setObject(FileHelper.upload(this.upload, this.uploadFileName, "question"));
        return SUCCESS;
    }

    public String submitQuestion() throws Exception {
        this.result.setObject(this.questionManager.save(this.question));
        return SUCCESS;
    }

    public String modifyQuestion() throws Exception {
        this.result.setObject(this.questionManager.save(this.question));
        return SUCCESS;
    }

    public String deleteQuestion() throws Exception {
        this.result.setObject(this.questionManager.delete(this.question.getQuId()));
        return SUCCESS;
    }

    public String solveQuestion() throws Exception {
        this.result.setObject(this.questionManager.solve(this.question));
        return SUCCESS;
    }

    public String listQuestion() throws Exception {
        this.result.setList(this.questionManager.list(this.question));
        return SUCCESS;
    }


    /**
     * 数据权限
     */
    public String saveAuthData() throws Exception {
        this.result.setObject(this.authDataManager.save(this.authData));
        return SUCCESS;
    }

    public String listTableViewByModule() throws Exception {
        this.result.setList(this.tableViewManager.listByModule(this.tableView));
        return SUCCESS;
    }

    /**
     * 数据字典
     */
    public String listFieldAuthority() throws Exception {
        this.result.setList(this.authDataManager.listAuthDataFieldStatus(this.authData));
        return SUCCESS;
    }

    public String generateDataDictionary() throws Exception {
        this.dataDictionaryManager.generateDataDictionary();
        return SUCCESS;
    }

    public String listDataDictionary() throws Exception {
        this.result.setList(this.dataDictionaryManager.list(this.dataDictionary));
        return SUCCESS;
    }

    public String saveDataDictionary() throws Exception {
        this.result.setObject(this.dataDictionaryManager.save(this.dataDictionary));
        return SUCCESS;
    }

    /**
     * 操作权限
     */
    public String listAuthOperatingVoByAuthOperatingVo() throws Exception {

        this.result.setList(this.authOperatingManager.listVoByAuthOperatingVo(this.authOperatingVo));
        return SUCCESS;
    }

    public String saveBatchAuthOperating() throws Exception {

        this.result.setObject(this.authOperatingManager.saveBatch(this.authOperatingVoList));
        return SUCCESS;
    }

    /**
     * 模块权限
     */
    public String duplicateAuthority() throws Exception {
        this.result.setObject(this.authModuleManager.duplicateAuthority(this.authBatchList));
        return SUCCESS;
    }

    public String clearAuthority() throws Exception {
        this.result.setObject(this.authModuleManager.clearAuthority(this.authBatchList));
        return SUCCESS;
    }

    public String saveBatchAuthModule() throws Exception {

        this.result.setObject(this.authModuleManager.saveBatch(this.authModuleVoList));
        return SUCCESS;
    }

    public String saveAuthModule() throws Exception {

        this.result.setObject(this.authModuleManager.save(this.authModule));
        return SUCCESS;
    }

    public String listAuthModule() throws Exception {

        this.result.setList(this.authModuleManager.list(this.authModule));
        return SUCCESS;
    }

    public String listUserRoleNode() throws Exception {

        this.result.setList(this.userRoleManager.listNode());
        return SUCCESS;
    }
    /**
     * 用户-角色关系管理
     */
    public String listUserRoleInfoByUser() throws Exception {

        this.result.setList(this.userRoleManager.listVoByUser());
        return SUCCESS;
    }

    public String listDefaultRoleInfoByAccount() throws Exception {

        this.result.setList(this.userRoleManager.listVoByAccount());
        return SUCCESS;
    }

    public String listUserRoleAsString() throws Exception {

        this.result.setObject(this.userRoleManager.listAsString(this.userRole));
        return SUCCESS;
    }

    public String saveUserRole() throws Exception {

        this.userRole.setAccount(this.user.getAccount());
        this.userRole.setRoleId(this.role.getRoleId());
        this.result.setObject(this.userRoleManager.saveUserRole(this.userRole, itemselector));
        return SUCCESS;
    }

    /**
     * 角色管理
     */
    public String listRole() throws Exception {

        this.result.setList(this.roleManager.list());
        return SUCCESS;
    }

    public String saveRole() throws Exception {

        this.result.setObject(this.roleManager.save(this.role));
        return SUCCESS;
    }

    public String activeRole() throws Exception {

        this.result.setObject(this.roleManager.save(this.role));
        return SUCCESS;
    }

    public String deleteRole() throws Exception {

        this.result.setObject(this.roleManager.delete(this.role.getRoleId()));
        return SUCCESS;
    }

    /**
     * 用户管理
     */
    public String listUserByOrg() throws Exception {

        this.result.setList(this.userManager.listByOrgId(this.orgId));
        return SUCCESS;
    }

    public String saveUser() throws Exception {
        this.result.setObject(this.userManager.save(this.user));
        return SUCCESS;
    }

    public String activeUser() throws Exception {
        this.result.setObject(this.userManager.save(this.user));
        return SUCCESS;
    }

    public String editUserInfo() throws Exception {
        this.result.setObject(this.userManager.save(this.user));
        return SUCCESS;
    }

    public String resetPassword() throws Exception {
        this.result.setObject(this.userManager.save(this.user));
        return SUCCESS;
    }

    public String deleteUser() throws Exception {
        this.result.setObject(this.userManager.deleteByAccount(this.user.getAccount()));
        return SUCCESS;
    }

    /**
     * 组织管理
     */
    public String listOrganizationVo() throws Exception {

        this.result.setList(this.organizationManager.listVo());
        return SUCCESS;
    }

    public String listOrganization() throws Exception {

        this.result.setList(this.organizationManager.list());
        return SUCCESS;
    }

    public String saveOrganization() throws Exception {

        this.result.setObject(this.organizationManager.save(this.organization));
        return SUCCESS;
    }

    public String activeOrganization() throws Exception {

        this.result.setObject(this.organizationManager.save(this.organization));
        return SUCCESS;
    }

    public String deleteOrganization() throws Exception {

        this.result.setObject(this.organizationManager.delete(this.organization.getOrgId()));
        return SUCCESS;
    }

    public String listOrganizationNode() throws Exception {

        this.result.setList(this.organizationManager.listNode());
        return SUCCESS;
    }

    /**
     * 模块管理
     */
    public String saveOperating() throws Exception {
        this.result.setObject(this.operatingManager.save(this.operating));
        return SUCCESS;
    }

    public String deleteOperating() throws Exception {
        this.result.setObject(this.operatingManager.delete(this.operating));
        return SUCCESS;
    }

    public String listOperatingOfModule() throws Exception {
        this.result.setList(this.operatingManager.listOfModule(this.operating));
        return SUCCESS;
    }

    public String deleteTableView() throws Exception {

        this.result.setObject(this.tableViewManager.delete(this.tableView));
        return SUCCESS;
    }

    public String saveTableView() throws Exception {

        this.result.setObject(this.tableViewManager.save(this.tableView));
        return SUCCESS;
    }

    public String listTableViewOfModule() throws Exception {
        this.result.setList(this.tableViewManager.listByModule(this.tableView));
        return SUCCESS;
    }

    public String listModuleNode() throws Exception {

        this.result.setList(this.moduleManager.listNode());
        return SUCCESS;
    }

    public String listModule() throws Exception {

        this.result.setList(this.moduleManager.list());
        return SUCCESS;
    }

    public String saveModule() throws Exception {

        this.result.setObject(this.moduleManager.save(this.module));
        return SUCCESS;
    }

    public String activeModule() throws Exception {

        this.result.setObject(this.moduleManager.save(this.module));
        return SUCCESS;
    }

    //删除Module
    public String deleteModule() throws Exception {

        this.result.setObject(this.moduleManager.delete(this.module.getNodeId()));
        return SUCCESS;
    }

    /**
     * main视图加载
     */
    public String saveProfile() throws Exception {

        this.result.setObject(this.userManager.saveProfile(this.user));
        return SUCCESS;
    }

    public String getProfile() throws Exception {

        this.result.setObject(this.userManager.getProfile());
        return SUCCESS;
    }

    public String saveDefaultRole() throws Exception {
        this.result.setObject(this.userRoleManager.saveDefaultRole(this.userRole));
        return SUCCESS;
    }

    public String changePassword() throws Exception {

        this.result.setObject(this.userManager.changePassword(this.passwordChange));
        return SUCCESS;
    }

    public String getNavigationTree() throws Exception {

        this.result.setObject(this.moduleManager.getNavigationTree());
        return TREE;
    }

    public String getOperatingAuthority() throws Exception {

        this.result.setList(this.authOperatingManager.listVoOfModuleByUser(this.authOperatingVo));
        return SUCCESS;
    }

    public String getDataAuthority() throws Exception {

        this.result.setList(this.authDataManager.listVoOfModuleByUser(this.authData));
        return SUCCESS;
    }

    public String logout() throws Exception {
        Session.clear();
        return SUCCESS;
    }

    public String getSession() throws Exception {
        this.result.setObject(Session.getUserInfo());
        return SUCCESS;
    }

    public String switchRole() throws Exception {
        this.result.setObject(this.userManager.switchRole(this.userRole.getRoleId()));
        return SUCCESS;
    }

    public String getMemoNote() throws Exception {
        this.result.setObject(this.memoManager.get());
        return SUCCESS;
    }

    public String saveMemo() throws Exception {
        this.result.setObject(this.memoManager.save(this.memo));
        return SUCCESS;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public ModuleManager getModuleManager() {
        return moduleManager;
    }

    public void setModuleManager(ModuleManager moduleManager) {
        this.moduleManager = moduleManager;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public OrganizationManager getOrganizationManager() {
        return organizationManager;
    }

    public void setOrganizationManager(OrganizationManager organizationManager) {
        this.organizationManager = organizationManager;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserManager getUserManager() {
        return userManager;
    }

    public void setUserManager(UserManager userManager) {
        this.userManager = userManager;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public RoleManager getRoleManager() {
        return roleManager;
    }

    public void setRoleManager(RoleManager roleManager) {
        this.roleManager = roleManager;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public UserRoleManager getUserRoleManager() {
        return userRoleManager;
    }

    public void setUserRoleManager(UserRoleManager userRoleManager) {
        this.userRoleManager = userRoleManager;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getItemselector() {
        return itemselector;
    }

    public void setItemselector(String itemselector) {
        this.itemselector = itemselector;
    }

    public AuthModuleManager getAuthModuleManager() {
        return authModuleManager;
    }

    public void setAuthModuleManager(AuthModuleManager authModuleManager) {
        this.authModuleManager = authModuleManager;
    }

    public AuthDataManager getAuthDataManager() {
        return authDataManager;
    }

    public void setAuthDataManager(AuthDataManager authDataManager) {
        this.authDataManager = authDataManager;
    }

    public AuthOperatingManager getAuthOperatingManager() {
        return authOperatingManager;
    }

    public void setAuthOperatingManager(AuthOperatingManager authOperatingManager) {
        this.authOperatingManager = authOperatingManager;
    }

    public AuthData getAuthData() {
        return authData;
    }

    public void setAuthData(AuthData authData) {
        this.authData = authData;
    }

    public String getAuthModuleVoList() {
        return authModuleVoList;
    }

    public void setAuthModuleVoList(String authModuleVoList) {
        this.authModuleVoList = authModuleVoList;
    }

    public AuthModule getAuthModule() {
        return authModule;
    }

    public void setAuthModule(AuthModule authModule) {
        this.authModule = authModule;
    }

    public AuthOperatingVo getAuthOperatingVo() {
        return authOperatingVo;
    }

    public void setAuthOperatingVo(AuthOperatingVo authOperatingVo) {
        this.authOperatingVo = authOperatingVo;
    }

    public String getAuthOperatingVoList() {
        return authOperatingVoList;
    }

    public void setAuthOperatingVoList(String authOperatingVoList) {
        this.authOperatingVoList = authOperatingVoList;
    }

    public DataDictionaryManager getDataDictionaryManager() {
        return dataDictionaryManager;
    }

    public void setDataDictionaryManager(DataDictionaryManager dataDictionaryManager) {
        this.dataDictionaryManager = dataDictionaryManager;
    }

    public DataDictionary getDataDictionary() {
        return dataDictionary;
    }

    public void setDataDictionary(DataDictionary dataDictionary) {
        this.dataDictionary = dataDictionary;
    }

    public String getAuthBatchList() {
        return authBatchList;
    }

    public void setAuthBatchList(String authBatchList) {
        this.authBatchList = authBatchList;
    }

    public AuthDuplicateVo getAuthDuplicateVo() {
        return authDuplicateVo;
    }

    public void setAuthDuplicateVo(AuthDuplicateVo authDuplicateVo) {
        this.authDuplicateVo = authDuplicateVo;
    }

    public TableView getTableView() {
        return tableView;
    }

    public void setTableView(TableView tableView) {
        this.tableView = tableView;
    }

    public TableViewManager getTableViewManager() {
        return tableViewManager;
    }

    public void setTableViewManager(TableViewManager tableViewManager) {
        this.tableViewManager = tableViewManager;
    }

    public PasswordChange getPasswordChange() {
        return passwordChange;
    }

    public void setPasswordChange(PasswordChange passwordChange) {
        this.passwordChange = passwordChange;
    }

    public void setMemo(Memo memo) {
        this.memo = memo;
    }

    public MemoManager getMemoManager() {
        return memoManager;
    }

    public void setMemoManager(MemoManager memoManager) {
        this.memoManager = memoManager;
    }

    public Memo getMemo() {
        return memo;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public QuestionManager getQuestionManager() {
        return questionManager;
    }

    public void setQuestionManager(QuestionManager questionManager) {
        this.questionManager = questionManager;
    }

    public Operating getOperating() {
        return operating;
    }

    public void setOperating(Operating operating) {
        this.operating = operating;
    }

    public OperatingManager getOperatingManager() {
        return operatingManager;
    }

    public void setOperatingManager(OperatingManager operatingManager) {
        this.operatingManager = operatingManager;
    }


    public File getUpload() {
        return upload;
    }

    public void setUpload(File upload) {
        this.upload = upload;
    }

    public String getUploadContentType() {
        return uploadContentType;
    }

    public void setUploadContentType(String uploadContentType) {
        this.uploadContentType = uploadContentType;
    }

    public String getUploadFileName() {
        return uploadFileName;
    }

    public void setUploadFileName(String uploadFileName) {
        this.uploadFileName = uploadFileName;
    }
}
