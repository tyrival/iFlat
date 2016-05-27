Ext.define('iFlat.view.sm.OutsourcingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-outsourcing',

    deleteOutsourcing: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('outsourcing.id');
        if(id == undefined || id == '') {
            smOutsourcingStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deleteOutsourcing.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                smOutsourcingStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        smOutsourcingStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["outsourcing.id"];
        if(id == "") {
            smOutsourcingStore.remove(context.record);
        }
    },

    updateOutsourcingRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'sm_saveOutsourcing.action',
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

    addOutsourcingRecord: function() {
        smOutsourcingRowEditing.cancelEdit();
        var outsourcing = Ext.create('iFlat.model.sm.Outsourcing');
        smOutsourcingStore.insert(0, outsourcing);
        smOutsourcingRowEditing.startEdit(0, 0);
    },
})