Ext.define('iFlat.store.sm.Discount', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.Discount',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listDiscount.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});