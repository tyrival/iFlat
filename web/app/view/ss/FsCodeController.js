Ext.define('iFlat.view.ss.FsCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-fscode',

    deleteFsCode: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('fsCode.id');
        if(id == undefined || id == '') {
            ssFsCodeStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deleteFsCode.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssFsCodeStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        ssFsCodeStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["fsCode.id"];
        if(id == "") {
            ssFsCodeStore.remove(context.record);
        }
    },

    updateFsCodeRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'ss_saveFsCode.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                ssFsCodeStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                ssFsCodeStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addFsCodeRecord: function() {
        ssFsCodeRowEditing.cancelEdit();
        var fscode = Ext.create('iFlat.model.ss.FsCode');
        ssFsCodeStore.insert(0, fscode);
        ssFsCodeRowEditing.startEdit(0, 0);
    },
})