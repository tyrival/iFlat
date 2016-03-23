Ext.define('iFlat.view.report.complex.bi.ProjectAuxCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-projectauxcost',

    reload: function (text, newValue, oldValue, eOpts) {
        var r = rptComplexBiProject.findRecord('project.projNo', newValue);
        rptComplexBiProjectAuxCostStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiProjectAuxCostGridStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiProjectAuxCostGridStore.reload();
        rptComplexBiProjectAuxCostStore.reload({
            callback: function(records, option, success) {
                Ext.Array.each(records, function(rec, index, countriesItSelf) {
                    rec.set('projectCost.auxiliaryPct', r.get('project.auxiliaryPct'));
                })
            }
        });
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-projectauxcost-projno').setValue(proj);
        }
    },

    onAxisLabelRender: function(axis, label, layoutContext) {
        var total = axis.getRange()[1];
        return (label / total * 20).toFixed(0) + '%';
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


    cellRenderer: function(value, metaData) {
        value = Flat.util.financeFormat(value,2);
        metaData.style = 'font-size:14px';
        if(metaData.record.get('name') == '专项费占比.' && value != "专项费占比.") {
            value = value + "%";
        };
        return value;
    },
})