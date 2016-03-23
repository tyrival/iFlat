package com.iflat.sm.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SbSettlement;
import com.iflat.sm.bean.ScSettlement;

import java.util.List;

/**
 * Created by tyriv on 2016/3/22.
 */
public class SmAction extends BaseAction {

    private BaseService sbSettlementService;
    private SbSettlement sbSettlement;
    private List<ScSettlement> list;

    public List<ScSettlement> getList() {
        return list;
    }

    public void setList(List<ScSettlement> list) {
        this.list = list;
    }

    /* SbSettlement */
    public String save() throws Exception {
        this.result.setObject(this.sbSettlementService.save(this.sbSettlement));
        return SUCCESS;
    }

    public String delete() throws Exception {
        this.result.setObject(this.sbSettlementService.delete(this.sbSettlement));
        return SUCCESS;
    }

    public String list() throws Exception {
        this.result.setList(this.sbSettlementService.list(this.sbSettlement));
        return SUCCESS;
    }

    public String startProcess() throws Exception {
        sbSettlementService.startProcess(this.sbSettlement);
        return SUCCESS;
    }

    public BaseService getSbSettlementService() {
        return sbSettlementService;
    }

    public void setSbSettlementService(BaseService sbSettlementService) {
        this.sbSettlementService = sbSettlementService;
    }

    public SbSettlement getSbSettlement() {
        return sbSettlement;
    }

    public void setSbSettlement(SbSettlement sbSettlement) {
        this.sbSettlement = sbSettlement;
    }
}
