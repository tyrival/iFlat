Ext.define('iFlat.view.xr.SrAssess', {
    extend: 'Ext.window.Window',
    alias: 'widget.xr-srassess',
    title: '考核记录',
    layout: 'fit',
    modal: true,

    id: 'xr-srassess',
    closeAction: 'hide',
    width: 800,
    maxHeight: 500,
    y: 20,
    items: [{
        xtype: 'grid',
        id: 'xr-srassess-grid',
        border: true,
        columnLines: true,
        store: xrSrAssessStore = Ext.create('iFlat.store.xr.SrAssess'),
        flex: 1,
        columns: [{
            text: '考核部门',
            width: 120,
            align: 'center',
            dataIndex: 'srAssess.type',
        }, {
            text: '分数',
            width: 120,
            align: 'left',
            dataIndex: 'srAssess.score',
        }, {
            text: '说明',
            flex: true,
            align: 'left',
            dataIndex: 'srAssess.description',
        }, {
            text: '创建人',
            width: 120,
            align: 'left',
            dataIndex: 'srAssess.creatorName',
        }]
    }],
});