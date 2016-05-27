Ext.define('iFlat.store.sm.Subsidy', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.Subsidy',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'sm_listPageSubsidy.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});