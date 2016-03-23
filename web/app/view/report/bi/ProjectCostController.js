Ext.define('iFlat.view.report.bi.ProjectCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-projectcost',

    search: function(button) {
        var store = this.lookupReference('rpt-bi-projectcost-est').getStore();
        var proj = Ext.getCmp('rpt-bi-projectcost-combo').getValue();
        store.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiProjectCostStore.getProxy().extraParams['parameter.projectNo'] = proj;
        store.reload();
        rptBiProjectCostStore.reload();
    },

    onPanelRendered: function(comp, eOpts) {
        var rptBiProjectCostStore = Ext.create('iFlat.store.report.bi.ProjectCostBalance', {
            filters: function(item) {
                var name = item.get("name");
                return name == "器材费占比" || name == "加工费占比" || name == "专项费占比";
            }
        });
        var chart1 = this.lookupReference('rpt-bi-projectcost-est');
        var chart2 = this.lookupReference('rpt-bi-projectcost-tar');
        var chart3 = this.lookupReference('rpt-bi-projectcost-act');
        chart1.setStore(rptBiProjectCostStore);
        chart2.setStore(rptBiProjectCostStore);
        chart3.setStore(rptBiProjectCostStore);
    },

    download: function (button) {
        var text = button.text;
        var ref = 'rpt-bi-projectcost-';
        var diff;
        switch(text)
        {
            case '报价':
                diff = 'est';
                break;
            case '目标':
                diff = 'tar';
                break;
            default:
                diff = 'act';
        }
        ref = ref + diff;
        var chart = this.lookupReference(ref);
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'ProjectCost(' + diff + ')'
            });
        } else {
            chart.preview();
        }
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('name') + ': ' + record.get(item.field) + '%');
    },

    cellRenderer: function(value, metaData) {
        var record = metaData.record;
        var name = record.get('name');
        if(metaData.columnIndex > 0) {
            value = Flat.util.financeFormat(value, 2);
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