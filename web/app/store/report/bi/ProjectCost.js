Ext.define('iFlat.store.report.bi.ProjectCost', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.bi.ProjectCost',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listProjectCost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'parameter.projectNo': '',
        }
    },

});