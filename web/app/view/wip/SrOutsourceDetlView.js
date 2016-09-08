Ext.define('iFlat.view.wip.SrOutsourceDetlView', {
    extend: 'Ext.window.Window',
    alias: 'widget.wip-sroutsourcedetlview',
    title: '施工内容明细',
    layout: 'fit',
    modal: true,

    id: 'wip-sroutsourcedetlview',
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
        store: wipSrOutsourceDetlViewStore = Ext.create('iFlat.store.wip.SrOutsourceDetl'),

        columns: [{
            header: '施工内容',
            width: 300,
            dataIndex: 'srOutsourceDetl.content',
            cellWrap: true,
        }, {
            header: '规格',
            width: 200,
            dataIndex: 'srOutsourceDetl.specs',
        }, {
            header: '数量',
            width: 200,
            dataIndex: 'srOutsourceDetl.qty',
        }, {
            header: '备注',
            flex: 1,
            dataIndex: 'srOutsourceDetl.comment',
            shrinkWrap: 1,
        }, ],
    }],
});