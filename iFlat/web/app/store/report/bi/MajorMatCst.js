Ext.define('iFlat.store.report.bi.MajorMatCst', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.bi.Balance',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listMajorMatCstBalance.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'majorMatCst.projNo': '',
        }
    },
});