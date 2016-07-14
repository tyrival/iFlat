Ext.define('iFlat.view.report.hr.CreditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-hr-credit',

    refresh: function() {

        Ext.getCmp('rpt-hr-credit-from').setValue('');
        Ext.getCmp('rpt-hr-credit-to').setValue('');
        Ext.getCmp('rpt-hr-credit-dept').setValue('');
        Ext.getCmp('rpt-hr-credit-type').setValue('');
        Ext.getCmp('rpt-hr-credit-personname').setValue('');
        rptHrCreditStore.removeAll();
    },

    search: function(btn) {
        var from = Ext.getCmp('rpt-hr-credit-from').getValue();
        var to = Ext.getCmp('rpt-hr-credit-to').getValue();
        var dept = Ext.getCmp('rpt-hr-credit-dept').getValue();
        var type = Ext.getCmp('rpt-hr-credit-type').getValue();
        var personName = Ext.getCmp('rpt-hr-credit-personname').getValue();

        rptHrCreditStore.getProxy().extraParams['credit.type'] = type;
        rptHrCreditStore.getProxy().extraParams['credit.dept'] = dept;
        rptHrCreditStore.getProxy().extraParams['credit.personName'] = personName;
        rptHrCreditStore.getProxy().extraParams['credit.fromDate'] = from;
        rptHrCreditStore.getProxy().extraParams['credit.toDate'] = to;
        rptHrCreditStore.reload();
    },

    onDeptInfoChange: function(combo, record, eOpts) {
        var dept = combo.getValue();
        rptHrCreditEmployeeStore.getProxy().extraParams['team.deptName'] = dept;
        rptHrCreditEmployeeStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '个人信誉',
            fileName: '个人信誉.xls',
        })
    }
})