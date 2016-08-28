Ext.define('iFlat.storexr.DockPeriodPage', {

    autoLoad: false,
    model: 'iFlat.model.xr.DockPeriod',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageDockPeriod.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});