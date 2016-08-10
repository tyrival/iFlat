Ext.define('iFlat.view.pam.MonthlyWorkView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-monthlywork',
    xtype: 'pam-monthlywork',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'pam-monthlywork',
    store: pamMonthlyWorkViewStore = Ext.create('iFlat.store.pam.MonthlyWorkView'),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            width: 200,
            labelAlign: 'right',
            labelWidth: 60,
            id: 'pam-monthlyworkview-month',
            format: 'Y-m',
            fieldLabel: '月份'
        }, {
            text: '查询',
            ui: 'orig-blue',
            handler: 'search',
        }, '->', {
            text: '导出',
            handler: 'exportBatch',
        }, {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],
    columns: [{
        header: '党支部',
        dataIndex: 'monthlyWorkView.pbName',
        flex: 1
    },{
        header: '状态',
        dataIndex: 'monthlyWorkView.status',
        flex: 1
    }],

});