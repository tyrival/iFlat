Ext.define('iFlat.store.bi.Project', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.bi.Project',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listProject.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});