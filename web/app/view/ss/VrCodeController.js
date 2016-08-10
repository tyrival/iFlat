Ext.define('iFlat.view.ss.VrCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-vrcode',

    deleteVrCode: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('vrCode.id');
        if(id == undefined || id == '') {
            ssVrCodeStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deleteVrCode.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssVrCodeStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        ssVrCodeStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["vrCode.id"];
        if(id == "") {
            ssVrCodeStore.remove(context.record);
        }
    },

    updateVrCodeRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'ss_saveVrCode.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                ssVrCodeStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                ssVrCodeStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addVrCodeRecord: function() {
        ssVrCodeRowEditing.cancelEdit();
        var vrcode = Ext.create('iFlat.model.ss.VrCode');
        ssVrCodeStore.insert(0, vrcode);
        ssVrCodeRowEditing.startEdit(0, 0);
    },
})