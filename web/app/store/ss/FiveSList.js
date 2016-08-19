Ext.define('iFlat.store.ss.FiveSList', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.ss.FiveS',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listFiveS.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});