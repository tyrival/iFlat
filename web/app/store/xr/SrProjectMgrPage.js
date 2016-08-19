Ext.define('iFlat.storexr.SrProjectMgrPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.SrProjectMgr',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSrProjectMgr.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});