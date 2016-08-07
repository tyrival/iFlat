Ext.define('iFlat.store.ss.FsArea', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.ss.FsArea',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listFsArea.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});