Ext.define('iFlat.view.sm.temp.TemporaryApproveBatchInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-temporaryapprovebatchinfo',
    title: '造船结算明细',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.temp.TemporaryApproveBatchController',
    ],

    controller: 'sm-temporaryapprovebatch',
    closeAction: 'hide',
    id: 'sm-temporaryapprovebatchinfo',
    width: '95%',
    maxHeight: 500,
    y: 20,
    items: [{
        xtype: 'container',
        margin: '15 15 15 15',
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            scrollable: true,
            border: true,
            columnLines: true,
            store: Ext.create('iFlat.store.sm.TemporaryDetail'),
            columns: [{
                header: '工程队',
                width: 250,
                dataIndex: 'temporaryDetail.team',
            }, {
                header: '姓名',
                width: 120,
                dataIndex: 'temporaryDetail.name',
            }, {
                header: '工种',
                dataIndex: 'temporaryDetail.trades',
            }, {
                header: '岗位工资标准',
                dataIndex: 'temporaryDetail.standard',
            }, {
                header: '出勤天数',
                dataIndex: 'temporaryDetail.days',
            }, {
                header: '绩效基数',
                dataIndex: 'temporaryDetail.ratio',
            }, {
                header: '考核分',
                dataIndex: 'temporaryDetail.score',
            }, {
                header: '实发绩效工资',
                dataIndex: 'temporaryDetail.salary',
            }, {
                header: '补发（扣）工资',
                dataIndex: 'temporaryDetail.adjust',
            }, {
                header: '实发薪酬',
                dataIndex: 'temporaryDetail.summary',
            }, {
                header: '备注',
                width: 150,
                dataIndex: 'temporaryDetail.comment',
                shrinkWrap: 1,
            }],
        }],
    }],
});