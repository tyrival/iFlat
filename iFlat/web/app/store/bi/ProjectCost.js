Ext.define('iFlat.store.bi.ProjectCost', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.bi.ProjectCost',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listProjectCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});