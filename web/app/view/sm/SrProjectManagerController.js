Ext.define('iFlat.view.sm.SrProjectManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srprojectmanager',

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srProjectManager.id"];
        if(id == "") {
            smSrProjectManagerStore.remove(context.record);
        }
    },

    updateSrProjectManagerRecord: function(editor, context, eOpts) {
        var record = context.record;
        record.set('srProjectManager.projName', Ext.getCmp('sm-srprojectmanager-projname').getValue());
        record.set('srProjectManager.name', Ext.getCmp('sm-srprojectmanager-name').getValue());
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_saveSrProjectManager.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    smSrProjectManagerStore.remove(record);
                }
                if(result['object']) {
                    record.set('srProjectManager.id', result['object']['id']);
                }
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteSrProjectManager: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['srProjectManager.id'];
        if(id == undefined || id == '') {
            smSrProjectManagerStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该项吗?",function(btn) {
                if(btn=="yes") {
                    Flat.util.mask('删除中...');
                    Ext.Ajax.request({
                        url: 'sm_deleteSrProjectManager.action',
                        params: record.data,
                        success: function (response, opts) {
                            Flat.util.unmask();
                            var data = Ext.JSON.decode(response.responseText);
                            Flat.util.tip(response.responseText);
                            smSrProjectManagerStore.reload();
                        },
                        success: function (response, opts) {
                            Flat.util.unmask();
                            Flat.util.tip(response.responseText);
                            smSrProjectManagerStore.reload();
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        smSrProjectManagerStore.reload();
        smSrProjectManagerProjectStore.reload();
        smSrProjectManagerUserStore.reload();
    },

    addSrProjectManagerRecord: function() {
        smSrProjectManagerRowEditing.cancelEdit();
        var srprojectmanager = Ext.create('iFlat.model.sm.SrProjectManager');
        smSrProjectManagerStore.insert(0, srprojectmanager);
        smSrProjectManagerRowEditing.startEdit(0, 0);
    },
})