Ext.define('iFlat.store.bi.MajorMatCst', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.bi.MajorMatCst',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listMajorMatCst.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'majorMatCst.type': '',
            'majorMatCst.projNo': '',
        }
    },
});