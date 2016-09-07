Ext.define('iFlat.view.wip.SrOsVendorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wip-srosvendor',

    deleteSrOsVendor: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('srOsVendor.id');
        if(id == undefined || id == '') {
            wipSrOsVendorStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'wip_deleteSrOsVendor.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                wipSrOsVendorStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        wipSrOsVendorStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srOsVendor.id"];
        if(id == "") {
            wipSrOsVendorStore.remove(context.record);
        }
    },

    updateSrOsVendorRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'wip_saveSrOsVendor.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                wipSrOsVendorStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                wipSrOsVendorStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addSrOsVendorRecord: function() {
        wipSrOsVendorRowEditing.cancelEdit();
        var srosvendor = Ext.create('iFlat.model.wip.SrOsVendor');
        wipSrOsVendorStore.insert(0, srosvendor);
        wipSrOsVendorRowEditing.startEdit(0, 0);
    },
})