Ext.define('iFlat.store.report.bi.AdditionalBill', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.bi.AdditionalBill',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listAdditionalBill.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});