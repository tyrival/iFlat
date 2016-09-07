Ext.define('iFlat.view.wip.SrOsProcessEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.wip-srosprocessedit',
    title: '施工过程跟踪',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.wip.SrOsManufactureController'
    ],

    controller: 'wip-srosmanufacture',

    id: 'wip-srosprocessedit',
    closeAction: 'hide',
    width: 800,

    height: 350,
    y: 20,
    items: [{
        xtype: 'textfield',
        fieldLabel: 'ID',
        name: 'srOutsource.id',
        hidden: true,
    }, {
        xtype: 'grid',
        border: true,
        columnLines: true,
        flex: 1,
        tbar: [{
            text: '新增',
            ui: 'orig-blue',
            handler: 'addRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
        store: wipSrOsProcessEditStore = Ext.create('iFlat.store.wip.SrOsProcess'),
        plugins: [
            wipSrOsProcessEditRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                pluginId: 'wip-wipsrosprocessedit-edit',
                clicksToMoveEditor: 1,
                autoCancel: true,
                listeners: {
                    edit: 'updateRecord',
                    cancelEdit: 'deleteEmptyRecord',
                }
            })
        ],

        columns: [{
            text: '日期',
            width: 120,
            align: 'center',
            dataIndex: 'srOsProcess.date',
            formatter: 'date("Y-m-d")',
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'Y-m-d',
            }
        }, {
            text: '描述',
            flex: 1,
            align: 'left',
            dataIndex: 'srOsProcess.description',
            editor: {
            }
        }, {
            text: '删除',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '删除',
            align: 'center',
            iconCls: 'x-fa fa-close',
            handler: 'deleteRecord',
            editor: {
                xtype: 'label',
            }
        }]
    }],
});