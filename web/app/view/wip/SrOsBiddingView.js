Ext.define('iFlat.view.wip.SrOsBiddingView', {
    extend: 'Ext.window.Window',
    alias: 'widget.wip-srosbiddingview',
    title: '报价详情',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.wip.SrOsContractHandleController'
    ],

    controller: 'wip-sroscontracthandle',

    id: 'wip-srosbiddingview',
    closeAction: 'hide',
    width: 800,
    height: 350,
    y: 20,
    items: [{
        xtype: 'grid',
        border: true,
        columnLines: true,
        flex: 1,
        store: wipSrOsBiddingViewStore = Ext.create('iFlat.store.wip.SrOsBidding'),

        columns: [{
            text: '供应商',
            width: 200,
            align: 'center',
            dataIndex: 'srOsBidding.vendor',
        }, {
            text: '供方类型',
            width: 120,
            align: 'left',
            dataIndex: 'srOsBidding.vendorType',
        }, {
            text: '投标报价',
            width: 120,
            align: 'left',
            dataIndex: 'srOsBidding.amount',
        }, {
            text: '澄清报价',
            width: 120,
            align: 'left',
            dataIndex: 'srOsBidding.amountAdj',
        }, {
            text: '备注',
            flex: 1,
            align: 'left',
            dataIndex: 'srOsBidding.comment',
        }]
    }],
});