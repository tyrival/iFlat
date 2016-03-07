package com.iflat.system.service.impl;

import com.iflat.system.dao.AuthOperatingDao;
import com.iflat.system.entity.AuthOperatingVo;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.AuthOperatingService;
import com.iflat.util.JSONHelper;
import com.iflat.util.Session;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by tyriv on 2015/10/8.
 */
public class AuthOperatingServiceImpl implements AuthOperatingService {

    private AuthOperatingDao authOperatingDao;

    @Override
    public int saveBatch(String authOperatingVoList) throws Exception {

        //获取所有前台传递的数据
        List<AuthOperatingVo> list = (List<AuthOperatingVo>) JSONHelper.jsonToList(authOperatingVoList, "com.iflat.system.entity.AuthOperatingVo");
        List<AuthOperatingVo> createList = new ArrayList<AuthOperatingVo>();
        List<AuthOperatingVo> updateList = new ArrayList<AuthOperatingVo>();
        //将数据按照amId是否为空，分为新增或修改两个list
        for(int i = 0; i < list.size(); i++) {
            if("".equals(list.get(i).getAoId()) || list.get(i).getAoId() == null) {
                list.get(i).setAoId(UUID.randomUUID().toString());
                createList.add(list.get(i));
            } else {
                updateList.add(list.get(i));
            }
        }
        int result = 0;
        //对两个list分别执行批量新增和修改操作
        result = createList.size() != 0 ? result + this.authOperatingDao.insertBatch(createList) : result;
        result = updateList.size() != 0 ? result + this.authOperatingDao.updateBatch(updateList) : result;
        return result;
    }

    @Override
    public List<AuthOperatingVo> listVoByAuthOperatingVo(AuthOperatingVo authOperatingVo) throws Exception {
        return this.authOperatingDao.listVoByAuthOperatingVo(authOperatingVo);
    }

    @Override
    public List<AuthOperatingVo> listVoOfModuleByUser(AuthOperatingVo authOperatingVo) throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        authOperatingVo.setRoleId(userInfoVo.getRoleId());
        authOperatingVo.setAccount(userInfoVo.getAccount());
        return this.authOperatingDao.listVoOfModuleByUser(authOperatingVo);
    }

    public AuthOperatingDao getAuthOperatingDao() {
        return authOperatingDao;
    }

    public void setAuthOperatingDao(AuthOperatingDao authOperatingDao) {
        this.authOperatingDao = authOperatingDao;
    }
}
