Ext.define('iFlat.view.report.bi.ProjectInProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-projectinprocess',

    refresh: function() {
        rptBiProjectInProcessGridStore.removeAll();
    },

    search: function(button) {
        var stage = Ext.getCmp('rpt-bi-projectinprocess-stage').getValue();
        var date = Ext.getCmp('rpt-bi-projectinprocess-date').getValue();
        if(!stage || !date) {
            Ext.Msg.show({
                title:'提示',
                message: '请先选择阶段和时间。',
            });
        } else {
            rptBiProjectInProcessGridStore.getProxy().extraParams['parameter.category'] = stage;
            rptBiProjectInProcessGridStore.getProxy().extraParams['parameter.date'] = date;
            rptBiProjectInProcessGridStore.reload();
        }
    },

    exportToExcel: function(btn) {
        var grid = Ext.getCmp('rpt-bi-projectinprocess-grid');
        var stage = rptBiProjectInProcessGridStore.getProxy().extraParams['parameter.category'];
        var t = '在建船舶-' + stage;
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
            showSummary: false,
        })
    }
})