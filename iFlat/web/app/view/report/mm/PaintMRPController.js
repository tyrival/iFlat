Ext.define('iFlat.view.report.mm.PaintMRPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-mm-paintmrp',

    refresh: function() {
        rptMmPaintMRPComboStore.reload();
        rptMmPaintMRPGridStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-mm-paintmrp-combo').getValue();
        rptMmPaintMRPGridStore.getProxy().extraParams['paintMRP.projNo'] = proj;
        rptMmPaintMRPGridStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = Ext.getCmp('rpt-mm-paintmrp-grid');
        var t = '油漆需求计划';
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    },
})