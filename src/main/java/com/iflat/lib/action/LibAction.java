package com.iflat.lib.action;

import com.iflat.lib.bean.Book;
import com.iflat.lib.bean.Record;
import com.iflat.system.action.ResultAware;
import com.iflat.system.entity.Result;
import com.iflat.system.service.IflatService;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by tyriv on 2016/1/6.
 */
public class LibAction extends ActionSupport implements ResultAware {

    private IflatService bookService;
    private IflatService recordService;
    private Book book;
    private Record record;

    private Result result;

    /* book */
    public String saveBook() throws Exception {
        this.result.setObject(this.bookService.save(this.book));
        return SUCCESS;
    }

    public String deleteBook() throws Exception {
        this.result.setObject(this.bookService.delete(this.book));
        return SUCCESS;
    }

    public String listBook() throws Exception {
        this.result.setList(this.bookService.list(this.book));
        return SUCCESS;
    }

    /* record */
    public String saveRecord() throws Exception {
        this.result.setObject(this.recordService.save(this.record));
        return SUCCESS;
    }

    public String deleteRecord() throws Exception {
        this.result.setObject(this.recordService.delete(this.record));
        return SUCCESS;
    }

    public String listRecord() throws Exception {
        this.result.setList(this.recordService.list(this.record));
        return SUCCESS;
    }

    public IflatService getBookService() {
        return bookService;
    }

    public void setBookService(IflatService bookService) {
        this.bookService = bookService;
    }

    public IflatService getRecordService() {
        return recordService;
    }

    public void setRecordService(IflatService recordService) {
        this.recordService = recordService;
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
