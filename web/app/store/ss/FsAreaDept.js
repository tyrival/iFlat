Ext.define('iFlat.store.ss.FsAreaDept', {
    extend: 'Ext.data.Store',
    
    autoLoad: true,
    model: 'iFlat.model.ss.FsAreaDept',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listFsAreaDept.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});