package com.iflat.system.service;

import com.iflat.system.bean.AuthOperating;
import com.iflat.system.bean.UserRole;
import com.iflat.system.entity.AuthOperatingVo;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public interface AuthOperatingManager {

    public int saveBatch(String authOperatingVoList) throws Exception;

    public List<AuthOperatingVo> listVoByAuthOperatingVo(AuthOperatingVo authOperatingVo) throws Exception;

    public List<AuthOperatingVo> listVoOfModuleByUser(AuthOperatingVo authOperatingVo) throws Exception;

}
