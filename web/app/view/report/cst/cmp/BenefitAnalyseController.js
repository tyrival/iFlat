Ext.define('iFlat.view.report.cst.cmp.BenefitAnalyseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-cst-cmp-benefitanalyse',

    renderer: function(v) {
        return Flat.util.financeFormat(v, 2);
    },

    refresh: function () {
        rptCstCmpBenefitAnalyseStore.reload();
    },

    search: function () {
        var from = Ext.getCmp('rpt-cst-cmp-benefitanalyse-from').getValue();
        var to = Ext.getCmp('rpt-cst-cmp-benefitanalyse-to').getValue();
        if (Flat.util.isEmpty(from) || Flat.util.isEmpty(to)) {
            Ext.Msg.show({
                title:'警告',
                message: '请选择起止时间后查询。',
            });
            return false;
        }
        rptCstCmpBenefitAnalyseStore.getProxy().extraParams['benefit.fromDate'] = from;
        rptCstCmpBenefitAnalyseStore.getProxy().extraParams['benefit.toDate'] = to;
        rptCstCmpBenefitAnalyseStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '经济效益分析表',
            fileName: '经济效益分析表.xls',
            showSummary: true,
        })
    }
})