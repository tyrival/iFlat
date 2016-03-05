Ext.define('iFlat.view.report.complex.bi.AdditionalBillController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-additionalbill',

    renderer: function (value, summaryData) {
        return financeFormat(value, 4);
    },

    summaryRenderer: function (value, summaryData, dataIndex) {
        value = dataIndex == 'additionalBill.item' ? '合计' : value;
        return '<span style="font-size:15px;font-weight:bold">' + financeFormat(value, 4) + '</span>';
    },

    reload: function (text, newValue, oldValue, eOpts) {
        rptComplexBiAdditionalBillGridStore.removeAll();
        rptComplexBiAdditionalBillGridStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiAdditionalBillGridStore.reload();
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-additionalbill-projno').setValue(proj);
        }
    }
})