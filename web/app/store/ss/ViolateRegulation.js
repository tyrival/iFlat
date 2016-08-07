Ext.define('iFlat.store.ss.ViolateRegulation', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.ViolateRegulation',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPageViolateRegulation.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});