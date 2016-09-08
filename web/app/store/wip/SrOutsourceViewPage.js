Ext.define('iFlat.store.wip.SrOutsourceViewPage', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.wip.SrOutsourceView',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'wip_listPageSrOutsourceView.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});