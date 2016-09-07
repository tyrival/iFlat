Ext.define('iFlat.view.wip.SrOsAssess', {
    extend: 'Ext.window.Window',
    alias: 'widget.wip-srosassess',
    title: '考核记录',
    layout: 'fit',
    modal: true,

    id: 'wip-srosassess',
    closeAction: 'hide',
    width: 800,
    height: 400,
    y: 20,
    items: [{
        xtype: 'grid',
        border: true,
        columnLines: true,
        scrollable: true,
        store: wipSrOsAssessStore = Ext.create('iFlat.store.wip.SrOsAssess'),
        flex: 1,
        columns: [{
            text: '职位',
            width: 120,
            align: 'center',
            dataIndex: 'srOsAssess.creatorRole',
        }, {
            text: '姓名',
            width: 120,
            align: 'center',
            dataIndex: 'srOsAssess.creatorName',
        }, {
            text: '意见',
            flex: 1,
            align: 'left',
            dataIndex: 'srOsAssess.description',
        }, {
            text: '分数',
            width: 120,
            dataIndex: 'srOsAssess.fineAmount',
        }, {
            text: '时间',
            width: 120,
            dataIndex: 'srOsAssess.createTime',
            formatter: 'date("Y-m-d")'
        }]
    }],
});