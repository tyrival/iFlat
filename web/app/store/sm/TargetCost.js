Ext.define('iFlat.store.sm.TargetCost', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.TargetCost',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listTargetCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});