package com.iflat.system.entity;

/**
 * Created by tyriv on 2015/8/19.
 */
public class Page {

    private int page;  //页码，默认是第一页
    private int limit;  //每页显示的记录数，默认是20
    private long start;  //起始记录索引

    public Page() {
        this.page = 1;
        this.limit = 20;
        this.start = 0;
    }

    public long getStart() {
        return start;
    }

    public void setStart(long start) {
        this.start = start;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
