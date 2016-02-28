Ext.define('iFlat.store.report.bi.MajorMatQty', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.bi.BalanceQty',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listMajorMatQtyBalance.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'majorMatQty.projNo': '',
        }
    },
});