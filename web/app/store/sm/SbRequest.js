Ext.define('iFlat.store.sm.SbRequest', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.SbRequest',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sbrequest_list.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});