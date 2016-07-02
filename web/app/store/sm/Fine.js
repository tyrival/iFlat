Ext.define('iFlat.store.sm.Fine', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.Fine',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'sm_listPageFine.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});