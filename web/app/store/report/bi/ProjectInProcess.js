Ext.define('iFlat.store.report.bi.ProjectInProcess', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.bi.Pivot',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listProjectInProcess.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});