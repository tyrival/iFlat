Ext.define('iFlat.store.report.bi.Project', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.report.bi.Project',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listProject.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },

});