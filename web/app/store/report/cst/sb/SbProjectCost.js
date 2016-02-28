Ext.define('iFlat.store.report.cst.sb.SbProjectCost', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.cst.sb.SbProjectCost',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listSbProjectCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});