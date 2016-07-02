Ext.define('iFlat.view.system.ReleaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system-release',

    deleteRelease: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('release.id');
        if(id == undefined || id == '') {
            systemReleaseStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'system_deleteRelease.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                systemReleaseStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        systemReleaseStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["release.id"];
        if(id == "") {
            systemReleaseStore.remove(context.record);
        }
    },

    updateReleaseRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'system_saveRelease.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                systemReleaseStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                systemReleaseStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addReleaseRecord: function() {
        systemReleaseRowEditing.cancelEdit();
        var release = Ext.create('iFlat.model.system.Release');
        systemReleaseStore.insert(0, release);
        systemReleaseRowEditing.startEdit(0, 0);
    },
})