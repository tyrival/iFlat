Ext.define('iFlat.store.sm.SbTargetCostAccount', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.SbTargetCostAccount',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSbTargetCostAccount.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});