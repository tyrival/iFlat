Ext.define('iFlat.store.ss.Accident', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.Accident',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPageAccident.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});