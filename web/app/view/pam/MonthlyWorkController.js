Ext.define('iFlat.view.pam.MonthlyWorkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-monthlywork',

    deleteMonthlyWork: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['monthlyWork.id'];
        if(id == undefined || id == '') {
            pamMonthlyWorkStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteMonthlyWork.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamMonthlyWorkStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamMonthlyWorkStore.reload();
    },

    showMonthlyWorkEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pam-monthlyworkedit');
        if(!win) {
            win = Ext.create('iFlat.view.pam.MonthlyWorkEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.pam.MonthlyWork', {
                'monthlyWork.pbName' : pamMonthlyWorkStore.getProxy().extraParams['monthlyWork.pbName'],
                'monthlyWork.tmIsStable' : true,
                'monthlyWork.tmHasPlan' : true,
                'monthlyWork.status' : '0'
            });
        }
        var form = win.down('form[id=pam-monthlyworkedit-form]');
        form.loadRecord(record);
        win.show();
    },

    submitMonthlyWork: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.confirm("提示!","提交后不可修改，是否提交?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'pam_submitMonthlyWork.action?monthlyWork.id=' + record.get('monthlyWork.id'),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamMonthlyWorkStore.reload();
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamMonthlyWorkStore.reload();
                    }
                })
            };
        })
    },

    saveMonthlyWorkEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=pam-monthlyworkedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'pam_saveMonthlyWork.action',
            });
        }
    },

    submitMonthlyWorkEdit: function(button) {
        Ext.Msg.confirm("提示!","提交后不可修改，是否提交?",function(btn) {
            if(btn=="yes") {
                var win = button.up('window');
                var form = win.down('form[id=pam-monthlyworkedit-form]');
                form.down('textfield[name=monthlyWork.status]').setValue('1');
                if (form.isValid()) {
                    form.submit({
                        url :'pam_saveMonthlyWork.action',
                    });
                }
            };
        })
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('pam-monthlyworkedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'pam_uploadMonthlyWork.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('pam-monthlyworkedit-attachment').setValue(path);
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
                    url: 'pam_deleteFile.action?filePath=' + Ext.getCmp('pam-monthlyworkedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('pam-monthlyworkedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pam-monthlyworkedit-att').show();
            Ext.getCmp('pam-monthlyworkedit-link').setHref(newValue);
        } else {
            Ext.getCmp('pam-monthlyworkedit-att').hide();
            Ext.getCmp('pam-monthlyworkedit-link').setHref('');
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