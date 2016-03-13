Ext.define('iFlat.view.sm.SbRequest', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sbrequest',

    requires: [
        'iFlat.view.sm.SbRequestController'
    ],

    controller: 'sm-sbrequest',

    store: smSbRequestStore = Ext.create('iFlat.store.sm.SbRequest'),

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        id: 'sm-sbrequest-add',
        handler: 'add'
    }, '->', {
        text: '刷新',
        id: 'sm-sbrequest-refresh',
        handler: 'refresh',
    }],

    columns: [{
        header: 'ID',
        dataIndex: 'sbRequest.id',
        width: 180,
    }, {
        header: '工号',
        dataIndex: 'sbRequest.projNo',
    }, {
        header: '船名',
        dataIndex: 'sbRequest.projName',
    }, {
        header: '工程队',
        dataIndex: 'sbRequest.team',
    }, {
        header: '状态',
        dataIndex: 'sbRequest.status',
    },{
        text: '启动流程',
        id: 'sm-sbrequest-start',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '启动流程',
        align: 'center',
        iconCls: 'x-fa fa-random',
        handler: 'start',
        editor: {
            xtype: 'label',
        }
    }],
});