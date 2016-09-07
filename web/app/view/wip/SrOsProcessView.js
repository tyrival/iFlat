Ext.define('iFlat.view.wip.SrOsProcessView', {
    extend: 'Ext.window.Window',
    alias: 'widget.wip-srosprocessview',
    title: '施工过程跟踪',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.wip.SrOsProfessionalManagerConfirmController'
    ],

    controller: 'wip-srosprofessionalmanagerconfirm',

    id: 'wip-srosprocessview',
    closeAction: 'hide',
    width: 800,
    height: 400,
    y: 20,
    items: [{
        xtype: 'grid',
        border: true,
        columnLines: true,
        scrollable: true,
        flex: 1,
        tbar: ['->', {
            text: '刷新',
            handler: 'refreshList',
        }],
        store: wipSrOsProcessViewStore = Ext.create('iFlat.store.wip.SrOsProcess'),

        columns: [{
            text: '日期',
            width: 120,
            align: 'center',
            dataIndex: 'srOsProcess.date',
            formatter: 'date("Y-m-d")',
        }, {
            text: '描述',
            flex: 1,
            align: 'left',
            dataIndex: 'srOsProcess.description',
        }]
    }],
});