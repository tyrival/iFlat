Ext.define('iFlat.storepam.MonthlyWorkViewPage', {

    autoLoad: true,
    model: 'iFlat.model.pam.MonthlyWorkView',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'pam_listPageMonthlyWorkView.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});