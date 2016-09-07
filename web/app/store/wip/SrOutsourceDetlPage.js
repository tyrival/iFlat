Ext.define('iFlat.store.wip.SrOutsourceDetlPage', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOutsourceDetl',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'wip_listPageSrOutsourceDetl.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});