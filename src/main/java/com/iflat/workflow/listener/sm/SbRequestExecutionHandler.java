package com.iflat.workflow.listener.sm;

import com.iflat.base.service.BaseService;
import com.iflat.sm.bean.SbRequest;
import com.iflat.util.Application;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;

/**
 * Created by tyriv on 2016/3/16.
 */
public class SbRequestExecutionHandler implements ExecutionListener {

    @Override
    public void notify(DelegateExecution execution) throws Exception {

        // 获取业务单据id
        String id = (String) execution.getVariable("id");

        // 获取业务对象，将其状态置为完成，并保存
        BaseService baseService = (BaseService) Application.getSpringContext().getBean("sbRequestService", BaseService.class);
        SbRequest param = new SbRequest();
        param.setId(id);
        SbRequest sbRequest = (SbRequest) baseService.list(param).get(0);
        if (sbRequest != null) {
            sbRequest.setStatus(2);
            baseService.save(sbRequest);
        }
    }
}
