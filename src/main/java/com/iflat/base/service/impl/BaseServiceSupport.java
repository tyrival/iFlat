package com.iflat.base.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.iflat.base.dao.impl.BaseDaoSupport;
import com.iflat.base.entity.ExcelReader;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.*;
import com.iflat.workflow.service.WorkflowService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.impl.persistence.entity.CommentEntity;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.apache.struts2.ServletActionContext;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.ApplicationContext;
import org.springframework.oxm.ValidationFailureException;
import org.springframework.web.context.support.WebApplicationContextUtils;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

/**
 * Created by tyriv on 2015/11/27.
 */
public class BaseServiceSupport implements BaseService {

    protected ExcelReader excelReader;
    protected List importList;
    protected Object saveObj;
    protected Object deleteObj;
    protected Object listParam;
    protected List insertBatchList;
    protected List updateBatchList;
    protected List deleteBatchList;
    protected List list;
    protected List listBatchList;
    protected Page page;
    protected boolean isPaging;

    protected RuntimeService runtimeService;
    protected WorkflowService workflowService;
    protected Object processObj;
    protected Map<String, Object> processMap;
    protected ReflectUtil reflectProcessObj;
    protected String processKey;
    protected String processBusinessKey;

    protected void beforeGenerate() throws Exception { };
    protected void afterGenerate() throws Exception { };

    protected void beforeSave() throws Exception { };
    protected void beforeInsert() throws Exception { };
    protected void afterInsert() throws Exception { };
    protected void beforeUpdate() throws Exception { };
    protected void afterUpdate() throws Exception { };
    protected void afterSave() throws Exception { };

    protected void afterUpdateBatch() throws Exception { };
    protected void beforeUpdateBatch() throws Exception { };

    protected void beforeDelete() throws Exception { };
    protected void afterDelete() throws Exception { }

    protected void beforeList() throws Exception { };
    protected void afterList() throws Exception { }

    protected void beforeListBatch() throws Exception { };
    protected void afterListBatch() throws Exception { };

    protected void beforeInsertBatch() throws Exception { }
    protected void afterInsertBatch() throws Exception { }

    protected void afterDeleteBatch() throws Exception { }
    protected void beforeDeleteBatch() throws Exception { }

    protected void setImportExcelReader() throws Exception { }
    protected void setImportProps() throws Exception { }
    protected void importValidate() throws Exception { }
    protected void beforeImportData() throws Exception { }
    protected void afterImportData() throws Exception { }

    protected void beforeStartProcess() throws Exception { }
    protected void afterStartProcess() throws Exception { }

    public BaseServiceSupport() {
        this.excelReader = new ExcelReader();
        this.isPaging = false;
        this.processMap = new HashMap<>();
    }

    /**
     * 获取流程key，用于定位流程定义，从而常见流程实例
     */
    protected void generateProcessKey() {
        String key = this.processObj.getClass().getName()
                .replace("com.iflat.", "")
                .replace("bean.", "")
                .replace("entity.", "");
        this.processKey = StringUtil.upperCaseFirstChar(key);
    }

    /**
     * 设置businessKey
     * 储存从业务对象实例查找流程实例的变量
     */
    protected void generateBusinessKey() throws Exception {
        this.processBusinessKey
                = this.processObj.getClass().getName()
                + ":"
                + this.reflectProcessObj.getMethodValue("id").toString();
    }

    @Override
    public void startProcess(Object object) throws Exception {

        object = this.list(object).get(0);
        this.processObj = object;
        this.reflectProcessObj = new ReflectUtil(this.processObj);

        this.generateProcessKey();
        this.generateBusinessKey();

        // 将流程发起人和发起时间信息置入流程变量
        UserInfoVo userInfoVo = Session.getUserInfo();
        processMap.put("creatorAcc", userInfoVo.getAccount());
        processMap.put("creatorName", userInfoVo.getUserName());
        processMap.put("createTime", new Date());

        /**
         * 设置流程变量
         * 储存从流程实例查找业务对象的变量
         * className储存流程关联的是哪个对象类型
         * id储存流程关联的对象实例的id
         */
        processMap.put("className", object.getClass().getName());
        processMap.put("id", reflectProcessObj.getMethodValue("id").toString());

        this.beforeStartProcess();
        // 启动流程
        getRuntimeService().startProcessInstanceByKey(
                this.processKey, this.processBusinessKey, this.processMap);

        this.afterStartProcess();
    }

    @Override
    public void deleteProcessInstance(Object object) throws Exception {
        String businessKey = getBusinessKey(object);
        ProcessInstance processInstance = runtimeService
                .createProcessInstanceQuery()
                .processInstanceBusinessKey(businessKey)
                .singleResult();
        runtimeService.deleteProcessInstance(
                processInstance.getProcessInstanceId(), "");
    }

    @Override
    public String getBusinessKey(Object object) throws Exception {

        this.processObj = object;
        this.reflectProcessObj = new ReflectUtil(this.processObj);
        generateBusinessKey();
        return this.processBusinessKey;
    }

    @Override
    public List<CommentEntity> listComment(Object object) throws Exception {
        String businessKey = getBusinessKey(object);
        return (List<CommentEntity>) (List) getWorkflowService().listProcessInstanceCommentsByBusinessKey(businessKey);
    }

    @Override
    public Object generate(Object o) throws Exception {

        this.saveObj = o;
        Object result;

        this.beforeGenerate();
        result = executeMethod(this.saveObj, "generate");
        this.afterGenerate();

        if(result instanceof Integer) {
            result = (int)result > 0 ? this.saveObj : null;
        }
        return result;
    }

    @Override
    public Object save(Object o) throws Exception {

        this.saveObj = o;

        this.beforeSave();

        ReflectUtil obj = new ReflectUtil(this.saveObj);
        Object id = obj.getMethodValue("id");
        Object result;

        if(id == null || "".equals(id.toString())) {

            obj.setMethodValue("id", UUID.randomUUID().toString());

            try {
                UserInfoVo userInfoVo = Session.getUserInfo();
                obj.setMethodValue("creatorAcc", userInfoVo.getAccount());
                obj.setMethodValue("creatorName", userInfoVo.getUserName());
            } catch (Exception e) {
            }

            try {
                obj.setMethodValue("createTime", new Date());
            } catch (Exception e) {
            }

            this.beforeInsert();
            result = executeMethod(this.saveObj, "insert");
            this.afterInsert();

        } else {
            this.beforeUpdate();
            result = executeMethod(this.saveObj, "update");
            this.afterUpdate();
        }

        this.afterSave();

        //如果是增删改，dao层返回的是数值，此时改为返回参数对象
        if(result instanceof Integer) {
            result = (int)result > 0 ? this.saveObj : null;
        }
        return result;
    }

    @Override
    public List insertBatch(List list) throws Exception {

        this.insertBatchList = list;
        Object result;

        this.beforeInsertBatch();
        result = executeMethod(this.insertBatchList, "insertBatch");
        this.afterInsertBatch();

        //如果是增删改，dao层返回的是数值，此时改为返回参数对象
        if(result instanceof Integer) {
            this.insertBatchList = (int)result == this.insertBatchList.size() ? this.insertBatchList : null;
        }
        return this.insertBatchList;
    }

    @Override
    public List updateBatch(List list) throws Exception {

        this.updateBatchList = list;
        Object result;

        this.beforeUpdateBatch();
        result = executeMethod(this.updateBatchList, "updateBatch");
        this.afterUpdateBatch();

        if(result instanceof Integer) {
            this.updateBatchList = (int)result == this.updateBatchList.size() ? this.updateBatchList : null;
        }
        return this.updateBatchList;
    }

    @Override
    public Object delete(Object o) throws Exception {

        this.deleteObj = o;

        this.beforeDelete();
        Object result = executeMethod(this.deleteObj, "delete");
        this.afterDelete();

        if(result instanceof Integer) {
            result = (int)result > 0 ? this.deleteObj : null;
        }
        return result;
    }

    @Override
    public List deleteBatch(List list) throws Exception {

        this.deleteBatchList = list;
        Object result;

        this.beforeDeleteBatch();
        result = executeMethod(this.deleteBatchList, "deleteBatch");
        this.afterDeleteBatch();

        //如果是增删改，dao层返回的是数值，此时改为返回参数对象
        if(result instanceof Integer) {
            this.deleteBatchList = (int)result == this.deleteBatchList.size() ? this.deleteBatchList : null;
        }
        return this.deleteBatchList;
    }

    @Override
    public List list(Object o) throws Exception {

        this.listParam = o;

        this.beforeList();
        this.list = (List) executeMethod(this.listParam, "list");
        this.afterList();

        return this.list;
    }

    @Override
    public List listBatch(List list) throws Exception {

        this.listBatchList = list;
        Object result;

        this.beforeListBatch();
        this.listBatchList = (List) executeMethod(this.listBatchList, "listBatch");
        this.afterListBatch();

        return this.listBatchList;
    }

    @Override
    public PageInfo listPage(Object o, Page page) throws Exception {

        //对分页参数进行赋值，并将分页开关isPaging打开
        this.page = page;
        this.isPaging = true;
        this.listParam = o;

        this.beforeList();
        //执行list方法，得到结果后，封装到PageInfo对象内部
        this.list = (List)executeMethod(this.listParam, "list");
        PageInfo pageInfo = new PageInfo(this.list);
        this.afterList();

        return pageInfo;
    }

    @Override
    public String uploadFile(File file, String fileName) throws Exception {

        String document = this.getClass().getName();
        document = document.replace("com.", "")
                .replace("iflat.", "")
                .replace("service.", "")
                .replace("impl.", "")
                .replace("ServiceImpl", "")
                .replace(".", "/") + "/";

        return FileUtil.upload(file, fileName, document);
    }

    @Override
    public List importExcel(File file, String fileName) throws Exception {

        String filePath = FileUtil.upload(file, fileName, "temp/");
        //设置excel文件位置和起始行默认值
        this.excelReader.setFilePath(filePath);
        this.excelReader.setStartRow(1);

        //由子类设置excelReader的属性
        this.setImportExcelReader();
        if(this.excelReader.getClassName() == null || this.excelReader.getProps() == null){
            throw new ClassNotFoundException("BaseServiceSupport错误：未找到文件内容对应的类，或未定义列与属性的对应关系");
        }

        //读取excel
        this.importList = ExcelUtil.read(this.excelReader);
        //对象的属性中，除了由excel表导入的值外，还需设置由系统生成的属性值
        this.setImportProps();

        //数据校验
        try{
            this.importValidate();
        } catch (Exception e) {
            throw new ValidationFailureException("BaseServiceSupport未通过数据校验：" + e.getMessage());
        }

        //批量插入数据
        List result = null;
        Object res = null;
        this.beforeImportData();
        if(this.importList.size() > 0) {
            res = executeMethod(this.importList, "insertBatch");
        }
        if(res instanceof Integer) {
            result = (int)res > 0 ? importList : null;
        }
        this.afterImportData();
        //删除excel文件
        FileUtil.delete(excelReader.getFilePath());
        return result;
    }

    public Object executeMethod(Object o, String methodName) throws Exception {

        /* 根据javabean的类名得到对应的dao层实现类名 */
        String name = o.getClass().getName();
        if(o instanceof List) {
            name = ((List) o).get(0).getClass().getName();
        }

        String dao = name.replace(".bean.", ".dao.impl.").replace(".entity.", ".dao.impl.");;
        dao = dao + "DaoImpl";
        Object result = null;
        try {
            /* 根据dao层类名，反射得到需要执行的Method对象 */
            Class cls = Class.forName(dao);
            Method[] methods = cls.getMethods();
            Method m = null;

            //遍历此dao层类的方法集methods，根据methodName找到方法
            for(int i = 0; i < methods.length; i++) {
                if(methodName.equals(methods[i].getName())) {
                    m = methods[i];
                    break;
                }
            }

            //如果找不到方法，则抛出异常
            if(m == null) {
                throw new Exception("BaseServiceSupport错误：未能找到JavaBean < " + name + " > 对应的 < " + dao + "> 类的 [ " + methodName + " ] 方法，请联系管理员。");
            }

            /* 实例化dao层对象，并执行method */
            Object ins = cls.newInstance();

            //对此对象的SqlSessionTemplate属性进行赋值
            if("class com.iflat.base.dao.impl.BaseDaoSupport".equals(cls.getSuperclass().toString())) {

                BaseDaoSupport i = (BaseDaoSupport) ins;
                ApplicationContext ac = WebApplicationContextUtils
                        .getRequiredWebApplicationContext(ServletActionContext
                                .getServletContext());
                SqlSessionTemplate sqlSessionTemplate = (SqlSessionTemplate) ac
                        .getBean("sqlSessionTemplate");
                i.setSqlSessionTemplate(sqlSessionTemplate);
                ins = i;
            }

            //如果需要分页，则启用分页插件
            if(this.isPaging) {
                PageHelper.startPage(this.page.getPage(), this.page.getLimit());
            }
            result = m.invoke(ins, o);

        } catch (ClassNotFoundException e) {
            throw new Exception("BaseServiceSupport错误：未能成功找到JavaBean < "
                    + name + " > 对应的 < " + dao + "> 类，请联系管理员。");

        } catch (Exception e) {
            if(e instanceof InvocationTargetException) {
                throw new Exception(((InvocationTargetException) e)
                        .getTargetException().toString());
            }
            if(e instanceof InstantiationException
                    || e instanceof IllegalAccessException
                    || e instanceof IllegalAccessException
                    || e instanceof IllegalArgumentException) {
                throw new Exception("BaseServiceSupport错误：未能成功执行JavaBean < "
                        + name + " > 对应的 < " + dao + "> 类的 [ "
                        + methodName + " ] 方法，请联系管理员。错误信息："
                        + e.getMessage());
            }
        }
        return result;
    }

    public ExcelReader getExcelReader() {
        return excelReader;
    }

    public void setExcelReader(ExcelReader excelReader) {
        this.excelReader = excelReader;
    }

    public List getImportList() {
        return importList;
    }

    public void setImportList(List importList) {
        this.importList = importList;
    }

    public Object getSaveObj() {
        return saveObj;
    }

    public void setSaveObj(Object saveObj) {
        this.saveObj = saveObj;
    }

    public Object getDeleteObj() {
        return deleteObj;
    }

    public void setDeleteObj(Object deleteObj) {
        this.deleteObj = deleteObj;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }

    public Object getListParam() {
        return listParam;
    }

    public void setListParam(Object listParam) {
        this.listParam = listParam;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public List getInsertBatchList() {
        return insertBatchList;
    }

    public void setInsertBatchList(List insertBatchList) {
        this.insertBatchList = insertBatchList;
    }

    public List getDeleteBatchList() {
        return deleteBatchList;
    }

    public void setDeleteBatchList(List deleteBatchList) {
        this.deleteBatchList = deleteBatchList;
    }

    public List getUpdateBatchList() {
        return updateBatchList;
    }

    public void setUpdateBatchList(List updateBatchList) {
        this.updateBatchList = updateBatchList;
    }

    public List getListBatchList() {
        return listBatchList;
    }

    public void setListBatchList(List listBatchList) {
        this.listBatchList = listBatchList;
    }

    public Object getProcessObj() {
        return processObj;
    }

    public void setProcessObj(Object processObj) {
        this.processObj = processObj;
    }

    public ReflectUtil getReflectProcessObj() {
        return reflectProcessObj;
    }

    public void setReflectProcessObj(ReflectUtil reflectProcessObj) {
        this.reflectProcessObj = reflectProcessObj;
    }

    public RuntimeService getRuntimeService() {
        if (runtimeService == null) {
            runtimeService = Application.getSpringContext()
                    .getBean("runtimeService", RuntimeService.class);
        }
        return runtimeService;
    }

    public void setRuntimeService(RuntimeService runtimeService) {
        this.runtimeService = runtimeService;
    }

    public Map<String, Object> getProcessMap() {
        return processMap;
    }

    public void setProcessMap(Map<String, Object> processMap) {
        this.processMap = processMap;
    }

    public String getProcessKey() {
        return processKey;
    }

    public void setProcessKey(String processKey) {
        this.processKey = processKey;
    }

    public String getProcessBusinessKey() {
        return processBusinessKey;
    }

    public void setProcessBusinessKey(String processBusinessKey) {
        this.processBusinessKey = processBusinessKey;
    }

    public WorkflowService getWorkflowService() {

        if (workflowService == null) {
            workflowService = Application.getSpringContext()
                    .getBean("workflowService", WorkflowService.class);
        }
        return workflowService;
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }
}
