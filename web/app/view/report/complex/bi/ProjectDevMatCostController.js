Ext.define('iFlat.view.report.complex.bi.ProjectDevMatCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-projectdevmatcost',

    reload: function (text, newValue, oldValue, eOpts) {
        var r = rptComplexBiProject.findRecord('project.projNo', newValue);
        rptComplexBiProjectDevMatCostStore.removeAll();
        rptComplexBiProjectDevMatCostStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiProjectDevMatCostStore.reload({
            callback: function(records, option, success) {
                Ext.Array.each(records, function(rec, index, countriesItSelf) {
                    rec.set('projectCost.materialPct', r.get('project.materialPct'));
                })
            }
        });
        rptCompexBiProjectDevMatCostGridStore.removeAll();
        rptCompexBiProjectDevMatCostGridStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptCompexBiProjectDevMatCostGridStore.reload();
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-projectdevmatcost-projno').setValue(proj);
        }
    },

    onAxisLabelRender: function(axis, label, layoutContext) {
        var total = axis.getRange()[1];
        return (label / total * 80).toFixed(0) + '%';
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

    cellRenderer: function(value, metaData) {
        value = financeFormat(value,2);
        metaData.style = 'font-size:14px';
         if(metaData.record.get('name') == '器材费占比.' && value != "器材费占比.") {
            value = value + "%";
         };
         return value;
    },
})