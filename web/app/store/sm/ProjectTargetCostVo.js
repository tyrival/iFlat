Ext.define('iFlat.store.sm.ProjectTargetCostVo', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.ProjectTargetCostVo',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listProjectTargetCostVo.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});