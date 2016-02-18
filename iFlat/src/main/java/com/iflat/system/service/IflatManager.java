package com.iflat.system.service;

import com.github.pagehelper.PageInfo;
import com.iflat.system.entity.Page;
import com.iflat.system.entity.Result;

import java.io.File;
import java.util.List;

/**
 * Created by tyriv on 2015/11/27.
 */
public interface IflatManager {

    public Object save(Object o) throws Exception;
    public List insertBatch(List list) throws Exception;
    public List updateBatch(List list) throws Exception;
    public List list(Object o) throws Exception;
    public List listBatch(List list) throws Exception;
    public Object delete(Object o) throws Exception;
    public List deleteBatch(List list) throws Exception;
    public PageInfo listPage(Object o, Page page) throws Exception;
    public String uploadFile(File file, String fileName) throws Exception;
    public List importExcel(File file, String fileName) throws Exception;
    public Object generate(Object o) throws Exception;
}
