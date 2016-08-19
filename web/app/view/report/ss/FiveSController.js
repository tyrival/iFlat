Ext.define('iFlat.view.report.ss.FiveSController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-ss-fives',

    refresh: function() {

        Ext.getCmp('rpt-ss-fives-from').setValue('');
        Ext.getCmp('rpt-ss-fives-to').setValue('');
        Ext.getCmp('rpt-ss-fives-fstype').setValue('');
        Ext.getCmp('rpt-ss-fives-belongdept').setValue('');
        Ext.getCmp('rpt-ss-fives-dept').setValue('');
        rptSsFiveSStore.removeAll();
    },

    search: function(btn) {
        var from = Ext.getCmp('rpt-ss-fives-from').getValue();
        var to = Ext.getCmp('rpt-ss-fives-to').getValue();
        var fstype = Ext.getCmp('rpt-ss-fives-fstype').getValue();
        var belongdept = Ext.getCmp('rpt-ss-fives-belongdept').getValue();
        var dept = Ext.getCmp('rpt-ss-fives-dept').getValue();

        rptSsFiveSStore.getProxy().extraParams['fiveS.fsType'] = fstype;
        rptSsFiveSStore.getProxy().extraParams['fiveS.dept'] = dept;
        rptSsFiveSStore.getProxy().extraParams['fiveS.belongDept'] = belongdept;
        rptSsFiveSStore.getProxy().extraParams['fiveS.fromDate'] = from;
        rptSsFiveSStore.getProxy().extraParams['fiveS.toDate'] = to;
        rptSsFiveSStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '5S',
            fileName: '5S.xls',
        })
    }
})