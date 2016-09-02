Ext.define('iFlat.store.wip.SrOutsource', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.wip.SrOutsource',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'wip_listSrOutsource.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});