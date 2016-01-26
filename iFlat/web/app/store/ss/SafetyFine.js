Ext.define('iFlat.store.ss.SafetyFine', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.SafetyFine',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPageSafetyFineVo.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});