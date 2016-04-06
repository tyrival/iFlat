Ext.define('iFlat.store.sm.SbTargetCostSplit', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.SbTargetCostSplit',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSbTargetCostSplit.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});