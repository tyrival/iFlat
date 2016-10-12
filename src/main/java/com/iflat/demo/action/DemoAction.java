package com.iflat.demo.action;

import com.iflat.demo.bean.Book;
import com.iflat.demo.service.BookService;
import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;

public class DemoAction extends BaseAction implements ModelDriven<Page> {

    protected Page page;
    private File upload;

    private String uploadFileName;

    public Page getPage() { return page; }

    public void setPage(Page page) { this.page = page; }

    public File getUpload() { return upload; }

    public void setUpload(File upload) { this.upload = upload; }

    public String getUploadFileName() { return uploadFileName; }

    public void setUploadFileName(String uploadFileName) { this.uploadFileName = uploadFileName; }

    @Override
    public Page getModel() {
        if(page == null){
            page = new Page();
        }
        return page;
    }
    private BookService bookService;
    private Book book;

    public BookService getBookService() { return bookService; }

    public void setBookService(BookService bookService) { this.bookService = bookService; }
    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }

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

    public String listPageBook() throws Exception {
        this.result.setObject(this.bookService.listPage(this.book, this.page));
        return SUCCESS;
    }

    public String uploadBook() throws Exception {
        this.result.setObject(this.bookService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

}