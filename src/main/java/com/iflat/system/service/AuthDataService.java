package com.iflat.system.service;

import com.iflat.system.bean.AuthData;
import com.iflat.system.bean.Module;
import com.iflat.system.bean.UserRole;
import com.iflat.system.entity.AuthDataFieldVo;
import com.iflat.system.entity.AuthDataVo;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public interface AuthDataService {

    AuthData save(AuthData authData) throws Exception;

    List<AuthDataFieldVo> listAuthDataFieldStatus(AuthData authData) throws Exception;

    List<AuthDataVo> listVoOfModuleByUser(AuthData authData) throws Exception;

    void updateCascadeWithModuleChange(Module oldModule, Module newModule) throws Exception;
}
