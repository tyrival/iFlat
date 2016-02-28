package com.iflat.lib.bean;

import java.util.Date;

/**
 * Created by tyriv on 2016/1/6.
 */
public class Record {

    private String id;
    private String bookId;  //书id
    private String borrower;  //借阅人
    private Date startDate;  //借阅时间
    private Date endDate;  //归还时间

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getBorrower() {
        return borrower;
    }

    public void setBorrower(String borrower) {
        this.borrower = borrower;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
