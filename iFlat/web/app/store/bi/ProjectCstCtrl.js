Ext.define('iFlat.store.bi.ProjectCstCtrl', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.bi.ProjectCstCtrl',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listProjectCstCtrl.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});