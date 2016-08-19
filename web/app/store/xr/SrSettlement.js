Ext.define('iFlat.store.xr.SrSettlement', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.SrSettlement',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSrSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});