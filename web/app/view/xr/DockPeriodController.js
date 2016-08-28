Ext.define('iFlat.view.xr.DockPeriodController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-dockperiod',

    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('xr-dockperioddetl');
        if (!win) {
            win = Ext.create('iFlat.view.xr.DockPeriodDetl');
        }
        var projNo = record.get('xrProject.projNo');
        Ext.getCmp('xr-dockperioddetl-projno').setValue(projNo)
        xrDockPeriodDetlStore.getProxy().extraParams['dockPeriod.projNo'] = projNo;
        xrDockPeriodDetlStore.reload();
        win.show();
    },

    refreshList: function() {
        dockPeriodStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["dockPeriod.id"];
        if(id == "") {
            xrDockPeriodDetlStore.remove(context.record);
        }
    },

    updateDockPeriodRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'xr_saveDockPeriod.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                xrDockPeriodDetlStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                xrDockPeriodDetlStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addDockPeriodRecord: function() {
        dockPeriodRowEditing.cancelEdit();
        var dockperiod = Ext.create('iFlat.model.xr.DockPeriod', {
            'dockPeriod.projNo': Ext.getCmp('xr-dockperioddetl-projno').getValue()
        });
        xrDockPeriodDetlStore.insert(0, dockperiod);
        dockPeriodRowEditing.startEdit(0, 0);
    },

    deleteDockPeriod: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('dockPeriod.id');
        if(id == undefined || id == '') {
            xrDockPeriodDetlStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'xr_deleteDockPeriod.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                xrDockPeriodDetlStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

})