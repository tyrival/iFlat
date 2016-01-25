package com.iflat.book.action;

import com.iflat.book.bean.Book;
import com.iflat.book.bean.Record;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatManager;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2016/1/6.
 */
public class LibAction extends ActionSupport implements ResultAware {

    private IflatManager bookManager;
    private IflatManager recordManager;
    private Book book;
    private Record record;

    private Result result;

    /* record */
    private String saveRecord() throws Exception {
        this.result.setObject(this.recordManager.save(this.record));
        return SUCCESS;
    }

    private String deleteRecord() throws Exception {
        this.result.setObject(this.recordManager.delete(this.record));
        return SUCCESS;
    }

    private String listRecord() throws Exception {
        this.result.setList(this.recordManager.list(this.record));
        return SUCCESS;
    }

    public IflatManager getBookManager() {
        return bookManager;
    }

    public void setBookManager(IflatManager bookManager) {
        this.bookManager = bookManager;
    }

    public IflatManager getRecordManager() {
        return recordManager;
    }

    public void setRecordManager(IflatManager recordManager) {
        this.recordManager = recordManager;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Record getRecord() {
        return record;
    }

    public void setRecord(Record record) {
        this.record = record;
    }

    @Override
    public void setResult(Result result) {
        this.result = result;
    }

    public Result getResult() {
        return result;
    }
}
