package com.iflat.system.dao;

import com.iflat.system.bean.Memo;

/**
 * Created by tyriv on 2015/11/10.
 */
public interface MemoDao {
    
    public int insert(Memo Memo) throws Exception;

    public int update(Memo Memo) throws Exception;

    public Memo get(String account) throws Exception;
}
