Ext.define('iFlat.store.sm.Payment', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.Payment',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'sm_listPagePayment.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});