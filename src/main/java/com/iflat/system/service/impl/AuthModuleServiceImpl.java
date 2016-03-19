package com.iflat.system.service.impl;

import com.iflat.system.bean.AuthModule;
import com.iflat.system.bean.Module;
import com.iflat.system.dao.AuthDataDao;
import com.iflat.system.dao.AuthModuleDao;
import com.iflat.system.dao.AuthOperatingDao;
import com.iflat.system.entity.AuthClearVo;
import com.iflat.system.entity.AuthDuplicateVo;
import com.iflat.system.entity.AuthModuleVo;
import com.iflat.system.service.AuthModuleService;
import com.iflat.util.JSONUtil;

import java.util.*;

/**
 * Created by tyriv on 2015/10/8.
 */
public class AuthModuleServiceImpl implements AuthModuleService {

    private AuthModuleDao authModuleDao;
    private AuthOperatingDao authOperatingDao;
    private AuthDataDao authDataDao;

    @Override
    public AuthModule save(AuthModule authModule) throws Exception {
        AuthModule result = null;
        if(authModule.getAmId() == null || "".equals(authModule.getAmId())) {
            authModule.setAmId(UUID.randomUUID().toString());
            result = this.authModuleDao.insert(authModule);
        } else {
            result = this.authModuleDao.update(authModule);
        }
        return result;
    }

    @Override
    public int saveBatch(String authModuleVoList) throws Exception {

        //获取所有前台传递的数据
        List<AuthModuleVo> list = (List<AuthModuleVo>) JSONUtil.jsonToList(authModuleVoList, "com.iflat.system.entity.AuthModuleVo");
        List<AuthModuleVo> createList = new ArrayList<AuthModuleVo>();
        List<AuthModuleVo> updateList = new ArrayList<AuthModuleVo>();
        //将数据按照amId是否为空，分为新增或修改两个list
        for(int i = 0; i < list.size(); i++) {
            if("".equals(list.get(i).getAmId()) || list.get(i).getAmId() == null) {
                list.get(i).setAmId(UUID.randomUUID().toString());
                createList.add(list.get(i));
            } else {
                updateList.add(list.get(i));
            }
        }
        int result = 0;
        //对两个list分别执行批量新增和修改操作
        result = createList.size() != 0 ? result + this.authModuleDao.insertBatchVo(createList) : result;
        result = updateList.size() != 0 ? result + this.authModuleDao.updateBatchVo(updateList) : result;
        return result;
    }

    @Override
    public List<AuthModule> list(AuthModule authModule) throws Exception {

        return this.authModuleDao.list(authModule);
    }

    @Override
    public int duplicateAuthority(String authDuplicateList) throws Exception {
        List<AuthDuplicateVo> list = (List<AuthDuplicateVo>) JSONUtil.jsonToList(authDuplicateList, "com.iflat.system.entity.AuthDuplicateVo");
        this.authModuleDao.deleteByDuplicate(list);
        this.authOperatingDao.deleteByDuplicate(list);
        this.authDataDao.deleteByDuplicate(list);
        int result = 0;
        result += this.authModuleDao.insertDuplicate(list);
        result += this.authOperatingDao.insertDuplicate(list);
        result += this.authDataDao.insertDuplicate(list);
        return result;
    }

    @Override
    public int clearAuthority(String authClearList) throws Exception {
        List<AuthClearVo> list = (List<AuthClearVo>) JSONUtil.jsonToList(authClearList, "com.iflat.system.entity.AuthClearVo");
        int result = 0;
        result += this.authOperatingDao.deleteByClear(list);
        result += this.authDataDao.deleteByClear(list);
        result += this.authDataDao.deleteByClear(list);
        return result;
    }

    @Override
    public int updateCascadeWithModuleChange(Module oldModule, Module newModule) throws Exception {
        AuthModule authModule = new AuthModule();
        authModule.setNameSpace(oldModule.getNameSpace());
        authModule.setModuleName(oldModule.getModuleName());
        List<AuthModule> list = new ArrayList<>();
        list = authModuleDao.list(authModule);
        if (list.size() > 0) {
            for (AuthModule auth : list) {
                auth.setNameSpace(newModule.getNameSpace());
                auth.setModuleName(newModule.getModuleName());
            }
        }
        return authModuleDao.updateBatch(list);
    }

    public AuthModuleDao getAuthModuleDao() {
        return authModuleDao;
    }

    public void setAuthModuleDao(AuthModuleDao authModuleDao) {
        this.authModuleDao = authModuleDao;
    }

    public AuthOperatingDao getAuthOperatingDao() {
        return authOperatingDao;
    }

    public void setAuthOperatingDao(AuthOperatingDao authOperatingDao) {
        this.authOperatingDao = authOperatingDao;
    }

    public AuthDataDao getAuthDataDao() {
        return authDataDao;
    }

    public void setAuthDataDao(AuthDataDao authDataDao) {
        this.authDataDao = authDataDao;
    }
}
