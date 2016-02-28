Ext.define('iFlat.store.report.cst.sr.SrProjectCost', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.cst.sr.SrProjectCost',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listSrProjectCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});