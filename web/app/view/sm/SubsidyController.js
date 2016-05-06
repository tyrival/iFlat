Ext.define('iFlat.view.sm.SubsidyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-subsidy',

    deleteSubsidy: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('subsidy.id');
        if(id == undefined || id == '') {
            smSubsidyStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deleteSubsidy.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                smSubsidyStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        smSubsidyStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["subsidy.id"];
        if(id == "") {
            smSubsidyStore.remove(context.record);
        }
    },

    updateSubsidyRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'sm_saveSubsidy.action',
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

    addSubsidyRecord: function() {
        smSubsidyRowEditing.cancelEdit();
        var subsidy = Ext.create('iFlat.model.sm.Subsidy');
        smSubsidyStore.insert(0, subsidy);
        smSubsidyRowEditing.startEdit(0, 0);
    },
})