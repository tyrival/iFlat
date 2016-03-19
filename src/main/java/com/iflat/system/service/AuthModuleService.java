package com.iflat.system.service;

import com.iflat.system.bean.AuthModule;
import com.iflat.system.bean.Module;
import com.iflat.system.bean.UserRole;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public interface AuthModuleService {

    AuthModule save(AuthModule authModule) throws Exception;

    int saveBatch(String authModuleVoList) throws Exception;

    List<AuthModule> list(AuthModule authModule) throws Exception;

    int duplicateAuthority(String authDuplicateList) throws Exception;

    int clearAuthority(String authClearList) throws Exception;

    int updateCascadeWithModuleChange(Module oldModule, Module newModule) throws Exception;
}
