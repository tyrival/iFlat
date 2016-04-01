package com.iflat.system.service.impl;

import com.iflat.system.bean.AuthData;
import com.iflat.system.bean.DataDictionary;
import com.iflat.system.bean.Module;
import com.iflat.system.dao.AuthDataDao;
import com.iflat.system.dao.DataDictionaryDao;
import com.iflat.system.entity.AuthDataFieldVo;
import com.iflat.system.entity.AuthDataVo;
import com.iflat.system.entity.AuthFieldVo;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.AuthDataService;
import com.iflat.util.JSONUtil;
import com.iflat.util.Session;

import java.util.*;

/**
 * Created by tyriv on 2015/10/8.
 */
public class AuthDataServiceImpl implements AuthDataService {

    private AuthDataDao authDataDao;
    private DataDictionaryDao dataDictionaryDao;

    @Override
    public AuthData save(AuthData authData) throws Exception {

        if(authData.getAdId() == null || "".equals(authData.getAdId())) {
            authData.setAdId(UUID.randomUUID().toString());
            authData = this.authDataDao.insert(authData);
        } else {
            authData = this.authDataDao.update(authData);
        }
        return authData;
    }

    @Override
    public List<AuthDataFieldVo> listAuthDataFieldStatus(AuthData authData) throws Exception {

        //获取此角色/用户对此报表的权限记录
        AuthData model = this.authDataDao.get(authData);
        String field = model != null ? model.getField() : "";
        //获取此表/视图的字段列表
        DataDictionary dataDictionary = new DataDictionary();
        dataDictionary.setDbInstance(authData.getDbInstance());
        dataDictionary.setDbName(authData.getDbName());
        dataDictionary.setTableName(authData.getTableName());
        List<DataDictionary> dataDictionaryList = this.dataDictionaryDao.list(dataDictionary);
        HashMap map = new HashMap();
        //遍历字段列表
        if(dataDictionaryList != null && dataDictionaryList.size() != 0) {
            for(int i = 0; i < dataDictionaryList.size(); i++) {
                //设置字段相关的信息
                AuthDataFieldVo authDataFieldVo = new AuthDataFieldVo();
                authDataFieldVo.setFieldName(dataDictionaryList.get(i).getFieldName());
                authDataFieldVo.setAlias(dataDictionaryList.get(i).getAlias());
                //存入hashmao，key为字段名
                map.put(authDataFieldVo.getFieldName(), authDataFieldVo);
            }
            if(!"".equals(field)) {
                //将权限信息由String转为List
                List<AuthFieldVo> authFieldVoList = (List<AuthFieldVo>) JSONUtil.jsonToList(field, "com.iflat.system.entity.AuthFieldVo");
                //遍历列表
                if(authFieldVoList != null && authFieldVoList.size() != 0) {
                    for(int m = 0; m < authFieldVoList.size(); m++) {
                        //将hashmap中对应字段的状态设置为相应的信息
                        ((AuthDataFieldVo)map.get(authFieldVoList.get(m).getField())).setStatus(authFieldVoList.get(m).getStatus());
                    }
                }
            }
        }
        //遍历hashmap，将每个对象都存入列表并返回
        List<AuthDataFieldVo> result = new ArrayList<AuthDataFieldVo>();
        Set entrySet = map.entrySet();
        for (Iterator it = entrySet.iterator(); it.hasNext();) {
            AuthDataFieldVo vo = (AuthDataFieldVo) ((Map.Entry) it.next()).getValue();
            if(model != null) {
                vo.setFilter(model.getFilter());
                vo.setAdId(model.getAdId());
            }
            result.add(vo);
        }
        return result;
    }

    @Override
    public List<AuthDataVo> listVoOfModuleByUser(AuthData authData) throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        authData.setRoleId(userInfoVo.getRoleId());
        authData.setAccount(userInfoVo.getAccount());
        return this.authDataDao.listVoOfModuleByUser(authData);
    }

    @Override
    public void updateCascadeWithModuleChange(Module oldModule, Module newModule) throws Exception {
        AuthData authData = new AuthData();
        authData.setNameSpace(oldModule.getNameSpace());
        authData.setModuleName(oldModule.getModuleName());
        List<AuthData> list = new ArrayList<>();
        list = authDataDao.list(authData);
        if (list.size() > 0) {
            for (AuthData auth : list) {
                auth.setNameSpace(newModule.getNameSpace());
                auth.setModuleName(newModule.getModuleName());
            }
            authDataDao.updateBatch(list);
        }
    }

    public AuthDataDao getAuthDataDao() {
        return authDataDao;
    }

    public void setAuthDataDao(AuthDataDao authDataDao) {
        this.authDataDao = authDataDao;
    }

    public DataDictionaryDao getDataDictionaryDao() {
        return dataDictionaryDao;
    }

    public void setDataDictionaryDao(DataDictionaryDao dataDictionaryDao) {
        this.dataDictionaryDao = dataDictionaryDao;
    }
}
