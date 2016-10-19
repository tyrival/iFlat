Ext.define('iFlat.view.report.ss.PotentialHazardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-ss-potentialhazard',

    refresh: function() {

        Ext.getCmp('rpt-ss-potentialhazard-from').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-to').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-risklvl').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-phtype').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-dept').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-person').setValue('');
        rptSsPotentialHazardStore.removeAll();
    },

    search: function(btn) {
        var from = Ext.getCmp('rpt-ss-potentialhazard-from').getValue();
        var to = Ext.getCmp('rpt-ss-potentialhazard-to').getValue();
        var risklvl = Ext.getCmp('rpt-ss-potentialhazard-risklvl').getValue();
        var phtype = Ext.getCmp('rpt-ss-potentialhazard-phtype').getValue();
        var dept = Ext.getCmp('rpt-ss-potentialhazard-dept').getValue();
        var person = Ext.getCmp('rpt-ss-potentialhazard-person').getValue();

        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.riskLvl'] = risklvl;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.dept'] = dept;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.phType'] = phtype;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.fromDate'] = from;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.toDate'] = to;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.personName'] = person;
        rptSsPotentialHazardStore.reload();
    },

    showPotentialHazardInfo: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-potentialhazardinfo');
        if(!win) {
            win = Ext.create('iFlat.view.report.ss.PotentialHazardInfo');
        }
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },
    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '隐患',
            fileName: '隐患.xls',
        })
    }
})