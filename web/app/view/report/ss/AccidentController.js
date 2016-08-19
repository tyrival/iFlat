Ext.define('iFlat.view.report.ss.AccidentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-ss-accident',

    showAccPartyList: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-accidentview');
        if(!win) {
            win = Ext.create('iFlat.view.report.ss.AccPartyView');
        }
        rptSsAccPartyViewStore.getProxy().extraParams['accParty.accId'] = record.get('id');
        rptSsAccPartyViewStore.reload();
        win.show();
    },

    refresh: function() {

        Ext.getCmp('rpt-ss-accident-from').setValue('');
        Ext.getCmp('rpt-ss-accident-to').setValue('');
        Ext.getCmp('rpt-ss-accident-acclvl').setValue('');
        Ext.getCmp('rpt-ss-accident-acctype').setValue('');
        Ext.getCmp('rpt-ss-accident-dept').setValue('');
        rptSsAccidentStore.removeAll();
    },

    search: function(btn) {
        var from = Ext.getCmp('rpt-ss-accident-from').getValue();
        var to = Ext.getCmp('rpt-ss-accident-to').getValue();
        var acclvl = Ext.getCmp('rpt-ss-accident-acclvl').getValue();
        var acctype = Ext.getCmp('rpt-ss-accident-acctype').getValue();
        var dept = Ext.getCmp('rpt-ss-accident-dept').getValue();

        rptSsAccidentStore.getProxy().extraParams['accident.accLvl'] = acclvl;
        rptSsAccidentStore.getProxy().extraParams['accident.dept'] = dept;
        rptSsAccidentStore.getProxy().extraParams['accident.accType'] = acctype;
        rptSsAccidentStore.getProxy().extraParams['accident.fromDate'] = from;
        rptSsAccidentStore.getProxy().extraParams['accident.toDate'] = to;
        rptSsAccidentStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '事故',
            fileName: '事故.xls',
        })
    }
})