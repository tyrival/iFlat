Ext.define('iFlat.view.xr.DockPeriodDetl', {
    extend: 'Ext.window.Window',
    alias: 'widget.xr-dockperioddetl',
    title: '坞期',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.xr.DockPeriodController',
    ],
    controller: 'xr-dockperiod',
    listeners: {
        close: function () {
            dockPeriodStore.reload();
            xrDockPeriodDetlStore.removeAll();
        }
    },
    id: 'xr-dockperioddetl',
    closeAction: 'hide',
    width: 800,
    height: '95%',
    y: 20,
    items: [{
        xtype: 'container',
        layout: 'hbox',
        hidden: true,
        items: [{
            xtype: 'textfield',
            name: 'xrProject.projNo',
            id: 'xr-dockperioddetl-projno',
            fieldLabel: '工号',
            editable: false,
        }]
    }, {
        xtype: 'grid',
        border: true,
        columnLines: true,
        flex: 1,
        store: xrDockPeriodDetlStore = Ext.create('iFlat.store.xr.DockPeriod'),
        plugins: [
            dockPeriodRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToMoveEditor: 1,
                autoCancel: true,
                listeners: {
                    edit: 'updateDockPeriodRecord',
                    cancelEdit: 'deleteEmptyRecord',
                }
            })
        ],

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            overflowHandler: 'scroller',
            items: [{
                text: '新增',
                handler: 'addDockPeriodRecord',
            }],
        }],

        columns: [{
            text: '进坞',
            flex: 1,
            dataIndex: 'dockPeriod.inDock',
            formatter: 'date("Y-m-d")',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
        }, {
            text: '出坞',
            flex: 1,
            dataIndex: 'dockPeriod.outDock',
            formatter: 'date("Y-m-d")',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
        }, {
            text: '坞期',
            flex: 1,
            dataIndex: 'dockPeriod.period',
        }, {
            text: '删除',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '删除',
            align: 'center',
            iconCls: 'x-fa fa-close',
            handler: 'deleteDockPeriod',
            editor: {
                xtype: 'label',
            }
        }]
    }],
});