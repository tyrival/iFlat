Ext.define('iFlat.view.report.mm.MatQuatoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-mm-matquato',

    refresh: function() {
        rptMmMatQuatoComboStore.reload();
        rptMmMatQuatoGridStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-mm-matquato-combo').getValue();
        rptMmMatQuatoGridStore.getProxy().extraParams['matQuato.projNo'] = proj;
        rptMmMatQuatoGridStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = Ext.getCmp('rpt-mm-matquato-grid');
        var t = '限额结果分析';
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    },

    renderer: function(v) {
        return v + "%";
    }
})