Ext.define('iFlat.view.report.bi.ProjectDevMatCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-projectdevmatcost',

    refresh: function() {
        rptBiProjectDevMatCostComboStore.reload();
        rptBiProjectDevMatCostStore.removeAll();
        rptBiProjectDevMatCostGridStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-bi-projectdevmatcost-combo').getValue();
        var r = rptBiProjectDevMatCostComboStore.findRecord('project.projNo', proj);
        rptBiProjectDevMatCostStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiProjectDevMatCostGridStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiProjectDevMatCostGridStore.reload();
        rptBiProjectDevMatCostStore.reload({
            callback: function(records, option, success) {
                Ext.Array.each(records, function(rec, index, countriesItSelf) {
                    rec.set('projectCost.materialPct', r.get('project.materialPct'));
                })
            }
        });
    },

    onAxisLabelRender: function(axis, label, layoutContext) {
        var total = axis.getRange()[1];
        return (label / total * 80).toFixed(0) + '%';
    },

    download: function (button) {
        var chart = this.lookupReference('rpt-bi-projectdevmatcost-chart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'ProjectDevMatCost'
            });
        } else {
            chart.preview();
        }
    },

    onBarLabelRender: function(text, sprite, config, rendererData, index) {
        return text + '%';
    },
    onBarSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('projectCost.type') + ': ' +
            record.get('projectCost.matPct') + '%');
    },

    onLineSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml('<div style="text-align: center; font-weight: bold">' +
            record.get('projectCost.materialPct') + '%</div><br>' + record.get('projectCost.type'));
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

        value = Flat.util.financeFormat(value,2);

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

    cellRenderer: function(value, metaData) {
        value = Flat.util.financeFormat(value,2);
        metaData.style = 'font-size:14px';
         if(metaData.record.get('name') == '器材费占比.' && value != "器材费占比.") {
            value = value + "%";
         };
         return value;
    },

    onShowAssistWindow: function(button) {
        var proj = Ext.getCmp('rpt-bi-projectdevmatcost-combo').getValue();
        if(!proj) {
            Ext.Msg.show({
                title:'提示',
                message: '请选择船名后查询。',
            });
            return false;
        }
        var text = button.text;
        var name;
        switch(text) {
            case '主要设备费用':
                name = 'MajorDevCst';
                break;
            case '主要材料费用':
                name = 'MajorMatCst';
                break;
            case '主要材料用量':
                name = 'MajorMatQty';
                break;
        }
        var win = Ext.getCmp('rpt-bi-' + name.toLowerCase());
        if(!win) {
            win = Ext.create('iFlat.view.report.bi.' + name);
        }
        win.show();
    },

    beforeWindowShow: function(win, eOpts) {
        var proj = Ext.getCmp('rpt-bi-projectdevmatcost-combo').getValue();
        var store = win.down('form').down('grid').getStore();
        store.getProxy().extraParams['parameter.projectNo'] = proj;
        store.reload();
    },

    exportToExcel: function(btn) {
        var win = btn.up('window');
        var grid = win.down('form').down('grid');
        grid.saveDocumentAs({
            title: win.title,
            fileName: win.title + '.xls',
        })
    }
})