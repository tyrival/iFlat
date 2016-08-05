Ext.define('iFlat.store.pam.News', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.pam.News',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'pam_listPageNews.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});