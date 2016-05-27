Ext.define('iFlat.store.sm.ProjectTargetCost', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.ProjectTargetCost',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listProjectTargetCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});