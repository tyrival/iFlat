Ext.define('iFlat.view.pam.YearWorkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-yearwork',

    deleteYearWork: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['yearWork.id'];
        if(id == undefined || id == '') {
            pamYearWorkStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteYearWork.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamYearWorkStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamYearWorkStore.reload();
    },

    showYearWorkEdit: function(cmp, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pam-yearworkedit');
        if(!win) {
            win = Ext.create('iFlat.view.pam.YearWorkEdit');
        }
        if(!record) {
	        var text = cmp.getText();
	        var t = text.substring(2, 4);
            record = Ext.create('iFlat.model.pam.YearWork', {
                'yearWork.pbName' : pamYearWorkStore.getProxy().extraParams['yearWork.pbName'],
                'yearWork.type' : t,
                'yearWork.status' : '0'
            });
        }
        var form = win.down('form[id=pam-yearworkedit-form]');
        form.loadRecord(record);
        win.show();
    },

    submitYearWork: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.confirm("提示!","提交后不可修改，是否提交?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'pam_submitYearWork.action?yearWork.id=' + record.get('yearWork.id'),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamYearWorkStore.reload();
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamYearWorkStore.reload();
                    }
                })
            };
        })
    },

    saveYearWorkEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=pam-yearworkedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'pam_saveYearWork.action',
            });
        }
    },

    submitYearWorkEdit: function(button) {
        Ext.Msg.confirm("提示!","提交后不可修改，是否提交?",function(btn) {
            if(btn=="yes") {
                var win = button.up('window');
                var form = win.down('form[id=pam-yearworkedit-form]');
                form.down('textfield[name=yearWork.status]').setValue('1');
                if (form.isValid()) {
                    form.submit({
                        url :'pam_saveYearWork.action',
                    });
                }
            };
        })
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('pam-yearworkedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'pam_uploadYearWork.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('pam-yearworkedit-attachment').setValue(path);
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
                    url: 'pam_deleteFile.action?filePath=' + Ext.getCmp('pam-yearworkedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('pam-yearworkedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pam-yearworkedit-att').show();
            Ext.getCmp('pam-yearworkedit-link').setHref(newValue);
        } else {
            Ext.getCmp('pam-yearworkedit-att').hide();
            Ext.getCmp('pam-yearworkedit-link').setHref('');
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