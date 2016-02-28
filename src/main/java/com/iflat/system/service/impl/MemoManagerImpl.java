package com.iflat.system.service.impl;

import com.iflat.system.bean.Memo;
import com.iflat.system.dao.MemoDao;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.service.MemoManager;
import com.iflat.util.Session;

/**
 * Created by tyriv on 2015/11/10.
 */
public class MemoManagerImpl implements MemoManager {

    private MemoDao memoDao;

    @Override
    public Memo save(Memo memo) throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        Memo orig = this.memoDao.get(userInfoVo.getAccount());
        int i = 0;
        memo.setAccount(userInfoVo.getAccount());
        if(orig == null) {
            i = this.memoDao.insert(memo);
        } else {
            i = this.memoDao.update(memo);
        }
        return i > 0 ? memo : null;
    }

    @Override
    public Memo get() throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        return this.memoDao.get(userInfoVo.getAccount());
    }

    public MemoDao getMemoDao() {
        return memoDao;
    }

    public void setMemoDao(MemoDao memoDao) {
        this.memoDao = memoDao;
    }
}
