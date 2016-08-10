Ext.define('iFlat.store.ss.PhCode', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.PhCode',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listPhCode.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});