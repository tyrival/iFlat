Ext.define('iFlat.store.xr.SrProjectMgr', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.SrProjectMgr',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSrProjectMgr.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});