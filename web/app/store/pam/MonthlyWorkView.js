Ext.define('iFlat.store.pam.MonthlyWorkView', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.pam.MonthlyWorkView',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listMonthlyWorkView.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});