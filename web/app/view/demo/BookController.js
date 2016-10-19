Ext.define('iFlat.view.demo.BookController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.demo-book',

    showBookEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('demo-bookedit');
        if(!win) {
            win = Ext.create('iFlat.view.demo.BookEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.demo.Book');
        }
        var form = win.down('form[id=demo-bookedit-form]');
        form.loadRecord(record);
        win.show();
    },

    deleteBook: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['book.id'];
        if(id == undefined || id == '') {
            demoBookStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'demo_deleteBook.action',
                        params: {
                            'book.id': id
                        },
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {

                                demoBookStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }

    },

    refreshList: function(btn) {
        btn.up('grid').getStore().reload();
    },

    saveBookEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=demo-bookedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'demo_saveBook.action',
                success: function (form, action) {
                    Flat.util.tip(action.response.responseText);
                    var obj = Ext.JSON.decode(action.response.responseText)['object'];
                    if (!Flat.util.isEmpty(obj)) {
                        var id = obj['id'];
                        win.down('textfield[name=book.id]').setValue(id);
                        win.close();
                    }
                },
                failure: function (form, action) {
                    Flat.util.tip(action.response.responseText);
                }
            });
        }
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('demo-bookedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'demo_uploadBook.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('demo-bookedit-attachment').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'demo_deleteFile.action?filePath=' + Ext.getCmp('demo-bookedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('demo-bookedit-attachment').setValue('');
            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('demo-bookedit-att').show();
            Ext.getCmp('demo-bookedit-link').setHref(newValue);
        } else {
            Ext.getCmp('demo-bookedit-att').hide();
            Ext.getCmp('demo-bookedit-link').setHref('');
        }
    },

    addDetail: function(btn) {
        demoBookDetlRowEditing.cancelEdit();
        var rec = Ext.create('iFlat.model.demo.BookDetl',{
            'bookDetl.pid': Ext.getCmp('demo-book-id').getValue(),
        });
        demoBookDetlStore.insert(0, book);
        demoBookDetlRowEditing.startEdit(0, 0);
    },

    updateDetail: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'demo_saveBookDetl.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                demoBookDetlStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                demoBookDetlStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteDetail: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('bookDetl.id');
        if(id == undefined || id == '') {
            demoBookDetlStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'demo_deleteBookDetl.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                demoBookDetlStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["bookDetl.id"];
        if(id == "") {
            demoBookDetlStore.remove(context.record);
        }
    },

    editClose: function () {
        demoBookStore.reload();
    },
})
