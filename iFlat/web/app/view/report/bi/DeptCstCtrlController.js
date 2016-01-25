Ext.define('iFlat.view.report.bi.DeptCstCtrlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-bi-deptcstctrl',

    refresh: function() {
        rptBiDeptCstCtrlGridStore.removeAll();
    },

    search: function(button) {
        var date = Ext.getCmp('rpt-bi-deptcstctrl-date').getValue();
        if(!date) {
            Ext.Msg.show({
                title:'提示',
                message: '请先选择时间。',
            });
        } else {
            rptBiDeptCstCtrlGridStore.getProxy().extraParams['parameter.date'] = date;
            rptBiDeptCstCtrlGridStore.reload();
        }
    },

    exportToExcel: function(btn) {
        var grid = Ext.getCmp('rpt-bi-deptcstctrl-grid');
        var t = '部门可控费用';
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
            showSummary: false,
        })
    },

})