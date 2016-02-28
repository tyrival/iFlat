Ext.define('iFlat.view.bi.AdditionalBillController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bi-additionalbill',

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["additionalBill.id"];
        if(id == "") {
            biAdditionalBillStore.remove(context.record);
        }
    },

    updateAdditionalBillRecord: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'bi_saveAdditionalBill.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                debugger;
                tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    biAdditionalBillStore.remove(record);
                }
                if(result['object']) {
                    record.set('additionalBill.id', result['object']['id']);
                }
            },
            failure: function(response, opts) {
                tip(response.responseText);
            }
        });
    },

    deleteAdditionalBill: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['additionalBill.id'];
        if(id == undefined || id == '') {
            biAdditionalBillStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该项目吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'bi_deleteAdditionalBill.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                biAdditionalBillStore.remove(record);
                            }
                            tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        biAdditionalBillStore.reload();
    },

    addAdditionalBillRecord: function() {
        biAdditionalBillRowEditing.cancelEdit();
        var additionalbill = Ext.create('iFlat.model.bi.AdditionalBill');
        biAdditionalBillStore.insert(0, additionalbill);
        biAdditionalBillRowEditing.startEdit(0, 0);
    },

    uploadFile: function(btn) {
        var form = Ext.getCmp('bi-additionalbill-import');
        if (form.isValid()) {
            form.submit({
                url: 'bi_importAdditionalBill.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    biAdditionalBillStore.reload();
                    tip(o.response.responseText);
                },
                failure: function (fp, o) {
                    tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function() {
        Ext.Ajax.request({
            url: 'bi_templateAdditionalBill.action',
            method: 'post',
            success: function(response, opts) {
                window.location.href = Ext.JSON.decode(response.responseText)['object'];
            },
        });
    },
})