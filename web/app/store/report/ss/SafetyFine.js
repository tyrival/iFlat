Ext.define('iFlat.store.report.ss.SafetyFine', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.ss.SafetyFine',

    pageSize: 0,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listSafetyFineVo.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});