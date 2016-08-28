Ext.define('iFlat.view.xr.DockPeriod', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.xr-dockperiod',
    xtype: 'xr-dockperiod',

    requires: [
        'iFlat.view.xr.DockPeriodController',
    ],

    controller: 'xr-dockperiod',
    store: dockPeriodStore = Ext.create('iFlat.store.xr.Project'),
    id: 'xr-dockperiod',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: ['->', {
            text: '刷新',
            id: 'xr-dockperiod-refresh',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        text: '详情',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '详情',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'info',
        editor: {
            xtype: 'label',
        }
    }, {
        header: '工号',
        dataIndex: 'xrProject.projNo',
        width: 220,
    }, {
        header: '船名',
        dataIndex: 'xrProject.name',
        flex: true,
    }, {
        header: '总坞期',
        dataIndex: 'xrProject.dockPeriod',
        width: 120,
    }],
});