Ext.define('iFlat.view.sm.temp.detail.SrApproveMain', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-srapprovemain',

    requires: [
        'iFlat.view.sm.temp.SrSettlementApproveController'
    ],
    controller: 'sm-srsettlementapprove',

    width: 800,
    scrollable: true,
    border: true,
    columnLines: true,
    store: smSrApproveMainDetailStore = Ext.create('iFlat.store.sm.SrSettlementDetlFirst'),

    tbar: ['->', {
        text: '刷新',
        handler: 'refresh',
    }],
    columns: [{
        header: 'ID',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.content',
        hidden: true
    }, {
        header: '工种',
        width: 120,
        dataIndex: 'srSettlementDetlFirst.type',
    }, {
        header: '施工内容',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.applyContent',
        cellWrap: true,
    }, {
        header: '施工内容（确认）',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.adjustContent',
        cellWrap: true,
    }, {
        header: '数量',
        dataIndex: 'srSettlementDetlFirst.applyQty1',
    }, {
        header: '数量（确认）',
        dataIndex: 'srSettlementDetlFirst.adjustQty1',
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'srSettlementDetlFirst.amount',
    }, {
        header: '规格',
        dataIndex: 'srSettlementDetlFirst.specs',
    }, {
        header: '单位',
        dataIndex: 'srSettlementDetlFirst.unit',
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlementDetlFirst.comment',
        cellWrap: true,
    }],
});
