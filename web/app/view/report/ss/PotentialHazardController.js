Ext.define('iFlat.view.report.ss.PotentialHazardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-ss-potentialhazard',

    refresh: function() {

        Ext.getCmp('rpt-ss-potentialhazard-from').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-to').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-risklvl').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-phtype').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-dept').setValue('');
        rptSsPotentialHazardStore.removeAll();
    },

    search: function(btn) {
        var from = Ext.getCmp('rpt-ss-potentialhazard-from').getValue();
        var to = Ext.getCmp('rpt-ss-potentialhazard-to').getValue();
        var risklvl = Ext.getCmp('rpt-ss-potentialhazard-risklvl').getValue();
        var phtype = Ext.getCmp('rpt-ss-potentialhazard-phtype').getValue();
        var dept = Ext.getCmp('rpt-ss-potentialhazard-dept').getValue();

        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.riskLvl'] = risklvl;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.dept'] = dept;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.phType'] = phtype;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.fromDate'] = from;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.toDate'] = to;
        rptSsPotentialHazardStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '隐患',
            fileName: '隐患.xls',
        })
    }
})