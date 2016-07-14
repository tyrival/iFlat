Ext.define('iFlat.store.pm.Project', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.pm.Project',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'pm_listPageProject.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});