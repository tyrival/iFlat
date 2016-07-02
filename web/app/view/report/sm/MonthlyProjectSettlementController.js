Ext.define('iFlat.view.report.sm.MonthlyProjectSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-sm-monthlyprojectsettlement',

    /**
     * 选择工号时，在隐藏单元格中保存船名
     */
    onProjNoChange: function (combo, record, eOpts) {
        Ext.getCmp('rpt-sm-monthlyprojectsettlement-type').setValue(record.get('rptProject.type'));
    },

    refresh: function() {
        rptSmMonthlyProjectSettlementStore.getProxy().extraParams['monthlyProjectSettlement.month'] = null;
        rptSmMonthlyProjectSettlementStore.getProxy().extraParams['monthlyProjectSettlement.projNo'] = null;
        rptSmMonthlyProjectSettlementStore.getProxy().extraParams['monthlyProjectSettlement.type'] = null;
        rptSmMonthlyProjectSettlementStore.getProxy().extraParams['monthlyProjectSettlement.dept'] = null;

        rptSmMonthlyProjectSettlementStore.removeAll();

        Ext.getCmp('rpt-sm-monthlyprojectsettlement-time').setValue('');
        Ext.getCmp('rpt-sm-monthlyprojectsettlement-month').setValue('');
        Ext.getCmp('rpt-sm-monthlyprojectsettlement-projno').setValue('');
        Ext.getCmp('rpt-sm-monthlyprojectsettlement-type').setValue('');
        Ext.getCmp('rpt-sm-monthlyprojectsettlement-dept').setValue('');
    },

    search: function(btn) {

        var month = Ext.getCmp('rpt-sm-monthlyprojectsettlement-month').getValue();
        var projno = Ext.getCmp('rpt-sm-monthlyprojectsettlement-projno').getValue();
        var dept = Ext.getCmp('rpt-sm-monthlyprojectsettlement-dept').getValue();
        var type = Ext.getCmp('rpt-sm-monthlyprojectsettlement-type').getValue();

        rptSmMonthlyProjectSettlementStore.getProxy().extraParams['monthlyProjectSettlement.month'] = month;
        rptSmMonthlyProjectSettlementStore.getProxy().extraParams['monthlyProjectSettlement.projNo'] = projno;
        rptSmMonthlyProjectSettlementStore.getProxy().extraParams['monthlyProjectSettlement.dept'] = dept;
        rptSmMonthlyProjectSettlementStore.getProxy().extraParams['monthlyProjectSettlement.type'] = type;
        rptSmMonthlyProjectSettlementStore.reload();
    },

    exportToExcel: function(btn) {
        var id = 'rpt-sm-monthlyprojectsettlement-grid';
        var t = '单项工程外包公费审批表';
        var grid = Ext.getCmp(id);
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    }
})