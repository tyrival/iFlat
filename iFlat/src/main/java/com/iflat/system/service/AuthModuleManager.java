package com.iflat.system.service;

import com.iflat.system.bean.AuthModule;
import com.iflat.system.bean.UserRole;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public interface AuthModuleManager {

    public AuthModule save(AuthModule authModule) throws Exception;

    public int saveBatch(String authModuleVoList) throws Exception;

    public List<AuthModule> list(AuthModule authModule) throws Exception;

    public int duplicateAuthority(String authDuplicateList) throws Exception;

    public int clearAuthority(String authClearList) throws Exception;
}
