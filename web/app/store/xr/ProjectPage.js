Ext.define('iFlat.storexr.ProjectPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.Project',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageProject.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});