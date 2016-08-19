Ext.define('iFlat.view.xr.SrProjectMgrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-srprojectmgr',

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srProjectMgr.id"];
        if(id == "") {
            xrSrProjectMgrStore.remove(context.record);
        }
    },

    updateSrProjectMgrRecord: function(editor, context, eOpts) {
        var record = context.record;
        record.set('srProjectMgr.projName', Ext.getCmp('xr-srprojectmgr-projname').getValue());
        record.set('srProjectMgr.name', Ext.getCmp('xr-srprojectmgr-name').getValue());
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'xr_saveSrProjectMgr.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    xrSrProjectMgrStore.remove(record);
                }
                if(result['object']) {
                    record.set('srProjectMgr.id', result['object']['id']);
                }
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteSrProjectMgr: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['srProjectMgr.id'];
        if(id == undefined || id == '') {
            xrSrProjectMgrStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该项吗?",function(btn) {
                if(btn=="yes") {
                    Flat.util.mask('删除中...');
                    Ext.Ajax.request({
                        url: 'xr_deleteSrProjectMgr.action',
                        params: record.data,
                        success: function (response, opts) {
                            Flat.util.unmask();
                            var data = Ext.JSON.decode(response.responseText);
                            Flat.util.tip(response.responseText);
                            xrSrProjectMgrStore.reload();
                        },
                        success: function (response, opts) {
                            Flat.util.unmask();
                            Flat.util.tip(response.responseText);
                            xrSrProjectMgrStore.reload();
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        xrSrProjectMgrStore.reload();
        xrSrProjectMgrProjectStore.reload();
        xrSrProjectMgrUserStore.reload();
    },

    addSrProjectMgrRecord: function() {
        xrSrProjectMgrRowEditing.cancelEdit();
        var srprojectmgr = Ext.create('iFlat.model.xr.SrProjectMgr');
        xrSrProjectMgrStore.insert(0, srprojectmgr);
        xrSrProjectMgrRowEditing.startEdit(0, 0);
    },
})