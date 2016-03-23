Ext.define('iFlat.view.report.complex.bi.MajorDevCstController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-majordevcst',

    reload: function (text, newValue, oldValue, eOpts) {
        if (newValue == "") {
            return false;
        }
        rptComplexBiMajorDevCstCost.removeAll();
        rptComplexBiMajorDevCstCost.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiMajorDevCstCost.reload();
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-majordevcst-projno').setValue(proj);
        }
    },

    cellWindowRenderer: function(value, metaData) {
        value = Flat.util.financeFormat(value,2);
        if(value > 0 && metaData.columnIndex >= 4) {
            metaData.style = 'color:#FF0000;' + metaData.style;
        }
        if(metaData.columnIndex == 5) {
            value = value + '%';
        }
        return value;
    },

})