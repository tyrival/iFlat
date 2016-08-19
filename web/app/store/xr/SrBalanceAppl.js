Ext.define('iFlat.store.xr.SrBalanceAppl', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.SrBalanceAppl',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSrBalanceAppl.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});