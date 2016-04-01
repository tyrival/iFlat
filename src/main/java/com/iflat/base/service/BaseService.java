package com.iflat.base.service;

import com.github.pagehelper.PageInfo;
import com.iflat.base.entity.Page;

import java.io.File;
import java.util.List;

/**
 * Created by tyriv on 2015/11/27.
 */
public interface BaseService {

    Object save(Object o) throws Exception;
    List insertBatch(List list) throws Exception;
    List updateBatch(List list) throws Exception;
    List list(Object o) throws Exception;
    List listBatch(List list) throws Exception;
    Object delete(Object o) throws Exception;
    List deleteBatch(List list) throws Exception;
    PageInfo listPage(Object o, Page page) throws Exception;
    String uploadFile(File file, String fileName) throws Exception;
    List importExcel(File file, String fileName) throws Exception;
    Object generate(Object o) throws Exception;

    // 流程相关
    void startProcess(Object object) throws Exception;
    void deleteProcessInstance(Object object) throws Exception;
    // 根据对象获取businessKey
    String getBusinessKey(Object object) throws Exception;
}
