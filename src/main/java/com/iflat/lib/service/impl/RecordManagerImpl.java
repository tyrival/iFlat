package com.iflat.lib.service.impl;

import com.iflat.lib.bean.Record;
import com.iflat.system.service.impl.IflatManagerSupport;
import com.iflat.util.Session;

import java.util.Date;
import java.util.UUID;

/**
 * Created by tyriv on 2016/1/6.
 */
public class RecordManagerImpl extends IflatManagerSupport {

    @Override
    public void beforeInsertBatch() throws Exception {
        for (int i = 0; i < super.getInsertBatchList().size(); i++) {
            Record record = (Record) super.getInsertBatchList().get(i);
            record.setId(UUID.randomUUID().toString());
            record.setStartDate(new Date());
            if (record.getBorrower() == null) {
                record.setBorrower(Session.getUserInfo().getAccount());
            }
        }
    }

    @Override
    public void setImportExcelReader() throws Exception {

    }

    @Override
    public void setImportProps() throws Exception {

    }

    @Override
    public void importValidate() throws Exception {

    }
}
