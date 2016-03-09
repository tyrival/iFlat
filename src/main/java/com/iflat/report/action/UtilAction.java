package com.iflat.report.action;

import com.iflat.base.action.impl.BaseAction;
import com.iflat.report.service.impl.util.GraphService;
import com.iflat.report.service.impl.util.PaintService;
import com.iflat.util.Session;

/**
 * Created by tyriv on 2015/11/23.
 */
public class UtilAction extends BaseAction {

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
