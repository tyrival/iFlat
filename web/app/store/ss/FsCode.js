Ext.define('iFlat.store.ss.FsCode', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.FsCode',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listFsCode.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});