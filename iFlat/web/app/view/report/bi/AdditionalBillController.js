Ext.define('iFlat.view.report.bi.AdditionalBillController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-additionalbill',

    refresh: function() {
        rptBiAdditionalBillComboStore.reload();
        rptBiAdditionalBillGridStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-bi-additionalbill-combo').getValue();
        rptBiAdditionalBillGridStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiAdditionalBillGridStore.reload();
    },

    renderer: function(value, summaryData) {
        return financeFormat(value, 4);
    },

    summaryRenderer: function(value, summaryData, dataIndex) {
        value = dataIndex == 'additionalBill.item' ? '合计' : value;
        return '<span style="font-size:15px;font-weight:bold">' + financeFormat(value, 4) + '</span>';
    },

    exportToExcel: function(btn) {
        var grid = Ext.getCmp('rpt-bi-additionalbill-grid');
        var t = '加帐';
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    }
})