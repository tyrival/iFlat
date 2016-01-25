package com.iflat.system.service;

import com.iflat.system.bean.AuthData;
import com.iflat.system.bean.UserRole;
import com.iflat.system.entity.AuthDataFieldVo;
import com.iflat.system.entity.AuthDataVo;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public interface AuthDataManager {

    public AuthData save(AuthData authData) throws Exception;

    public List<AuthDataFieldVo> listAuthDataFieldStatus(AuthData authData) throws Exception;

    public List<AuthDataVo> listVoOfModuleByUser(AuthData authData) throws Exception;
}
