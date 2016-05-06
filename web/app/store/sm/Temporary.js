Ext.define('iFlat.store.sm.Temporary', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.Temporary',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPageTemporary.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});