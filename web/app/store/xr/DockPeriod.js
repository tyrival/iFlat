Ext.define('iFlat.store.xr.DockPeriod', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.xr.DockPeriod',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listDockPeriod.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});