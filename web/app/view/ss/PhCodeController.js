Ext.define('iFlat.view.ss.PhCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-phcode',

    deletePhCode: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('phCode.id');
        if(id == undefined || id == '') {
            ssPhCodeStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deletePhCode.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssPhCodeStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        ssPhCodeStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["phCode.id"];
        if(id == "") {
            ssPhCodeStore.remove(context.record);
        }
    },

    updatePhCodeRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'ss_savePhCode.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                ssPhCodeStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                ssPhCodeStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addPhCodeRecord: function() {
        ssPhCodeRowEditing.cancelEdit();
        var phcode = Ext.create('iFlat.model.ss.PhCode');
        ssPhCodeStore.insert(0, phcode);
        ssPhCodeRowEditing.startEdit(0, 0);
    },
})