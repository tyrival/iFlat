Ext.define('iFlat.store.sm.SbTargetCost', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.SbTargetCost',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSbTargetCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});