Ext.define('iFlat.view.report.cst.sm.XrLaborExpenseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-cst-sm-xrlaborexpense',

    refresh: function () {
        rptCstSmXrLaborExpenseStore.reload();
    },

    search: function () {
        var from = Ext.getCmp('rpt-cst-sm-xrlaborexpense-from').getValue();
        var to = Ext.getCmp('rpt-cst-sm-xrlaborexpense-to').getValue();
        if (Flat.util.isEmpty(from) || Flat.util.isEmpty(to)) {
            Ext.Msg.show({
                title:'警告',
                message: '请选择起止时间后查询。',
            });
            return false;
        }
        rptCstSmXrLaborExpenseStore.getProxy().extraParams['laborExpense.fromDate'] = from;
        rptCstSmXrLaborExpenseStore.getProxy().extraParams['laborExpense.toDate'] = to;
        rptCstSmXrLaborExpenseStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '工费统计明细',
            fileName: '工费统计明细.xls',
        })
    }
})