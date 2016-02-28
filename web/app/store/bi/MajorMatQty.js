Ext.define('iFlat.store.bi.MajorMatQty', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.bi.MajorMatQty',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listMajorMatQty.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'majorMatQty.type': '',
            'majorMatQty.projNo': '',
        }
    },
});