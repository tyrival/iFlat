Ext.define('iFlat.view.pam.ActivistController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-activist',

    deleteActivist: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('activist.id');
        if(id == undefined || id == '') {
            pamActivistStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteActivist.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamActivistStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamActivistStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["activist.id"];
        if(id == "") {
            pamActivistStore.remove(context.record);
        }
    },

    updateActivistRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'pam_saveActivist.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                pamActivistStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                pamActivistStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addActivistRecord: function() {
        pamActivistRowEditing.cancelEdit();
        var activist = Ext.create('iFlat.model.pam.Activist', {
            'activist.pbName': pamActivistStore.getProxy().extraParams['activist.pbName']
        });
        pamActivistStore.insert(0, activist);
        pamActivistRowEditing.startEdit(0, 0);
    },
})