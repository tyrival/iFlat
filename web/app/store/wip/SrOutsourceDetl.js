Ext.define('iFlat.store.wip.SrOutsourceDetl', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOutsourceDetl',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'wip_listSrOutsourceDetl.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});