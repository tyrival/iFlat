Ext.define('iFlat.store.pam.YearWork', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.YearWork',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'pam_listPageYearWork.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});