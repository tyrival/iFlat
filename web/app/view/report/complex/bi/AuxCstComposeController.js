Ext.define('iFlat.view.report.complex.bi.AuxCstComposeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-auxcstcompose',

    cellWindowRenderer: function(value, metaData) {
        value = Flat.util.financeFormat(value,2);
        var record = metaData.record;
        var name = record.get('name');
        if(name == '专项费.') {
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
        rptComplexBiAuxCstComposeStore.removeAll();
        rptComplexBiAuxCstComposeStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiAuxCstComposeStore.reload();
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-auxcstcompose-projno').setValue(proj);
        }
    }
})