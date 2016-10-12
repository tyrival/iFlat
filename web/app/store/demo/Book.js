Ext.define('iFlat.store.demo.Book', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.demo.Book',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'demo_listBook.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});