Ext.define('iFlat.store.bi.AdditionalBill', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.bi.AdditionalBill',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listAdditionalBill.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});