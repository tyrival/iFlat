package com.iflat.system.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.iflat.system.dao.impl.IflatDaoSupport;
import com.iflat.system.entity.ExcelReader;
import com.iflat.system.entity.Page;
import com.iflat.system.service.IflatService;
import com.iflat.util.ExcelHelper;
import com.iflat.util.FileHelper;
import com.iflat.util.GSReflectHelper;
import org.apache.struts2.ServletActionContext;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.ApplicationContext;
import org.springframework.oxm.ValidationFailureException;
import org.springframework.web.context.support.WebApplicationContextUtils;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/11/27.
 */
public abstract class IflatServiceSupport implements IflatService {

    private ExcelReader excelReader;
    private List importList;
    private Object saveObj;
    private Object deleteObj;
    private Object listParam;
    private List insertBatchList;
    private List updateBatchList;
    private List deleteBatchList;
    private List list;
    private List listBatchList;
    private Page page;
    private boolean isPaging;

    protected void beforeGenerate() throws Exception { };
    protected void afterGenerate() throws Exception { };

    protected void beforeInsert() throws Exception { };
    protected void beforeUpdate() throws Exception { };
    protected void afterSave() throws Exception { }

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

    protected abstract void setImportExcelReader() throws Exception;
    protected abstract void setImportProps() throws Exception;
    protected abstract void importValidate() throws Exception;


    public IflatServiceSupport() {
        this.excelReader = new ExcelReader();
        this.isPaging = false;
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
        GSReflectHelper obj = new GSReflectHelper(this.saveObj);
        Object id = obj.getMethodValue("id");
        Object result;

        if(id == null || "".equals(id.toString())) {

            this.beforeInsert();
            obj.setMethodValue("id", UUID.randomUUID().toString());
            result = executeMethod(this.saveObj, "insert");

        } else {
            this.beforeUpdate();
            result = executeMethod(this.saveObj, "update");
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

        return FileHelper.upload(file, fileName, document);
    }

    @Override
    public List importExcel(File file, String fileName) throws Exception {

        String filePath = FileHelper.upload(file, fileName, "temp/");
        //设置excel文件位置和起始行默认值
        this.excelReader.setFilePath(filePath);
        this.excelReader.setStartRow(1);

        //由子类设置excelReader的属性
        this.setImportExcelReader();
        if(this.excelReader.getClassName() == null || this.excelReader.getProps() == null){
            throw new ClassNotFoundException("IflatServiceSupport错误：未找到文件内容对应的类，或未定义列与属性的对应关系");
        }

        //读取excel
        this.importList = ExcelHelper.read(this.excelReader);
        //对象的属性中，除了由excel表导入的值外，还需设置由系统生成的属性值
        this.setImportProps();

        //数据校验
        try{
            this.importValidate();
        } catch (Exception e) {
            throw new ValidationFailureException("IflatServiceSupport未通过数据校验：" + e.getMessage());
        }

        //批量插入数据
        List result = null;
        Object res = null;
        if(this.importList.size() > 0) {
            res = executeMethod(this.importList, "insertBatch");
        }
        if(res instanceof Integer) {
            result = (int)res > 0 ? importList : null;
        }
        //删除excel文件
        FileHelper.delete(excelReader.getFilePath());
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
                throw new Exception("IflatServiceSupport错误：未能找到JavaBean < " + name + " > 对应的 < " + dao + "> 类的 [ " + methodName + " ] 方法，请联系管理员。");
            }

            /* 实例化dao层对象，并执行method */
            Object ins = cls.newInstance();

            //对此对象的SqlSessionTemplate属性进行赋值
            if("class com.iflat.system.dao.impl.IflatDaoSupport".equals(cls.getSuperclass().toString())) {

                IflatDaoSupport i = (IflatDaoSupport) ins;
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
            throw new Exception("IflatServiceSupport错误：未能成功找到JavaBean < "
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
                throw new Exception("IflatServiceSupport错误：未能成功执行JavaBean < "
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
}
