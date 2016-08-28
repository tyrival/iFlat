Ext.define('iFlat.store.xr.QuotaManhour', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.QuotaManhour',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listQuotaManhour.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});