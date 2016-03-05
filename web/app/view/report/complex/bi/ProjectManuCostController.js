Ext.define('iFlat.view.report.complex.bi.ProjectManuCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-projectmanucost',

    reload: function (text, newValue, oldValue, eOpts) {
        var r = rptComplexBiProject.findRecord('project.projNo', newValue);
        rptComplexBiProjectManuCostStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiProjectManuCostGridStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiProjectManuCostGridStore.reload();
        rptComplexBiProjectManuCostStore.reload({
            callback: function(records, option, success) {
                Ext.Array.each(records, function(rec, index, countriesItSelf) {
                    rec.set('projectCost.manufacturingPct', r.get('project.manufacturingPct'));
                })
            }
        });
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-projectmanucost-projno').setValue(proj);
        }
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

    cellRenderer: function(value, metaData) {
        value = financeFormat(value,2);
        metaData.style = 'font-size:14px';
        if(metaData.record.get('name') == '加工费占比.' && value != "加工费占比.") {
            value = value + "%";
        };
        return value;
    },
})