Ext.define('iFlat.store.bi.MajorDevCst', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.bi.MajorDevCst',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listMajorDevCst.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'majorDevCst.type': '',
            'majorDevCst.projNo': '',
        }
    },
});