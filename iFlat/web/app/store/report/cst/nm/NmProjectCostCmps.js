Ext.define('iFlat.store.report.cst.nm.NmProjectCostCmps', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.cst.nm.NmProjectCostCmps',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listNmProjectCostCmps.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});