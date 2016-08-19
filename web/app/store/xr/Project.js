Ext.define('iFlat.store.xr.Project', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.Project',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listProject.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});