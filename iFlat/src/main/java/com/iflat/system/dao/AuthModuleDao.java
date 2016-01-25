package com.iflat.system.dao;

import com.iflat.system.bean.AuthModule;
import com.iflat.system.entity.AuthClearVo;
import com.iflat.system.entity.AuthDuplicateVo;
import com.iflat.system.entity.AuthModuleVo;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public interface AuthModuleDao {

    public AuthModule insert(AuthModule authModule) throws Exception;

    public int insertBatch(List<AuthModuleVo> list) throws Exception;

    public int insertDuplicate(List<AuthDuplicateVo> list) throws Exception;

    public AuthModule update(AuthModule authModule) throws Exception;

    public int updateBatch(List<AuthModuleVo> list) throws Exception;

    public int deleteByDuplicate(List<AuthDuplicateVo> list) throws Exception;

    public int deleteByClear(List<AuthClearVo> list) throws Exception;

    public List<AuthModule> list(AuthModule authModule) throws Exception;
}
