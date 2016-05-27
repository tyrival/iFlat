Ext.define('iFlat.view.sm.PaymentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-payment',

    deletePayment: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('payment.id');
        if(id == undefined || id == '') {
            smPaymentStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deletePayment.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                smPaymentStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        smPaymentStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["payment.id"];
        if(id == "") {
            smPaymentStore.remove(context.record);
        }
    },

    updatePaymentRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'sm_savePayment.action',
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

    addPaymentRecord: function() {
        smPaymentRowEditing.cancelEdit();
        var payment = Ext.create('iFlat.model.sm.Payment');
        smPaymentStore.insert(0, payment);
        smPaymentRowEditing.startEdit(0, 0);
    },
})