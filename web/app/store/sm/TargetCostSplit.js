Ext.define('iFlat.store.sm.TargetCostSplit', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.TargetCostSplit',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listTargetCostSplit.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});