Ext.define('iFlat.store.demo.BookPage', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.demo.Book',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'demo_listPageBook.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});