Ext.define('iFlat.store.bi.ProjectSchedule', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.bi.ProjectSchedule',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listProjectSchedule.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});