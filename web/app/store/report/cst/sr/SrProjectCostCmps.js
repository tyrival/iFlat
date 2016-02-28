Ext.define('iFlat.store.report.cst.sr.SrProjectCostCmps', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.cst.sr.SrProjectCostCmps',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listSrProjectCostCmps.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});