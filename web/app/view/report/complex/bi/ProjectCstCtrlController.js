Ext.define('iFlat.view.report.complex.bi.ProjectCstCtrlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-projectcstctrl',

    reload: function (text, newValue, oldValue, eOpts) {
        rptComplexBiProjectCstCtrlGridStore.removeAll();
        rptComplexBiProjectCstCtrlGridStore.getProxy().extraParams['parameter.projectNo'] = newValue;
        rptComplexBiProjectCstCtrlGridStore.reload();
    },

    init: function() {
        var proj = Ext.getCmp('rpt-complex-bi-project').getValue();
        if (proj != '' && proj != null && proj != undefined) {
            Ext.getCmp('rpt-complex-bi-projectcstctrl-projno').setValue(proj);
        }
    }
})