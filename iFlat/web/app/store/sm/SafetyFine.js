Ext.define('iFlat.store.sm.SafetyFine', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.SafetyFine',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'sm_listPageSafetyFineVo.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});