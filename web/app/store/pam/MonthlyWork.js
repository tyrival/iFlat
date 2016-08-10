Ext.define('iFlat.store.pam.MonthlyWork', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.MonthlyWork',

    pageSize: 30,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'pam_listPageMonthlyWork.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});