Ext.define('iFlat.store.pam.MonthlyWorkList', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.MonthlyWork',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listMonthlyWork.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});