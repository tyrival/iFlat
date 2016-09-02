Ext.define('iFlat.view.ss.ViolateRegulationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-violateregulation',

    deleteViolateRegulation: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['violateRegulation.id'];
        if(id == undefined || id == '') {
            ssViolateRegulationStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deleteViolateRegulation.action',
                        params: {
                            'violateRegulation.id': id
                        },
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssViolateRegulationStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        ssViolateRegulationStore.reload();
    },

    showViolateRegulationEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-violateregulationedit');
        if(!win) {
            win = Ext.create('iFlat.view.ss.ViolateRegulationEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.ss.ViolateRegulation');
        }
        var form = win.down('form[id=ss-violateregulationedit-form]');
        form.loadRecord(record);
        win.show();
    },

    saveViolateRegulationEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=ss-violateregulationedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'ss_saveViolateRegulation.action',
            });
        }
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('ss-violateregulationedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadViolateRegulation.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-violateregulationedit-attachment').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除隐患照片吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-violateregulationedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-violateregulationedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-violateregulationedit-att').show();
            Ext.getCmp('ss-violateregulationedit-link').setHref(newValue);
        } else {
            Ext.getCmp('ss-violateregulationedit-att').hide();
            Ext.getCmp('ss-violateregulationedit-link').setHref('');
        }
    },

    uploadAttachment2: function(btn) {
        var form = Ext.getCmp('ss-violateregulationedit-upload2');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadViolateRegulation.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-violateregulationedit-attachment2').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment2: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除隐患照片吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-violateregulationedit-attachment2').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-violateregulationedit-attachment2').setValue('');

            };
        })
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-violateregulationedit-att2').show();
            Ext.getCmp('ss-violateregulationedit-link2').setHref(newValue);
        } else {
            Ext.getCmp('ss-violateregulationedit-att2').hide();
            Ext.getCmp('ss-violateregulationedit-link2').setHref('');
        }
    },

})