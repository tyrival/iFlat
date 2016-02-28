Ext.define('iFlat.store.report.cst.sb.SbProjectCostCmps', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.cst.sb.SbProjectCostCmps',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listSbProjectCostCmps.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});