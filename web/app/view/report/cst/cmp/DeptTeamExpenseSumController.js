Ext.define('iFlat.view.report.cst.cmp.DeptTeamExpenseSumController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-cst-cmp-deptteamexpensesum',

    refresh: function () {
        rptCstCmpDeptTeamExpenseSum.reload();
    },

    search: function () {
        var from = Ext.getCmp('rpt-cst-cmp-deptteamexpensesum-from').getValue();
        var to = Ext.getCmp('rpt-cst-cmp-deptteamexpensesum-to').getValue();
        if (Flat.util.isEmpty(from) || Flat.util.isEmpty(to)) {
            Ext.Msg.show({
                title:'警告',
                message: '请选择起止时间后查询。',
            });
            return false;
        }
        rptCstCmpDeptTeamExpenseSum.getProxy().extraParams['deptTeamExpense.fromDate'] = from;
        rptCstCmpDeptTeamExpenseSum.getProxy().extraParams['deptTeamExpense.toDate'] = to;
        rptCstCmpDeptTeamExpenseSum.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '期间工费汇总表',
            fileName: '期间工费汇总表.xls',
            showSummary: true,
        })
    }
});