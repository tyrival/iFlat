Ext.define('iFlat.store.sm.SrProjectManager', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.SrProjectManager',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSrProjectManager.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});