Ext.define('iFlat.view.report.ss.ViolateRegulationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-ss-violateregulation',

    refresh: function() {

        Ext.getCmp('rpt-ss-violateregulation-from').setValue('');
        Ext.getCmp('rpt-ss-violateregulation-to').setValue('');
        Ext.getCmp('rpt-ss-violateregulation-risklvl').setValue('');
        Ext.getCmp('rpt-ss-violateregulation-dept').setValue('');
        rptSsViolateRegulationStore.removeAll();
    },

    search: function(btn) {
        var from = Ext.getCmp('rpt-ss-violateregulation-from').getValue();
        var to = Ext.getCmp('rpt-ss-violateregulation-to').getValue();
        var risklvl = Ext.getCmp('rpt-ss-violateregulation-risklvl').getValue();
        var dept = Ext.getCmp('rpt-ss-violateregulation-dept').getValue();

        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.riskLvl'] = risklvl;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.dept'] = dept;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.fromDate'] = from;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.toDate'] = to;
        rptSsViolateRegulationStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '违章',
            fileName: '违章.xls',
        })
    }
})