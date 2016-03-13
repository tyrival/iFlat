package com.iflat.sm.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SbRequest;

/**
 * Created by tyriv on 2016/3/11.
 */
public class SbRequestAction extends BaseAction {

    private BaseService sbRequestService;
    private SbRequest sbRequest;

    /* SbRequest */
    public String save() throws Exception {
        this.result.setObject(this.sbRequestService.save(this.sbRequest));
        return SUCCESS;
    }

    public String delete() throws Exception {
        this.result.setObject(this.sbRequestService.delete(this.sbRequest));
        return SUCCESS;
    }

    public String list() throws Exception {
        this.result.setList(this.sbRequestService.list(this.sbRequest));
        return SUCCESS;
    }

    public String startProcess() throws Exception {
        sbRequestService.startProcess(this.sbRequest);
        return SUCCESS;
    }

    public BaseService getSbRequestService() {
        return sbRequestService;
    }

    public void setSbRequestService(BaseService sbRequestService) {
        this.sbRequestService = sbRequestService;
    }

    public SbRequest getSbRequest() {
        return sbRequest;
    }

    public void setSbRequest(SbRequest sbRequest) {
        this.sbRequest = sbRequest;
    }
}
