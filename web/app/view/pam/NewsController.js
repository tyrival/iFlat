Ext.define('iFlat.view.pam.NewsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-news',

    deleteNews: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['news.id'];
        if(id == undefined || id == '') {
            pamNewsStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteNews.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamNewsStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamNewsStore.reload();
    },

    showNewsEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pam-newsedit');
        if(!win) {
            win = Ext.create('iFlat.view.pam.NewsEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.pam.News', {
                'news.status' : '未提交'
            });
        }
        var form = win.down('form[id=pam-newsedit-form]');
        form.loadRecord(record);
        win.show();
    },

    submitNews: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.confirm("提示!","提交后不可修改，是否提交?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'pam_submitNews.action?news.id=' + record.get('news.id'),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamNewsStore.reload();
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamNewsStore.reload();
                    }
                })
            };
        })
    },

    saveNewsEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=pam-newsedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'pam_saveNews.action',
            });
        }
    },

    submitNewsEdit: function(button) {
        Ext.Msg.confirm("提示!","提交后不可修改，是否提交?",function(btn) {
            if(btn=="yes") {
                var win = button.up('window');
                var form = win.down('form[id=pam-newsedit-form]');
                if (form.isValid()) {
                    form.submit({
                        url :'pam_submitNews.action',
                    });
                }
            };
        })
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('pam-newsedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'pam_uploadNews.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('pam-newsedit-attachment').setValue(path);
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
                    url: 'pam_deleteFile.action?filePath=' + Ext.getCmp('pam-newsedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('pam-newsedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pam-newsedit-att').show();
            Ext.getCmp('pam-newsedit-link').setHref(newValue);
        } else {
            Ext.getCmp('pam-newsedit-att').hide();
            Ext.getCmp('pam-newsedit-link').setHref('');
        }
    },

    exportBatch: function(btn) {
        Ext.Ajax.request({
            params: {
                downloadFileList: '',
                downloadFileName: ''
            },
            url: 'pam_downloadBatch.action',
            success: function (response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        })
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '新闻',
            fileName: '新闻.xls',
        })
    }
})