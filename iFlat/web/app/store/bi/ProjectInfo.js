Ext.define('iFlat.store.bi.ProjectInfo', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.bi.ProjectInfo',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listProjectInfo.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});