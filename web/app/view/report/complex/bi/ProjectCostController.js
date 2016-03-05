Ext.define('iFlat.view.report.complex.bi.ProjectCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-projectcost',

    reload: function (text, newValue, oldValue, eOpts) {
        rptComplexBiProjectCostStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiProjectCostStore.reload();
        rptComplexBiProjectCostGridStore.removeAll();
        rptComplexBiProjectCostGridStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiProjectCostGridStore.reload();
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-projectcost-projno').setValue(proj);
        }
    },

    onPanelRendered: function(comp, eOpts) {
        var chart2 = this.lookupReference('rpt-complex-bi-projectcost-tar');
        var chart3 = this.lookupReference('rpt-complex-bi-projectcost-act');
        chart2.setStore(rptComplexBiProjectCostStore);
        chart3.setStore(rptComplexBiProjectCostStore);
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('name') + ': ' + record.get(item.field) + '%');
    },

    cellRenderer: function(value, metaData) {
        var record = metaData.record;
        var name = record.get('name');
        if(metaData.columnIndex > 0) {
            value = financeFormat(value, 2);
        }
        if(name == '销售收入' || name == '总成本' || name == '毛利' || name == '毛利率') {
            metaData.style = 'font-weight:bold;font-size:14px;';
        } else if(name == '材料' || name == '设备' || name == '外协包料') {
        } else {
            metaData.style = 'font-size:14px;' + metaData.style;
        }
        if((name == '器材费占比' || name == '加工费占比' || name == '专项费占比' || name == '毛利率') && value != "器材费占比" && value != "加工费占比" && value != "专项费占比" && value != "毛利率") {
            value = value + "%";
        };
        if(metaData.column.dataIndex == 'difference') {
            var s = '';
            if(name != '销售收入' && name != '毛利') {
                s = value > 0 ? 'color:#FF0000;' : '';
            } else {
                s = value < 0 ? 'color:#FF0000;' : '';
            }
            metaData.style = s + metaData.style;
        }
        return value;
    },

    pieRenderer: function(text, sprite, config, rendererData, index) {
        var pct = rendererData.store.getAt(index).get(rendererData.angleField);
        return text.substr(0, 3) + "(" + pct + "%)";

    }
})