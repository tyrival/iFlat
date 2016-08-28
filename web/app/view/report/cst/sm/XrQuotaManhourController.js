Ext.define('iFlat.view.report.cst.sm.XrQuotaManhourController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-cst-sm-xrquotamanhour',

    refresh: function () {
        rptCstSmXrQuotaManhourStore.reload();
    },

    search: function () {
        var from = Ext.getCmp('rpt-cst-sm-xrquotamanhour-from').getValue();
        var to = Ext.getCmp('rpt-cst-sm-xrquotamanhour-to').getValue();
        if (Flat.util.isEmpty(from) || Flat.util.isEmpty(to)) {
            Ext.Msg.show({
                title:'警告',
                message: '请选择起止时间后查询。',
            });
            return false;
        }
        rptCstSmXrQuotaManhourStore.getProxy().extraParams['quotaManhour.fromDate'] = from;
        rptCstSmXrQuotaManhourStore.getProxy().extraParams['quotaManhour.toDate'] = to;
        rptCstSmXrQuotaManhourStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '工时统计明细',
            fileName: '工时统计明细.xls',
        })
    }
})