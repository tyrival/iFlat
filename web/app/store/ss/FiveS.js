Ext.define('iFlat.store.ss.FiveS', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.FiveS',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPageFiveS.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});