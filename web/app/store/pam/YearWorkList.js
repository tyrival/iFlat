Ext.define('iFlat.store.pam.YearWorkList', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.YearWork',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listYearWork.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});