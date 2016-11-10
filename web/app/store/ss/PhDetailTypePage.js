Ext.define('iFlat.store.ss.PhDetailTypePage', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.PhDetailType',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPagePhDetailType.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});