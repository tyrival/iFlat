Ext.define('iFlat.store.sm.TemporaryDetail', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.sm.TemporaryDetail',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listTemporaryDetail.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});