Ext.define('iFlat.store.ss.ViolateRegulationList', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.ss.ViolateRegulation',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listViolateRegulation.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});