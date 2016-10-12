Ext.define('iFlat.view.ss.PotentialHazardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-potentialhazard',

    deletePotentialHazard: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['potentialHazard.id'];
        if(id == undefined || id == '') {
            ssPotentialHazardStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deletePotentialHazard.action',
                        params: {
                            'potentialHazard.id': id,
                        },
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssPotentialHazardStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        ssPotentialHazardStore.reload();
    },

    showPotentialHazardEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-potentialhazardedit');
        if(!win) {
            win = Ext.create('iFlat.view.ss.PotentialHazardEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.ss.PotentialHazard');
        }
        var form = win.down('form[id=ss-potentialhazardedit-form]');
        form.loadRecord(record);
        win.show();
    },

    savePotentialHazardEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=ss-potentialhazardedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'ss_savePotentialHazard.action',
            });
        }
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('ss-potentialhazardedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadPotentialHazard.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-potentialhazardedit-attachment').setValue(path);
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
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-potentialhazardedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-potentialhazardedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-potentialhazardedit-att').show();
            Ext.getCmp('ss-potentialhazardedit-link').setHref(newValue);
        } else {
            Ext.getCmp('ss-potentialhazardedit-att').hide();
            Ext.getCmp('ss-potentialhazardedit-link').setHref('');
        }
    },

    uploadAttachment2: function(btn) {
        var form = Ext.getCmp('ss-potentialhazardedit-upload2');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadPotentialHazard.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-potentialhazardedit-attachment2').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment2: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除整改后照片吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-potentialhazardedit-attachment2').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-potentialhazardedit-attachment2').setValue('');

            };
        })
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-potentialhazardedit-att2').show();
            Ext.getCmp('ss-potentialhazardedit-link2').setHref(newValue);
        } else {
            Ext.getCmp('ss-potentialhazardedit-att2').hide();
            Ext.getCmp('ss-potentialhazardedit-link2').setHref('');
        }
    },

    uploadFile: function(btn) {
        var form = btn.previousSibling('form');
        if (form.isValid()) {
            form.submit({
                url: 'ss_importPotentialHazard.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    ssPotentialHazardStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'ss_templatePotentialHazard.action',
            method: 'post',
            success: function(response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        });
    },
})