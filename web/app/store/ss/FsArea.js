Ext.define('iFlat.store.ss.FsArea', {
    extend: 'Ext.data.Store',

    autoLoad: true,
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