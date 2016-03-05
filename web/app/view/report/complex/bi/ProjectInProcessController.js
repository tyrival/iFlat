Ext.define('iFlat.view.report.complex.bi.ProjectInProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-projectinprocess',

    reload: function (text, newValue, oldValue, eOpts) {
        rptComplexBiProjectInProcessGridStore.removeAll();
        var stage = Ext.getCmp('rpt-complex-bi-projectinprocess-stage').getValue();
        var period = Ext.getCmp('rpt-complex-bi-projectinprocess-period').getValue();
        if (stage != '' && stage != null && stage != undefined && period != '' && period != null && period != undefined) {
            rptComplexBiProjectInProcessGridStore.getProxy().extraParams['parameter.category'] = stage;
            rptComplexBiProjectInProcessGridStore.getProxy().extraParams['parameter.date'] = period;
            rptComplexBiProjectInProcessGridStore.reload();
        }
    },

    init: function() {
        var date = Ext.getCmp('rpt-complex-bi-period').getValue();
        Ext.getCmp('rpt-complex-bi-projectinprocess-period').setValue(date);
        /*var stage = Ext.getCmp('rpt-complex-bi-stage').getValue();
        Ext.getCmp('rpt-complex-bi-projectinprocess-stage').setValue(stage);*/
    },

    selectionChange: function (combo, newValue, oldValue, eOpts) {
        var stage = Ext.getCmp('rpt-complex-bi-projectinprocess-combo-stage').getValue();
        Ext.getCmp('rpt-complex-bi-projectinprocess-stage').setValue(stage);
    },
})