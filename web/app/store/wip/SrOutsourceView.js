Ext.define('iFlat.store.wip.SrOutsourceView', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOutsourceView',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'wip_listSrOutsourceView.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});