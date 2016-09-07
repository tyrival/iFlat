Ext.define('iFlat.store.wip.SrOutsourcePage', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.wip.SrOutsource',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'wip_listPageSrOutsource.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});