package com.iflat.system.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.system.bean.*;
import com.iflat.system.entity.AuthDuplicateVo;
import com.iflat.system.entity.AuthOperatingVo;
import com.iflat.system.entity.PasswordChange;
import com.iflat.system.entity.UserRoleVo;
import com.iflat.system.service.*;
import com.iflat.util.FileUtil;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

/**
 * Created by tyriv on 2015/9/6.
 */
public class  SystemAction extends BaseAction implements ModelDriven<Page> {

    private final static String TREE = "tree";
    //模块管理
    private Module module;
    private ModuleService moduleService;
    //组织管理
    private Organization organization;
    private OrganizationService organizationService;
    //用户管理
    private User user;
    private UserService userService;
    private String orgId;
    private PasswordChange passwordChange;
    //角色管理
    private Role role;
    private RoleService roleService;
    //用户角色关系
    private UserRole userRole;
    private UserRoleService userRoleService;
    private String itemselector;
    private UserRoleVo userRoleVo;
    private BaseService userRoleVoService;
    //权限管理
    private AuthModuleService authModuleService;
    private AuthModule authModule;
    private String authModuleVoList;
    private AuthDuplicateVo authDuplicateVo;
    private String authBatchList;
    //操作权限
    private AuthOperatingService authOperatingService;
    private AuthOperatingVo authOperatingVo;
    private String authOperatingVoList;
    //数据权限
    private AuthDataService authDataService;
    private AuthData authData;
    //数据字典
    private DataDictionaryService dataDictionaryService;
    private DataDictionary dataDictionary;
    //模块表/视图
    private TableViewService tableViewService;
    private TableView tableView;
    //模块操作
    private Operating operating;
    private OperatingService operatingService;
    //速记本
    private Memo memo;
    private MemoService memoService;
    //问题处理
    private Question question;
    private QuestionService questionService;
    //升级日志
    private Release release;
    private BaseService releaseService;
    /* 文件上传 */
    private File upload;
    private String uploadContentType;
    private String uploadFileName;

    private Page page;
    /**
     * 问题处理
     */
    public String uploadAnsAttachment() throws Exception {

        this.result.setObject(FileUtil.upload(this.upload, this.uploadFileName, "question"));
        return SUCCESS;
    }

    public String uploadQuAttachment() throws Exception {

        this.result.setObject(FileUtil.upload(this.upload, this.uploadFileName, "question"));
        return SUCCESS;
    }

    public String submitQuestion() throws Exception {
        this.result.setObject(this.questionService.save(this.question));
        return SUCCESS;
    }

    public String modifyQuestion() throws Exception {
        this.result.setObject(this.questionService.save(this.question));
        return SUCCESS;
    }

    public String deleteQuestion() throws Exception {
        this.result.setObject(this.questionService.delete(this.question.getQuId()));
        return SUCCESS;
    }

    public String solveQuestion() throws Exception {
        this.result.setObject(this.questionService.solve(this.question));
        return SUCCESS;
    }

    public String listQuestion() throws Exception {
        this.result.setList(this.questionService.list(this.question));
        return SUCCESS;
    }


    /**
     * 数据权限
     */
    public String saveAuthData() throws Exception {
        this.result.setObject(this.authDataService.save(this.authData));
        return SUCCESS;
    }

    public String listTableViewByModule() throws Exception {
        this.result.setList(this.tableViewService.listByModule(this.tableView));
        return SUCCESS;
    }

    /**
     * 数据字典
     */
    public String listFieldAuthority() throws Exception {
        this.result.setList(this.authDataService.listAuthDataFieldStatus(this.authData));
        return SUCCESS;
    }

    public String generateDataDictionary() throws Exception {
        this.dataDictionaryService.generateDataDictionary();
        return SUCCESS;
    }

    public String listDataDictionary() throws Exception {
        this.result.setList(this.dataDictionaryService.list(this.dataDictionary));
        return SUCCESS;
    }

    public String saveDataDictionary() throws Exception {
        this.result.setObject(this.dataDictionaryService.save(this.dataDictionary));
        return SUCCESS;
    }

    /**
     * 操作权限
     */
    public String listAuthOperatingVoByAuthOperatingVo() throws Exception {

        this.result.setList(this.authOperatingService.listVoByAuthOperatingVo(this.authOperatingVo));
        return SUCCESS;
    }

    public String saveBatchAuthOperating() throws Exception {

        this.result.setObject(this.authOperatingService.saveBatch(this.authOperatingVoList));
        return SUCCESS;
    }

    /**
     * 模块权限
     */
    public String duplicateAuthority() throws Exception {
        this.result.setObject(this.authModuleService.duplicateAuthority(this.authBatchList));
        return SUCCESS;
    }

    public String clearAuthority() throws Exception {
        this.result.setObject(this.authModuleService.clearAuthority(this.authBatchList));
        return SUCCESS;
    }

    public String saveBatchAuthModule() throws Exception {

        this.result.setObject(this.authModuleService.saveBatch(this.authModuleVoList));
        return SUCCESS;
    }

    public String saveAuthModule() throws Exception {

        this.result.setObject(this.authModuleService.save(this.authModule));
        return SUCCESS;
    }

    public String listAuthModule() throws Exception {

        this.result.setList(this.authModuleService.list(this.authModule));
        return SUCCESS;
    }

    public String listUserRoleNode() throws Exception {

        this.result.setList(this.userRoleService.listNode());
        return SUCCESS;
    }
    /**
     * 用户-角色关系管理
     */
    public String listUserRoleVo() throws Exception {
        this.result.setList(this.userRoleVoService.list(this.userRoleVo));
        return SUCCESS;
    }

    public String listUserRoleInfoByUser() throws Exception {

        this.result.setList(this.userRoleService.listVoByUser());
        return SUCCESS;
    }

    public String listDefaultRoleInfoByAccount() throws Exception {

        this.result.setList(this.userRoleService.listVoByAccount());
        return SUCCESS;
    }

    public String listUserRoleAsString() throws Exception {

        this.result.setObject(this.userRoleService.listAsString(this.userRole));
        return SUCCESS;
    }

    public String saveUserRole() throws Exception {

        this.userRole.setAccount(this.user.getAccount());
        this.userRole.setRoleId(this.role.getRoleId());
        this.result.setObject(this.userRoleService.saveUserRole(this.userRole, itemselector));
        return SUCCESS;
    }

    /**
     * 角色管理
     */
    public String listRole() throws Exception {

        this.result.setList(this.roleService.list());
        return SUCCESS;
    }

    public String saveRole() throws Exception {

        this.result.setObject(this.roleService.save(this.role));
        return SUCCESS;
    }

    public String activeRole() throws Exception {

        this.result.setObject(this.roleService.save(this.role));
        return SUCCESS;
    }

    public String deleteRole() throws Exception {

        this.result.setObject(this.roleService.delete(this.role.getRoleId()));
        return SUCCESS;
    }

    /**
     * 用户管理
     */
    public String listUserByOrg() throws Exception {

        this.result.setList(this.userService.listByOrgId(this.orgId));
        return SUCCESS;
    }

    public String saveUser() throws Exception {
        this.result.setObject(this.userService.save(this.user));
        return SUCCESS;
    }

    public String activeUser() throws Exception {
        this.result.setObject(this.userService.save(this.user));
        return SUCCESS;
    }

    public String editUserInfo() throws Exception {
        this.result.setObject(this.userService.save(this.user));
        return SUCCESS;
    }

    public String resetPassword() throws Exception {
        this.result.setObject(this.userService.save(this.user));
        return SUCCESS;
    }

    public String deleteUser() throws Exception {
        this.result.setObject(this.userService.deleteByAccount(this.user.getAccount()));
        return SUCCESS;
    }

    /**
     * 组织管理
     */
    public String listOrganizationVo() throws Exception {

        this.result.setList(this.organizationService.listVo());
        return SUCCESS;
    }

    public String listOrganization() throws Exception {

        this.result.setList(this.organizationService.list());
        return SUCCESS;
    }

    public String saveOrganization() throws Exception {

        this.result.setObject(this.organizationService.save(this.organization));
        return SUCCESS;
    }

    public String activeOrganization() throws Exception {

        this.result.setObject(this.organizationService.save(this.organization));
        return SUCCESS;
    }

    public String deleteOrganization() throws Exception {

        this.result.setObject(this.organizationService.delete(this.organization.getOrgId()));
        return SUCCESS;
    }

    public String listOrganizationNode() throws Exception {

        this.result.setList(this.organizationService.listNode());
        return SUCCESS;
    }

    /**
     * 模块管理
     */
    public String saveOperating() throws Exception {
        this.result.setObject(this.operatingService.save(this.operating));
        return SUCCESS;
    }

    public String deleteOperating() throws Exception {
        this.result.setObject(this.operatingService.delete(this.operating));
        return SUCCESS;
    }

    public String listOperatingOfModule() throws Exception {
        this.result.setList(this.operatingService.listOfModule(this.operating));
        return SUCCESS;
    }

    public String deleteTableView() throws Exception {

        this.result.setObject(this.tableViewService.delete(this.tableView));
        return SUCCESS;
    }

    public String saveTableView() throws Exception {

        this.result.setObject(this.tableViewService.save(this.tableView));
        return SUCCESS;
    }

    public String listTableViewOfModule() throws Exception {
        this.result.setList(this.tableViewService.listByModule(this.tableView));
        return SUCCESS;
    }

    public String listModuleNode() throws Exception {

        this.result.setList(this.moduleService.listNode());
        return SUCCESS;
    }

    public String listModule() throws Exception {

        this.result.setList(this.moduleService.list());
        return SUCCESS;
    }

    public String saveModule() throws Exception {

        this.result.setObject(this.moduleService.save(this.module));
        return SUCCESS;
    }

    public String activeModule() throws Exception {

        this.result.setObject(this.moduleService.save(this.module));
        return SUCCESS;
    }

    //删除Module
    public String deleteModule() throws Exception {

        this.result.setObject(this.moduleService.delete(this.module.getNodeId()));
        return SUCCESS;
    }

    /**
     * main视图加载
     */
    public String saveProfile() throws Exception {

        this.result.setObject(this.userService.saveProfile(this.user));
        return SUCCESS;
    }

    public String getProfile() throws Exception {

        this.result.setObject(this.userService.getProfile());
        return SUCCESS;
    }

    public String saveDefaultRole() throws Exception {
        this.result.setObject(this.userRoleService.saveDefaultRole(this.userRole));
        return SUCCESS;
    }

    public String changePassword() throws Exception {

        this.result.setObject(this.userService.changePassword(this.passwordChange));
        return SUCCESS;
    }

    public String getNavigationTree() throws Exception {

        this.result.setObject(this.moduleService.getNavigationTree());
        return TREE;
    }

    public String getOperatingAuthority() throws Exception {

        this.result.setList(this.authOperatingService.listVoOfModuleByUser(this.authOperatingVo));
        return SUCCESS;
    }

    public String getDataAuthority() throws Exception {

        this.result.setList(this.authDataService.listVoOfModuleByUser(this.authData));
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
        this.result.setObject(this.userService.switchRole(this.userRole.getRoleId()));
        return SUCCESS;
    }

    public String getMemoNote() throws Exception {
        this.result.setObject(this.memoService.get());
        return SUCCESS;
    }

    public String saveMemo() throws Exception {
        this.result.setObject(this.memoService.save(this.memo));
        return SUCCESS;
    }

    /* 更新日志 */
    public String saveRelease() throws Exception {
        this.result.setObject(this.releaseService.save(this.release));
        return SUCCESS;
    }

    public String deleteRelease() throws Exception {
        this.result.setObject(this.releaseService.delete(this.release));
        return SUCCESS;
    }

    public String listRelease() throws Exception {
        this.result.setList(this.releaseService.list(this.release));
        return SUCCESS;
    }

    public String listPageRelease() throws Exception {
        this.result.setObject(this.releaseService.listPage(this.release, this.page));
        return SUCCESS;
    }

    public ModuleService getModuleService() {
        return moduleService;
    }

    public void setModuleService(ModuleService moduleService) {
        this.moduleService = moduleService;
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

    public OrganizationService getOrganizationService() {
        return organizationService;
    }

    public void setOrganizationService(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public RoleService getRoleService() {
        return roleService;
    }

    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public UserRoleService getUserRoleService() {
        return userRoleService;
    }

    public void setUserRoleService(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
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

    public AuthModuleService getAuthModuleService() {
        return authModuleService;
    }

    public void setAuthModuleService(AuthModuleService authModuleService) {
        this.authModuleService = authModuleService;
    }

    public AuthDataService getAuthDataService() {
        return authDataService;
    }

    public void setAuthDataService(AuthDataService authDataService) {
        this.authDataService = authDataService;
    }

    public AuthOperatingService getAuthOperatingService() {
        return authOperatingService;
    }

    public void setAuthOperatingService(AuthOperatingService authOperatingService) {
        this.authOperatingService = authOperatingService;
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

    public DataDictionaryService getDataDictionaryService() {
        return dataDictionaryService;
    }

    public void setDataDictionaryService(DataDictionaryService dataDictionaryService) {
        this.dataDictionaryService = dataDictionaryService;
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

    public TableViewService getTableViewService() {
        return tableViewService;
    }

    public void setTableViewService(TableViewService tableViewService) {
        this.tableViewService = tableViewService;
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

    public MemoService getMemoService() {
        return memoService;
    }

    public void setMemoService(MemoService memoService) {
        this.memoService = memoService;
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

    public QuestionService getQuestionService() {
        return questionService;
    }

    public void setQuestionService(QuestionService questionService) {
        this.questionService = questionService;
    }

    public Operating getOperating() {
        return operating;
    }

    public void setOperating(Operating operating) {
        this.operating = operating;
    }

    public OperatingService getOperatingService() {
        return operatingService;
    }

    public void setOperatingService(OperatingService operatingService) {
        this.operatingService = operatingService;
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

    public UserRoleVo getUserRoleVo() {
        return userRoleVo;
    }

    public void setUserRoleVo(UserRoleVo userRoleVo) {
        this.userRoleVo = userRoleVo;
    }

    public BaseService getUserRoleVoService() {
        return userRoleVoService;
    }

    public void setUserRoleVoService(BaseService userRoleVoService) {
        this.userRoleVoService = userRoleVoService;
    }

    public Release getRelease() {
        return release;
    }

    public void setRelease(Release release) {
        this.release = release;
    }

    public BaseService getReleaseService() {
        return releaseService;
    }

    public void setReleaseService(BaseService releaseService) {
        this.releaseService = releaseService;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    @Override
    public Page getModel() {
        if(page == null){
            page = new Page();
        }
        return page;
    }
}
