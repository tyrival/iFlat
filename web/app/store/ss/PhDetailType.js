Ext.define('iFlat.store.ss.PhDetailType', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.ss.PhDetailType',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listPhDetailType.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});