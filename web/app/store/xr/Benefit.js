Ext.define('iFlat.store.xr.Benefit', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.Benefit',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listBenefit.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});