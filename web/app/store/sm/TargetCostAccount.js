Ext.define('iFlat.store.sm.TargetCostAccount', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.TargetCostAccount',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listTargetCostAccount.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});