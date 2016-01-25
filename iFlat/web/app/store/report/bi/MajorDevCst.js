Ext.define('iFlat.store.report.bi.MajorDevCst', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.bi.Balance',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listMajorDevCstBalance.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'majorDevCst.projNo': '',
        }
    },
});