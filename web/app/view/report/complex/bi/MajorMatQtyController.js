Ext.define('iFlat.view.report.complex.bi.MajorMatQtyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-majormatqty',

    reload: function (text, newValue, oldValue, eOpts) {
        if (newValue == "") {
            return false;
        }
        rptComplexBiMajorMatQtyCost.removeAll();
        rptComplexBiMajorMatQtyCost.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiMajorMatQtyCost.reload();
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-majormatqty-projno').setValue(proj);
        }
    },

    cellWindowQtyRenderer: function(value, metaData) {
        var record = metaData.record;
        var name = record.get('name');
        if(name == '进口油漆/稀料' || name == '国产油漆/稀料') {
            if(metaData.columnIndex == 5) {
                value = record.get('actual') - record.get('purchase');
            }
            if(metaData.columnIndex == 6) {
                value = (record.get('actual') - record.get('purchase')) * 100 / record.get('purchase');
            }
        }
        if(name == '油漆' && metaData.columnIndex > 1) {
            value = null;
        }

        value = financeFormat(value,2);

        if(name == '钢材' || name == '管材' || name == '焊材' || name == '油漆' || name == '电缆') {
            metaData.style = 'font-weight:bold;font-size:14px;background-color:#EEEEEE';
        } else {
            metaData.style = 'font-size:14px;background-color:#FFFFFF';
        }

        if(metaData.columnIndex == 5 || metaData.columnIndex == 6) {
            metaData.style = value > 0 ? 'color:#FF0000;' + metaData.style : metaData.style;
        }

        if(metaData.column.dataIndex == 'diffPct' && value) {
            value = value + '%';
        }

        if(metaData.columnIndex == 1) {
            if(value == '油漆') {
                value = null;
            } else if(value == '进口油漆/稀料') {
                value = 'KL'
            } else if(value == '国产油漆/稀料') {
                value = 'KG'
            } else if(value == '电缆' || value == '船用电缆') {
                value = 'KM'
            } else {
                value = '吨';
            }
        }
        return value;
    },

})