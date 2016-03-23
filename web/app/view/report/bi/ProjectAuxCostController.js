Ext.define('iFlat.view.report.bi.ProjectAuxCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-projectauxcost',

    refresh: function() {
        rptBiProjectAuxCostComboStore.reload();
        rptBiProjectAuxCostStore.removeAll();
        rptBiProjectAuxCostGridStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-bi-projectauxcost-combo').getValue();
        var r = rptBiProjectAuxCostComboStore.findRecord('project.projNo', proj);
        rptBiProjectAuxCostStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiProjectAuxCostGridStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiProjectAuxCostGridStore.reload();
        rptBiProjectAuxCostStore.reload({
            callback: function(records, option, success) {
                Ext.Array.each(records, function(rec, index, countriesItSelf) {
                    rec.set('projectCost.auxiliaryPct', r.get('project.auxiliaryPct'));
                })
            }
        });
    },

    onAxisLabelRender: function(axis, label, layoutContext) {
        var total = axis.getRange()[1];
        return (label / total * 20).toFixed(0) + '%';
    },

    download: function (button) {
        var chart = this.lookupReference('rpt-bi-projectauxcost-chart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'ProjectAuxCost'
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
            record.get('projectCost.auxPct') + '%');
    },

    onLineSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml('<div style="text-align: center; font-weight: bold">' +
            record.get('projectCost.auxfacturingPct') + '%</div><br>' + record.get('projectCost.type'));
    },

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

    cellRenderer: function(value, metaData) {
        value = Flat.util.financeFormat(value,2);
        metaData.style = 'font-size:14px';
        if(metaData.record.get('name') == '专项费占比.' && value != "专项费占比.") {
            value = value + "%";
        };
        return value;
    },

    onShowAssistWindow: function(button) {
        var proj = Ext.getCmp('rpt-bi-projectauxcost-combo').getValue();
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
            case '专项费构成':
                name = 'AuxCstCompose';
                break;
        }
        var win = Ext.getCmp('rpt-bi-' + name.toLowerCase());
        if(!win) {
            win = Ext.create('iFlat.view.report.bi.' + name);
        }
        win.show();
    },

    beforeWindowShow: function(win, eOpts) {
        var proj = Ext.getCmp('rpt-bi-projectauxcost-combo').getValue();
        rptAuxCstComposeStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptAuxCstComposeStore.reload();
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