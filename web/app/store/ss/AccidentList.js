Ext.define('iFlat.store.ss.AccidentList', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.ss.Accident',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listAccident.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});