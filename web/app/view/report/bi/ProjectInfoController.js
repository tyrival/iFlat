Ext.define('iFlat.view.report.bi.ProjectInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-projectinfo',

    refresh: function() {
        rptBiProjectInfoStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-bi-projectinfo-combo').getValue() + '-01';
        rptBiProjectInfoStore.getProxy().extraParams['projectInfo.analyseDate'] = proj;
        rptBiProjectInfoStore.reload();
    },

    render: function(panel, eOpts) {
        var grid2 = Ext.getCmp('rpt-bi-projectinfoproj-grid2');
        var grid3 = Ext.getCmp('rpt-bi-projectinfoproj-grid3');
        grid2.setStore(rptBiProjectInfoStore);
        grid3.setStore(rptBiProjectInfoStore);
    },

    columnRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.Date.format(value, 'Y-m-d');
    }
})