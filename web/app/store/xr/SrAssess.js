Ext.define('iFlat.store.xr.SrAssess', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.SrAssess',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSrAssess.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});