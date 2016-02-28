package com.iflat.system.dao;

import com.iflat.system.bean.AuthData;
import com.iflat.system.entity.AuthClearVo;
import com.iflat.system.entity.AuthDataVo;
import com.iflat.system.entity.AuthDuplicateVo;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public interface AuthDataDao {

    public AuthData insert(AuthData authData) throws Exception;

    public int insertDuplicate(List<AuthDuplicateVo> list) throws Exception;

    public AuthData update(AuthData authData) throws Exception;

    public int delete(String adId) throws Exception;

    public int deleteByDuplicate(List<AuthDuplicateVo> list) throws Exception;

    public int deleteByClear(List<AuthClearVo> list) throws Exception;

    public AuthData get(AuthData authData) throws Exception;

    public List<AuthDataVo> listVoOfModuleByUser(AuthData authData) throws Exception;
}
