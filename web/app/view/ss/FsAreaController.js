Ext.define('iFlat.view.ss.FsAreaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-fsarea',

    deleteFsArea: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('fsArea.id');
        if(id == undefined || id == '') {
            ssFsAreaStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deleteFsArea.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssFsAreaStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        ssFsAreaStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["fsArea.id"];
        if(id == "") {
            ssFsAreaStore.remove(context.record);
        }
    },

    updateFsAreaRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'ss_saveFsArea.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                ssFsAreaStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                ssFsAreaStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addFsAreaRecord: function() {
        ssFsAreaRowEditing.cancelEdit();
        var fsarea = Ext.create('iFlat.model.ss.FsArea');
        ssFsAreaStore.insert(0, fsarea);
        ssFsAreaRowEditing.startEdit(0, 0);
    },
})