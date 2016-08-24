Ext.define('iFlat.view.xr.DiscountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-discount',

    deleteDiscount: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('xrDiscount.id');
        if(id == undefined || id == '') {
            xrDiscountStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'xr_deleteDiscount.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                xrDiscountStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        xrDiscountStore.reload();
        xrDiscountTeamStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["xrDiscount.id"];
        if(id == "") {
            xrDiscountStore.remove(context.record);
        }
    },

    updateDiscountRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'xr_saveDiscount.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                xrDiscountStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                xrDiscountStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addDiscountRecord: function() {
        xrDiscountRowEditing.cancelEdit();
        var discount = Ext.create('iFlat.model.xr.Discount');
        xrDiscountStore.insert(0, discount);
        xrDiscountRowEditing.startEdit(0, 0);
    },
})