Ext.define('iFlat.store.report.mm.MatQuato', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.mm.MatQuato',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listMatQuato.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});