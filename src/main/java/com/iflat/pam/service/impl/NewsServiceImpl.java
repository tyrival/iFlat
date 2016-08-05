package com.iflat.pam.service.impl;

import com.iflat.base.entity.ExcelWriter;
import com.iflat.base.service.impl.BaseServiceSupport;
import com.iflat.pam.bean.News;
import com.iflat.util.Session;

/**
 * Created by tyriv on 2016/7/29.
 */
public class NewsServiceImpl extends BaseServiceSupport {

    @Override
    protected void beforeInsert() throws Exception {
        ((News) this.saveObj).setSubmitDept(Session.getUserInfo().getPorgName());
    }

}
