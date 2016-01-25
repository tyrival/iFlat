package com.iflat.report.action;

import com.iflat.report.service.impl.util.GraphManager;
import com.iflat.report.service.impl.util.PaintManager;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2015/11/23.
 */
public class UtilAction extends ActionSupport implements ResultAware {

    private Result result;

    private GraphManager graphManager;
    private PaintManager paintManager;

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

    public GraphManager getGraphManager() {
        return graphManager;
    }

    public void setGraphManager(GraphManager graphManager) {
        this.graphManager = graphManager;
    }

    public PaintManager getPaintManager() {
        return paintManager;
    }

    public void setPaintManager(PaintManager paintManager) {
        this.paintManager = paintManager;
    }
}
