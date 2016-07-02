Ext.define('iFlat.store.report.sm.MonthlyProjectSettlement', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.sm.MonthlyProjectSettlement',

    pageSize: 0,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'rpt_listMonthlyProjectSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});