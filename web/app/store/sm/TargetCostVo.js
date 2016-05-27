Ext.define('iFlat.store.sm.TargetCostVo', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.TargetCostVo',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listTargetCostVo.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});