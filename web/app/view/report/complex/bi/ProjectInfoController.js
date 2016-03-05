Ext.define('iFlat.view.report.complex.bi.ProjectInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-projectinfo',

    reload: function (text, newValue, oldValue, eOpts) {
        rptComplexBiProjectInfoStore.removeAll();
        rptComplexBiProjectInfoStore.getProxy().extraParams['projectInfo.analyseDate'] = newValue;
        rptComplexBiProjectInfoStore.reload();
    },

    init: function() {
        var date = Ext.getCmp('rpt-complex-bi-period').getValue();
        Ext.getCmp('rpt-complex-bi-projectinfo-period').setValue(date);
    },

    beforerender: function(panel, eOpts) {
        var grid2 = Ext.getCmp('rpt-complex-bi-projectinfoproj-grid2');
        var grid3 = Ext.getCmp('rpt-complex-bi-projectinfoproj-grid3');
        grid2.setStore(rptComplexBiProjectInfoStore);
        grid3.setStore(rptComplexBiProjectInfoStore);
    },

    columnRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.Date.format(value, 'Y-m-d');
    }
})