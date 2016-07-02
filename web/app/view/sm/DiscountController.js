Ext.define('iFlat.view.sm.DiscountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-discount',

    deleteDiscount: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('discount.id');
        if(id == undefined || id == '') {
            smDiscountStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deleteDiscount.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                smDiscountStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        smDiscountStore.reload();
        smDiscountTeamStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["discount.id"];
        if(id == "") {
            smDiscountStore.remove(context.record);
        }
    },

    updateDiscountRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'sm_saveDiscount.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                smDiscountStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                smDiscountStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addDiscountRecord: function() {
        smDiscountRowEditing.cancelEdit();
        var discount = Ext.create('iFlat.model.sm.Discount');
        smDiscountStore.insert(0, discount);
        smDiscountRowEditing.startEdit(0, 0);
    },
})