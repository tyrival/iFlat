Ext.define('iFlat.store.ss.PhCodeType', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.ss.PhCodeType',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listPhCodeType.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});