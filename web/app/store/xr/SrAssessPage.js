Ext.define('iFlat.storexr.SrAssessPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.SrAssess',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSrAssess.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});