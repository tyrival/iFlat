Ext.define('iFlat.view.ss.FiveSDstrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-fivesdstr',

    refreshList: function() {
        ssFiveSDstrStore.reload();
    },

    showFiveSEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-fivesdstredit');
        if(!win) {
            win = Ext.create('iFlat.view.ss.FiveSDstrEdit');
        }
        var form = win.down('form[id=ss-fivesdstredit-form]');
        var form2 = win.down('form[id=ss-fivesdstredit-form2]');
        form.loadRecord(record);
        form2.loadRecord(record);
        win.show();
    },

    saveFiveSEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=ss-fivesdstredit-form2]');
        if (form.isValid()) {
            form.submit({
                url :'ss_saveFiveS.action',
            });
        }
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-fivesdstredit-att').show();
            Ext.getCmp('ss-fivesdstredit-link').setHref(newValue);
        } else {
            Ext.getCmp('ss-fivesdstredit-att').hide();
            Ext.getCmp('ss-fivesdstredit-link').setHref('');
        }
    },

    uploadAttachment2: function(btn) {
        var form = Ext.getCmp('ss-fivesdstredit-upload2');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadFiveS.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-fivesdstredit-attachment2').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment2: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除整改照片吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-fivesdstredit-attachment2').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-fivesdstredit-attachment2').setValue('');

            };
        })
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-fivesdstredit-att2').show();
            Ext.getCmp('ss-fivesdstredit-link2').setHref(newValue);
        } else {
            Ext.getCmp('ss-fivesdstredit-att2').hide();
            Ext.getCmp('ss-fivesdstredit-link2').setHref('');
        }
    },
})