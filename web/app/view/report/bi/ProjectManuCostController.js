Ext.define('iFlat.view.report.bi.ProjectManuCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-projectmanucost',

    refresh: function() {
        rptBiProjectManuCostComboStore.reload();
        rptBiProjectManuCostStore.removeAll();
        rptBiProjectManuCostGridStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-bi-projectmanucost-combo').getValue();
        var r = rptBiProjectManuCostComboStore.findRecord('project.projNo', proj);
        rptBiProjectManuCostStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiProjectManuCostGridStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiProjectManuCostGridStore.reload();
        rptBiProjectManuCostStore.reload({
            callback: function(records, option, success) {
                Ext.Array.each(records, function(rec, index, countriesItSelf) {
                    rec.set('projectCost.manufacturingPct', r.get('project.manufacturingPct'));
                })
            }
        });
    },

    onAxisLabelRender: function(axis, label, layoutContext) {
        var total = axis.getRange()[1];
        return (label / total * 30).toFixed(0) + '%';
    },

    download: function (button) {
        var chart = this.lookupReference('rpt-bi-projectmanucost-chart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'ProjectManuCost'
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
            record.get('projectCost.manuPct') + '%');
    },

    onLineSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml('<div style="text-align: center; font-weight: bold">' +
            record.get('projectCost.manufacturingPct') + '%</div><br>' + record.get('projectCost.type'));
    },

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

    cellRenderer: function(value, metaData) {
        value = financeFormat(value,2);
        metaData.style = 'font-size:14px';
        if(metaData.record.get('name') == '加工费占比.' && value != "加工费占比.") {
            value = value + "%";
        };
        return value;
    },

    onShowAssistWindow: function(button) {
        var proj = Ext.getCmp('rpt-bi-projectmanucost-combo').getValue();
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
            case '加工费构成':
                name = 'ManuCstCompose';
                break;
        }
        var win = Ext.getCmp('rpt-bi-' + name.toLowerCase());
        if(!win) {
            win = Ext.create('iFlat.view.report.bi.' + name);
        }
        win.show();
    },

    beforeWindowShow: function(win, eOpts) {
        var proj = Ext.getCmp('rpt-bi-projectmanucost-combo').getValue();
        rptManuCstComposeStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptManuCstComposeStore.reload();
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