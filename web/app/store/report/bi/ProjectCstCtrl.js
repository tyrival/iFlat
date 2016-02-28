Ext.define('iFlat.store.report.bi.ProjectCstCtrl', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.bi.Pivot',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listProjectCstCtrl.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});