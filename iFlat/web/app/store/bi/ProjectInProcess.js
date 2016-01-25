Ext.define('iFlat.store.bi.ProjectInProcess', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.bi.ProjectInProcess',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listProjectInProcess.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});