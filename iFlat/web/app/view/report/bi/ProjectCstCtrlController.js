Ext.define('iFlat.view.report.bi.ProjectCstCtrlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-projectcstctrl',

    refresh: function() {
        rptBiProjectCstCtrlComboStore.reload();
        rptBiProjectCstCtrlGridStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-bi-projectcstctrl-combo').getValue();
        rptBiProjectCstCtrlGridStore.getProxy().extraParams['parameter.projectNo'] = proj;
        rptBiProjectCstCtrlGridStore.reload();
    },

    exportToExcel: function(btn) {
        var grid = Ext.getCmp('rpt-bi-projectcstctrl-grid');
        var t = '目标成本完成情况';
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
            showSummary: false,
        })
    },


})