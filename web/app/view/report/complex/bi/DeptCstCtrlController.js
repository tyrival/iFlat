Ext.define('iFlat.view.report.complex.bi.DeptCstCtrlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi-deptcstctrl',

    reload: function (text, newValue, oldValue, eOpts) {
        rptComplexBiDeptCstCtrlGridStore.removeAll();
        rptComplexBiDeptCstCtrlGridStore.getProxy().extraParams['parameter.date'] = newValue;
        rptComplexBiDeptCstCtrlGridStore.reload();
    },

    init: function() {
        var date = Ext.getCmp('rpt-complex-bi-period').getValue();
        Ext.getCmp('rpt-complex-bi-deptcstctrl-period').setValue(date);
    }

})