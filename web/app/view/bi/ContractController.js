Ext.define('iFlat.view.bi.ContractController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bi-contract',

    deleteContract: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['contract.id'];
        if(id == undefined || id == '') {
            biContractStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该合同信息吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'bi_deleteContract.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                biContractStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        biContractStore.reload();
        if(biContractEditComboStore) {
            biContractStore.reload();
        }
    },
    
    showContractEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('bi-contractedit');
        if(!win) {
            win = Ext.create('iFlat.view.bi.ContractEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.bi.Contract', {
                'contract.version': 1,
            });
        }
        win.down('form').loadRecord(record);
        win.show();
    },

    submitContractEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'bi_saveContract.action',
            success: function(form, action) {
                win.hide();
                biContractStore.reload();
                Flat.util.tip(action.response.responseText);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });

    },
})