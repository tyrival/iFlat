Ext.define('iFlat.store.report.bi.ProjectCostBalance', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.bi.Balance',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listBalanceOfProjectCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'parameter.projectNo': '',
        }
    },

});