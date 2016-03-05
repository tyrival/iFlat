Ext.define('iFlat.view.report.complex.bi.ManuCstComposeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-manucstcompose',

    cellWindowRenderer: function(value, metaData) {
        value = financeFormat(value,2);
        var record = metaData.record;
        var name = record.get('name');
        if(name == '加工费.') {
            metaData.style = 'font-weight:bold;font-size:14px;background-color:#EEEEEE';
        } else {
            metaData.style = 'font-size:14px;background-color:#FFFFFF';
        }
        if(value > 0 && (metaData.columnIndex == 4 || metaData.columnIndex == 5)) {
            metaData.style = 'color:#FF0000;' + metaData.style;
        }
        if(metaData.column.dataIndex == 'diffPct') {
            value = value + '%';
        }
        return value;
    },

    reload: function (text, newValue, oldValue, eOpts) {
        if (newValue == "") {
            return false;
        }
        rptComplexBiManuCstComposeStore.removeAll();
        rptComplexBiManuCstComposeStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiManuCstComposeStore.reload();
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-manucstcompose-projno').setValue(proj);
        }
    }
})