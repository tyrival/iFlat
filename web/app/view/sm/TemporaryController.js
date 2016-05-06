Ext.define('iFlat.view.sm.TemporaryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-temporary',

    deleteTemporary: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('temporary.id');
        if(id == undefined || id == '') {
            smTemporaryStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deleteTemporary.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                smTemporaryStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        smTemporaryStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["temporary.id"];
        if(id == "") {
            smTemporaryStore.remove(context.record);
        }
    },

    updateTemporaryRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'sm_saveTemporary.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    addTemporaryRecord: function() {
        smTemporaryRowEditing.cancelEdit();
        var temporary = Ext.create('iFlat.model.sm.Temporary');
        smTemporaryStore.insert(0, temporary);
        smTemporaryRowEditing.startEdit(0, 0);
    },
})