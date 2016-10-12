package com.iflat.workflow.enums;

/**
 * Created by tyriv on 2016/9/12.
 */
public enum TemplateEnum {
    UNSUBMIT(0, "未提交"),
    COMPLETE(1, "完成");

    private int index;
    private String status;

    TemplateEnum(int index, String status) {
        this.index = index;
        this.status = status;
    }

    public static TemplateEnum indexOf(int index) {
        for (TemplateEnum e: values()) {
            if (e.getIndex() == index) {
                return e;
            }
        }
        return null;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
