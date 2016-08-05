Ext.define('iFlat.store.pam.NewsSummary', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.pam.NewsSummary',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listNewsSummary.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});