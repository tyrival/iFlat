Ext.define('iFlat.store.report.cst.nm.NmProjectCost', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.cst.nm.NmProjectCost',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listNmProjectCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});