package com.iflat.system.dao;

import com.iflat.system.bean.AuthOperating;
import com.iflat.system.entity.AuthClearVo;
import com.iflat.system.entity.AuthDuplicateVo;
import com.iflat.system.entity.AuthOperatingVo;

import java.util.List;

/**
 * Created by tyriv on 2015/10/8.
 */
public interface AuthOperatingDao {

    public int insertBatch(List<AuthOperatingVo> authOperatingVoList) throws Exception;

    public int insertDuplicate(List<AuthDuplicateVo> list) throws Exception;

    public int updateBatch(List<AuthOperating> authOperatingList) throws Exception;
    public int updateBatchVo(List<AuthOperatingVo> authOperatingVoList) throws Exception;

    public int deleteByDuplicate(List<AuthDuplicateVo> list) throws Exception;

    public int deleteByClear(List<AuthClearVo> list) throws Exception;

    public List<AuthOperatingVo> listVoByAuthOperatingVo(AuthOperatingVo authOperatingVo) throws Exception;

    public List<AuthOperating> list(AuthOperating authOperating) throws Exception;

    public List<AuthOperatingVo> listVoOfModuleByUser(AuthOperatingVo authOperatingVo) throws Exception;
}
