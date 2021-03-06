Ext.define('iFlat.store.sm.Temporary', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.Temporary',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listTemporary.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});