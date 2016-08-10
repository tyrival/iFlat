Ext.define('iFlat.view.ss.FiveSController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-fives',

    deleteFiveS: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['fiveS.id'];
        if(id == undefined || id == '') {
            ssFiveSStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deleteFiveS.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssFiveSStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        ssFiveSStore.reload();
    },

    showFiveSEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-fivesedit');
        if(!win) {
            win = Ext.create('iFlat.view.ss.FiveSEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.ss.FiveS');
        }
        var form = win.down('form[id=ss-fivesedit-form]');
        form.loadRecord(record);
        win.show();
    },

    saveFiveSEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=ss-fivesedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'ss_saveFiveS.action',
            });
        }
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('ss-fivesedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadFiveS.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-fivesedit-attachment').setValue(path);
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
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-fivesedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-fivesedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-fivesedit-att').show();
            Ext.getCmp('ss-fivesedit-link').setHref(newValue);
        } else {
            Ext.getCmp('ss-fivesedit-att').hide();
            Ext.getCmp('ss-fivesedit-link').setHref('');
        }
    },
})