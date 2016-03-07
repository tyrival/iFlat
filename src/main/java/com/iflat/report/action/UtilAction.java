package com.iflat.report.action;

import com.iflat.report.service.impl.util.GraphService;
import com.iflat.report.service.impl.util.PaintService;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2015/11/23.
 */
public class UtilAction extends ActionSupport implements ResultAware {

    private Result result;

    private GraphService graphService;
    private PaintService paintService;

    /* 画图板 */
    public String paint() throws Exception {
        if(Session.getUserInfo() != null) {
            return "paint";
        } else {
            return SUCCESS;
        }
    }



    public Result getResult() {
        return result;
    }

    @Override
    public void setResult(Result result) {
        this.result = result;
    }

    public GraphService getGraphService() {
        return graphService;
    }

    public void setGraphService(GraphService graphService) {
        this.graphService = graphService;
    }

    public PaintService getPaintService() {
        return paintService;
    }

    public void setPaintService(PaintService paintService) {
        this.paintService = paintService;
    }
}
