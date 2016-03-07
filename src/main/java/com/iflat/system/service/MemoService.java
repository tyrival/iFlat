package com.iflat.system.service;

import com.iflat.system.bean.Memo;

/**
 * Created by tyriv on 2015/11/10.
 */
public interface MemoService {

    public Memo save(Memo Memo) throws Exception;

    public Memo get() throws Exception;
}
